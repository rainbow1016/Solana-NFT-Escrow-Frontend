import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import React, { useState, ChangeEvent } from 'react'
import toast from 'react-hot-toast'
import { useLoadingDispatch } from '../contexts/LoadingContext'
import { ActionProps, ModalUserAction } from '../contexts/ModalContext'
import { TransactionType } from '../types'
import { BuyerTab } from './BuyerTab'
import { MyNFT } from './MyNFT'
import { NFTCard } from './NFTcard'
import { SearchNFT } from './SearchNFT'
import { SellerTab } from './SellerTab'

const colors = {
  active: 'text-purple-50 bg-purple-500',
  inactive: 'text-gray-500 bg-gray-100'
}
interface IProps {
  firstOfDeal: object
  secondOfDeal: object
  setFirstOfDeal: (a: any) => any
  setSecondOfDeal: (a: any) => any
}
export const DealWindow = ({
  setFirstOfDeal,
  setSecondOfDeal,
  firstOfDeal,
  secondOfDeal
}: IProps) => {
  const { connection } = useConnection()
  const { publicKey, signTransaction } = useWallet()
  const loadingDispatch = useLoadingDispatch()
  const [tab, setTab] = useState(TransactionType.Buyer)
  const [isHiddenOffer, setIsHiddenOffer] = useState(false)
  const [isHiddenRequest, setIsHiddenRequest] = useState(false)
  const [valueOffer, setValueOffer] = useState<String>('')
  const [valueRequest, setValueRequest] = useState<String>('')
  const [isDisabledOffer, setIsDisabledOffer] = useState(false)
  const [isDisabledRequest, setIsDisabledRequest] = useState(false)
  const [isDisabledConfirm, setIsDisabledConfirm] = useState(false)
  // console.log(1, valueOffer)
  const clickOfferSol = async () => {
    setIsHiddenOffer(true)
    setIsDisabledRequest(true)
  }
  const clickOfferSolInput = async () => {
    setIsHiddenOffer(false)
    setIsDisabledRequest(false)
    setValueOffer('')
    console.log(2, valueOffer)
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
    console.log(3, valueRequest)
  }
  const handleChangeRequest = (e: ChangeEvent<HTMLInputElement>) => {
    const re = /^\d+(\.\d+)?$/
    if (e.target.value === '' || re.test(e.target.value)) {
      setValueRequest(e.target.value)
    }
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
          console.log(
            firstOfDeal,
            secondOfDeal,
            Number(valueOffer),
            Number(valueRequest)
          )
        }}
      >
        Confirm Swap
      </button>
    </div>
  )
}
