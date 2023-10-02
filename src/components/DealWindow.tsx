// @ts-nocheck
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import React, { useState, ChangeEvent, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useLoadingDispatch } from '../contexts/LoadingContext'
import { TransactionType } from '../types'
import { NFTCard } from './NFTcard'
import * as anchor from '@coral-xyz/anchor'
import {
  Connection,
  PublicKey,
  Keypair,
  LAMPORTS_PER_SOL
} from '@solana/web3.js'

import { initialize } from '../web3/nft_trading/initialize'
import { customized_rpc } from '../utils/const'
import { IDL } from '../web3/nft_trading/anchor_escrow'
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID
} from '@solana/spl-token'
import { PassThrough } from 'stream'
import { getOrCreateAssociatedTokenAccount } from '../web3/nft_trading/utils/getOrCreateAssociatedTokenAccount'

const colors = {
  active: 'text-purple-50 bg-purple-500',
  inactive: 'text-gray-500 bg-gray-100'
}
interface IProps {
  firstOfDeal: object
  secondOfDeal: object
  takerAddress: {
    sellerAddress: any
  }
  handleRefresh: () => any
  setFirstOfDeal: (a: any) => any
  setSecondOfDeal: (a: any) => any
}
export const DealWindow = ({
  setFirstOfDeal,
  setSecondOfDeal,
  firstOfDeal,
  secondOfDeal,
  takerAddress,
  handleRefresh
}: IProps) => {
  const { connection } = useConnection()
  // const new_connection = new Connection(customized_rpc)
  const { publicKey, wallet, signTransaction, signAllTransactions } =
    useWallet()
  const loadingDispatch = useLoadingDispatch()
  const [tab, setTab] = useState(TransactionType.Buyer)
  const [isHiddenOffer, setIsHiddenOffer] = useState(false)
  const [isHiddenRequest, setIsHiddenRequest] = useState(false)
  const [valueOffer, setValueOffer] = useState<String>('')
  const [valueRequest, setValueRequest] = useState<String>('')
  const [isDisabledOffer, setIsDisabledOffer] = useState(false)
  const [isDisabledRequest, setIsDisabledRequest] = useState(false)
  const [isDisabledConfirm, setIsDisabledConfirm] = useState(false)
  const clickOfferSol = async () => {
    setIsHiddenOffer(true)
    setIsDisabledRequest(true)
  }
  const clickOfferSolInput = async () => {
    setIsHiddenOffer(false)
    setIsDisabledRequest(false)
    setValueOffer('')
  }
  const handleChangeOffer = (e: ChangeEvent<HTMLInputElement>) => {
    const re = /^\d+(\.\d+)?$/
    if (e.target.value === '' || re.test(e.target.value)) {
      setValueOffer(e.target.value)
    }
  }
  const clickRequestSol = async () => {
    setIsHiddenRequest(true)
    setIsDisabledOffer(true)
  }
  const clickRequestSolInput = async () => {
    setIsHiddenRequest(false)
    setIsDisabledOffer(false)
    setValueRequest('')
  }
  const handleChangeRequest = (e: ChangeEvent<HTMLInputElement>) => {
    const re = /^\d+(\.\d+)?$/
    if (e.target.value === '' || re.test(e.target.value)) {
      setValueRequest(e.target.value)
    }
  }

  const initialize_escrow = async () => {
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
    const initializer = publicKey

    let takerKey = null as PublicKey
    try {
      takerKey = new PublicKey(takerAddress['sellerAddress'])
    } catch (error) {}

    const mintA = new PublicKey(firstOfDeal.mint)
    const mintB = new PublicKey(secondOfDeal.mint)

    const initializerTokenAccountB_info =
      await getOrCreateAssociatedTokenAccount(
        connection,
        publicKey,
        mintB,
        publicKey,
        signTransaction
      )
    const initializerTokenAccountB = initializerTokenAccountB_info.address

    const initializerTokenAccountA_info =
      await getOrCreateAssociatedTokenAccount(
        connection,
        publicKey,
        mintA,
        publicKey,
        signTransaction
      )
    const initializerTokenAccountA = initializerTokenAccountA_info.address

    const randomSeed: anchor.BN = new anchor.BN(
      Math.floor(Math.random() * 100000000)
    )
    const initializerAmount = new anchor.BN(
      Number(valueOffer) * LAMPORTS_PER_SOL
    )
    const takerAmount = new anchor.BN(Number(valueRequest) * LAMPORTS_PER_SOL)

    const stateSeed = 'state'
    const authoritySeed = 'authority'

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

    // console.log(
    //   initializerTokenAccountA.toBase58(),
    //   initializerTokenAccountB.toBase58()
    // )

    try {
      const tx = await program.transaction.initialize(
        randomSeed,
        new anchor.BN(initializerAmount),
        new anchor.BN(takerAmount),
        {
          accounts: {
            initializer: publicKey,
            takerKey: takerKey,
            vaultAuthority: vaultAuthorityKey,
            vault: vaultKey,
            mint: mintA,
            initializerReceiveMintAccount: mintB,
            initializerDepositTokenAccount: initializerTokenAccountA,
            initializerReceiveTokenAccount: initializerTokenAccountB,
            escrowState: escrowStateKey,
            systemProgram: anchor.web3.SystemProgram.programId,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID
          },
          signers: []
        }
      )

      tx.feePayer = publicKey
      tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
      const signedTx = await signTransaction(tx)
      const txId = await connection.sendRawTransaction(signedTx.serialize())
      await connection.confirmTransaction(txId)
      toast('Sent trading request successfully!')
    } catch (error) {
      console.log(error)
      toast('Action failed. Please retry')
    }
    setFirstOfDeal({ key: 0 })
    clickOfferSolInput()
    setSecondOfDeal({ key: 0 })
    clickRequestSolInput()
    handleRefresh()
  }

  // const metadataList = [
  //   {
  //     key: 4,
  //     updateAuthority: '6r6mprTMdaY1yJKryCV8N4khY5KGxbbRGU93p8PzEsrB',
  //     mint: '62h5mBheZCffjvQk4FvfV6nYDYjvLE4QK9G8ZoZRcVj3',
  //     data: {
  //       name: 'Bot Labs #193',
  //       symbol: 'BOTLABS',
  //       uri: 'https://arweave.net/3r9H00KCNzKlg1Gzl_3JjnGOELQnyjXE6QjLdVUBCP0',
  //       sellerFeeBasisPoints: 0,
  //       creators: [
  //         {
  //           address: '7MhpkuQBHLnL6k1yApymnCLLdWs7kS6yuDhVTohfa2Zq',
  //           verified: 1,
  //           share: 0
  //         },
  //         {
  //           address: '6r6mprTMdaY1yJKryCV8N4khY5KGxbbRGU93p8PzEsrB',
  //           verified: 0,
  //           share: 100
  //         }
  //       ]
  //     },
  //     primarySaleHappened: 1,
  //     isMutable: 1,
  //     editionNonce: null
  //   },
  //   {
  //     key: 4,
  //     updateAuthority: '6r6mprTMdaY1yJKryCV8N4khY5KGxbbRGU93p8PzEsrB',
  //     mint: '62h5mBheZCffjvQk4FvfV6nYDYjvLE4QK9G8ZoZRcVj3',
  //     data: {
  //       name: 'Bot Labs #193',
  //       symbol: 'BOTLABS',
  //       uri: 'https://arweave.net/3r9H00KCNzKlg1Gzl_3JjnGOELQnyjXE6QjLdVUBCP0',
  //       sellerFeeBasisPoints: 0,
  //       creators: [
  //         {
  //           address: '7MhpkuQBHLnL6k1yApymnCLLdWs7kS6yuDhVTohfa2Zq',
  //           verified: 1,
  //           share: 0
  //         },
  //         {
  //           address: '6r6mprTMdaY1yJKryCV8N4khY5KGxbbRGU93p8PzEsrB',
  //           verified: 0,
  //           share: 100
  //         }
  //       ]
  //     },
  //     primarySaleHappened: 1,
  //     isMutable: 1,
  //     editionNonce: null
  //   }
  // ]

  return (
    <div>
      {/* {metadataList && (
        <div className=''>
          {metadataList.map(metadata => {
            return (
              metadata && (
                <NFTCard
                  key={metadata.mint}
                  metadata={metadata}
                  sellerAddress={publicKey?.toBase58() || ''}
                />
              )
            )
          })}
        </div>
      )} */}
      <div className='container mx-auto justify-center mt-6 border-x-2 border-y-2 border-spacing-x-5 border-spacing-y-5 px-5 py-5 rounded-md border-pink-500'>
        {firstOfDeal && firstOfDeal.mint && (
          <div onClick={() => setFirstOfDeal({ key: 0 })}>
            <NFTCard
              key={firstOfDeal.mint}
              metadata={firstOfDeal}
              sellerAddress={publicKey?.toBase58() || ''}
            />
          </div>
        )}
        <button
          className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed m-8'
          hidden={isHiddenOffer}
          onClick={clickOfferSol}
          disabled={isDisabledOffer}
        >
          Offer SOL
        </button>
        <input
          type='number'
          className='border-x-2 border-y-2 rounded-full border-indigo-500 font-bold text-indigo-500 py-2 px-4 m-8'
          id='offer_sol'
          placeholder='SOL'
          hidden={!isHiddenOffer}
          onChange={handleChangeOffer}
          value={valueOffer}
        />
        <button
          className='m-8 mt-0 text-indigo-500 text-4xl font-bold'
          hidden={!isHiddenOffer}
          onClick={clickOfferSolInput}
        >
          ×
        </button>
        {/* <h1>×</h1> */}
      </div>
      <div className='container mx-auto justify-center mt-6 border-x-2 border-y-2 border-spacing-x-5 border-spacing-y-5 px-5 py-5 rounded-md border-pink-500'>
        {secondOfDeal && secondOfDeal.mint && (
          <div onClick={() => setSecondOfDeal({ key: 0 })}>
            <NFTCard
              key={secondOfDeal.mint}
              metadata={secondOfDeal}
              sellerAddress={publicKey?.toBase58() || ''}
            />
          </div>
        )}
        <button
          className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed m-8'
          hidden={isHiddenRequest}
          onClick={clickRequestSol}
          disabled={isDisabledRequest}
        >
          Request SOL
        </button>
        <input
          type='number'
          className='border-x-2 border-y-2 rounded-full border-indigo-500 font-bold text-indigo-500 py-2 px-4 m-8'
          id='request_sol'
          placeholder='SOL'
          hidden={!isHiddenRequest}
          onChange={handleChangeRequest}
          value={valueRequest}
        />
        <button
          className='m-8 mt-0 text-indigo-500 text-4xl font-bold'
          hidden={!isHiddenRequest}
          onClick={clickRequestSolInput}
        >
          ×
        </button>
      </div>
      <button
        className='bg-pink-500 hover:bg-pink-700 text-white font-bold py-4 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed m-8 text-2xl w-1/2 disabled:opacity-50'
        disabled={
          !(
            firstOfDeal &&
            firstOfDeal.mint &&
            secondOfDeal &&
            secondOfDeal.mint
          )
        }
        onClick={() => {
          // console.log(
          //   firstOfDeal,
          //   secondOfDeal,
          //   Number(valueOffer),
          //   Number(valueRequest),
          //   takerAddress
          // )
          initialize_escrow()
          // console.log('here is current focusing point: ', program)
          // initialize({ program, valueOffer, valueRequest })
        }}
      >
        Confirm Swap
      </button>
    </div>
  )
}
