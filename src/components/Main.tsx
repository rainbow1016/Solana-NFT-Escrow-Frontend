import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLoadingDispatch } from '../contexts/LoadingContext'
import { ActionProps, ModalUserAction } from '../contexts/ModalContext'
import { TransactionType } from '../types'
// import { acceptOffer } from "../web3/acceptOffer";
// import { cancelOffer } from "../web3/cancelOffer";
// import { BuyerInput } from "./BuyerInput";
import { BuyerTab } from './BuyerTab'
import { ModalDialog } from './dialogs/ModalDialog'
import { MyNFT } from './MyNFT'
import { SearchNFT } from './SearchNFT'
import { SellerTab } from './SellerTab'
import * as anchor from '@coral-xyz/anchor'
import axios from 'axios'
import { IDL } from '../web3/nft_trading/anchor_escrow'
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress
} from '@solana/spl-token'
import { customized_rpc, backend_url } from '../utils/const'
import { getOrCreateAssociatedTokenAccount } from '../web3/nft_trading/utils/getOrCreateAssociatedTokenAccount'
import { min } from 'bn.js'
import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes'

const colors = {
  active: 'text-purple-50 bg-purple-500',
  inactive: 'text-gray-500 bg-gray-100'
}
interface IProps {
  setFirstOfDeal: (a: any) => any
  setSecondOfDeal: (a: any) => any
  setTakerAddress: (a: any) => any
  refresh: boolean
}
export const Main = ({
  setFirstOfDeal,
  setSecondOfDeal,
  setTakerAddress,
  refresh
}: IProps) => {
  const { connection } = useConnection()
  const { publicKey, signTransaction, signAllTransactions } = useWallet()
  const loadingDispatch = useLoadingDispatch()
  const [tab, setTab] = useState(TransactionType.Buyer)
  // const [_, setRefresh] = useState(true)
  useEffect(() => {
    // setRefreshFunc(() => setRefresh(e => !e))
  }, [refresh])

  const handleSwitchTab = (type: TransactionType) => () => {
    setTab(type)
  }

  const cancelOfferAction = async ({ data }: { data: Object }) => {
    if (!publicKey || !signTransaction) {
      // TODO: show error
      return
    }
    try {
      const options = anchor.AnchorProvider.defaultOptions()
      const signerWallet = {
        publicKey: publicKey,
        signTransaction: signTransaction,
        signAllTransactions: signAllTransactions
      }
      // const new_connection = new Connection(customized_rpc)
      const provider = new anchor.AnchorProvider(
        connection,
        signerWallet,
        options
      )
      const programId = 'DGEX1Zf94mjrPHNLiutYTdwfdBBvsXk8BBHF2kFeBPyy'
      const program = new anchor.Program(IDL, programId, provider)

      const mintA = new PublicKey(data.initializer_mint)
      const initializerTokenAccountA_info =
        await getOrCreateAssociatedTokenAccount(
          connection,
          publicKey,
          mintA,
          publicKey,
          signTransaction
        )
      const initializerTokenAccountA = new PublicKey(
        data.initializerDepositTokenAccount
      )
      const stateSeed = 'state'
      const authoritySeed = 'authority'
      const randomSeed_num = data.random_seed
      const randomSeed: anchor.BN = new anchor.BN(Number(randomSeed_num))

      let vaultKey = null as unknown as PublicKey
      const vaultAuthorityKey = PublicKey.findProgramAddressSync(
        [Buffer.from(authoritySeed, 'utf-8')],
        program.programId
      )[0]

      const _vaultKey = PublicKey.findProgramAddressSync(
        [
          vaultAuthorityKey.toBuffer(),
          TOKEN_PROGRAM_ID.toBuffer(),
          mintA.toBuffer()
        ],
        ASSOCIATED_TOKEN_PROGRAM_ID
      )[0]
      vaultKey = _vaultKey

      const escrowStateKey = PublicKey.findProgramAddressSync(
        [
          Buffer.from(anchor.utils.bytes.utf8.encode(stateSeed)),
          randomSeed.toArrayLike(Buffer, 'le', 8)
        ],
        program.programId
      )[0]
      console.log(
        publicKey.toBase58(),
        mintA.toBase58(),
        initializerTokenAccountA.toBase58()
      )

      const tx = await program.transaction.cancel({
        accounts: {
          initializer: publicKey,
          mint: mintA,
          initializerDepositTokenAccount: initializerTokenAccountA,
          vault: vaultKey,
          vaultAuthority: vaultAuthorityKey,
          escrowState: escrowStateKey,
          tokenProgram: TOKEN_PROGRAM_ID
        },
        signers: []
      })
      tx.feePayer = publicKey
      tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
      const signedTx = await signTransaction(tx)
      const txId = await connection.sendRawTransaction(signedTx.serialize())
      await connection.confirmTransaction(txId)
      toast('Canceled successfully!')

      await axios({
        method: 'post',
        url: `${backend_url}/cancel`,
        data: {
          initializer: publicKey,
          initializer_mint: mintA,
          initializerDepositTokenAccount: initializerTokenAccountA
        }
      }).then(res => {
        toast('Deleted in Database successfully!')
      })
    } catch (e) {
      console.error(e)
      toast((e as Error).message)
    }
  }

  const acceptOfferAction = async ({ data }: { data: Object }) => {
    if (!publicKey || !signTransaction) {
      // TODO: show error
      return
    }
    try {
      const options = anchor.AnchorProvider.defaultOptions()
      const signerWallet = {
        publicKey: publicKey,
        signTransaction: signTransaction,
        signAllTransactions: signAllTransactions
      }
      // const new_connection = new Connection(customized_rpc)
      const provider = new anchor.AnchorProvider(
        connection,
        signerWallet,
        options
      )
      const programId = 'DGEX1Zf94mjrPHNLiutYTdwfdBBvsXk8BBHF2kFeBPyy'
      const program = new anchor.Program(IDL, programId, provider)

      const mintA = new PublicKey(data.initializer_mint)
      const mintB = new PublicKey(data.taker_mint)
      const initializer = new PublicKey(data.initializer)

      const takerTokenAccountA_info = await getOrCreateAssociatedTokenAccount(
        connection,
        publicKey,
        mintA,
        publicKey,
        signTransaction
      )

      const initializerTokenAccountA = new PublicKey(
        data.initializerDepositTokenAccount
      )
      const initializerTokenAccountB = new PublicKey(
        data.initializerReceiveTokenAccount
      )
      const takerTokenAccountB = new PublicKey(data.takerDepositTokenAccount)
      const takerTokenAccountA = new PublicKey(data.takerReceiveTokenAccount)
      const stateSeed = 'state'
      const authoritySeed = 'authority'
      const randomSeed_num = data.random_seed
      const randomSeed: anchor.BN = new anchor.BN(Number(randomSeed_num))

      let vaultKey = null as unknown as PublicKey
      const vaultAuthorityKey = PublicKey.findProgramAddressSync(
        [Buffer.from(authoritySeed, 'utf-8')],
        program.programId
      )[0]

      const _vaultKey = PublicKey.findProgramAddressSync(
        [
          vaultAuthorityKey.toBuffer(),
          TOKEN_PROGRAM_ID.toBuffer(),
          mintA.toBuffer()
        ],
        ASSOCIATED_TOKEN_PROGRAM_ID
      )[0]
      vaultKey = _vaultKey

      const escrowStateKey = PublicKey.findProgramAddressSync(
        [
          Buffer.from(anchor.utils.bytes.utf8.encode(stateSeed)),
          randomSeed.toArrayLike(Buffer, 'le', 8)
        ],
        program.programId
      )[0]
      console.log(
        publicKey.toBase58(),
        mintA.toBase58(),
        initializerTokenAccountA.toBase58()
      )

      const tx = await program.transaction.exchange({
        accounts: {
          taker: publicKey,
          initializerDepositTokenMint: mintA,
          takerDepositTokenMint: mintB,
          takerDepositTokenAccount: takerTokenAccountB,
          takerReceiveTokenAccount: takerTokenAccountA,
          initializerDepositTokenAccount: initializerTokenAccountA,
          initializerReceiveTokenAccount: initializerTokenAccountB,
          initializer: initializer,
          escrowState: escrowStateKey,
          vault: vaultKey,
          vaultAuthority: vaultAuthorityKey,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: anchor.web3.SystemProgram.programId
        },
        signers: []
      })
      tx.feePayer = publicKey
      tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
      const signedTx = await signTransaction(tx)
      const txId = await connection.sendRawTransaction(signedTx.serialize())
      await connection.confirmTransaction(txId)
      toast('Canceled successfully!')

      await axios({
        method: 'post',
        url: `${backend_url}/cancel`,
        data: {
          initializer: initializer,
          initializer_mint: mintA,
          initializerDepositTokenAccount: initializerTokenAccountA
        }
      }).then(res => {
        toast('Deleted in Database successfully!')
      })
    } catch (e) {
      console.error(e)
      toast((e as Error).message)
    }
  }

  const handleConfirm = async (props: ActionProps) => {
    // console.log(props)
    switch (props.type) {
      case ModalUserAction.CancelOffer: {
        return cancelOfferAction({ data: props.data })
      }
      case ModalUserAction.AcceptOffer: {
        return acceptOfferAction({ data: props.data })
      }
    }
  }

  return (
    <div>
      <MyNFT callback={setFirstOfDeal} refresh={refresh} />
      <SearchNFT callback={[setSecondOfDeal, setTakerAddress]} />
      <div className='mt-6 sm:mt-6'>
        <div className='p-4 sm:px-0 sm:py-3'>
          <h3 className='text-lg font-medium  text-gray-900'>
            Trding Transactions
          </h3>
        </div>
        <div className='px-4 sm:px-0'>
          <div className='flex justify-start items-center py-2 gap-2'>
            <button
              className={`cursor-pointer py-2 px-4 rounded transition text-center ${
                tab === TransactionType.Buyer
                  ? colors['active']
                  : colors['inactive']
              }`}
              onClick={handleSwitchTab(TransactionType.Buyer)}
            >
              Trading Offers
            </button>
            <button
              className={`cursor-pointer py-2 px-4 rounded transition text-center ${
                tab === TransactionType.Seller
                  ? colors['active']
                  : colors['inactive']
              }`}
              onClick={handleSwitchTab(TransactionType.Seller)}
            >
              Trading Requests
            </button>
          </div>
          {tab === TransactionType.Buyer && <BuyerTab />}
          {tab === TransactionType.Seller && <SellerTab />}
        </div>
      </div>
      <ModalDialog onConfirm={handleConfirm} />
      {/* <Loading /> */}
    </div>
  )
}
