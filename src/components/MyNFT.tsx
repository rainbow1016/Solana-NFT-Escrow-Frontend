import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useEffect } from 'react'
import { useMetadata } from '../hooks/useMetadata'
import { NFTCard } from './NFTcard'
import { Connection, clusterApiUrl } from '@solana/web3.js'

import Moralis from 'moralis'
import { SolNetwork } from '@moralisweb3/common-sol-utils'

export const MyNFT = () => {
  const { connection } = useConnection()
  const new_connection = new Connection('https://rpc.theindex.io', 'finalized')
  const [metadataList, fetchMetadata] = useMetadata()
  console.log(useWallet())
  const publicKey = useWallet().publicKey

  console.log('here is my public key', publicKey)

  useEffect(() => {
    if (publicKey) {
      console.log('here is my public key 12', publicKey.toBase58())
      fetchMetadata({
        connection: new_connection,
        ownerAddress: publicKey.toBase58().toString(),
      })
      console.log('--------------', metadataList)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey])

  const generateMessage = () => {
    if (!publicKey) {
      return 'Connect your wallet to see your NFTs'
    }
    return metadataList
      ? `Found ${metadataList.length} items`
      : `You don't have any NFT!`
  }

  return (
    <div className='mt-10 sm:mt-0'>
      <div className='p-4 sm:px-0'>
        <h3 className='text-lg font-medium leading-6 text-gray-900'>
          My Collections
        </h3>
      </div>
      <div className='sm:grid sm:grid-cols-3 gap-4'>
        <div className='mt-5 md:mt-0 sm:col-span-2 '>
          <div className='text-sm text-gray-600 pt-4'>{generateMessage()}</div>
        </div>
      </div>
      {metadataList && (
        <div className='flex overflow-x-scroll sm:col-span-4 md:col-span-6'>
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
      )}
    </div>
  )
}
