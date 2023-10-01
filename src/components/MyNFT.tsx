import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useEffect } from 'react'
import { useMetadata } from '../hooks/useMetadata'
import { NFTCard } from './NFTcard'
import { Connection, clusterApiUrl } from '@solana/web3.js'

import Moralis from 'moralis'
import { SolNetwork } from '@moralisweb3/common-sol-utils'
import { customized_rpc } from '../utils/const'

export const MyNFT = ({ callback }) => {
  const { connection } = useConnection()
  const new_connection = new Connection(customized_rpc)
  const [metadataList, fetchMetadata] = useMetadata()
  console.log(useWallet())
  const publicKey = useWallet().publicKey

  console.log('here is my public key', publicKey)

  useEffect(() => {
    if (publicKey) {
      console.log('here is my public key 12', publicKey.toBase58())
      fetchMetadata({
        connection: new_connection,
        ownerAddress: publicKey.toBase58().toString()
      })
      console.log('--------------', metadataList)
    } else {
      fetchMetadata({
        connection: new_connection,
        ownerAddress: ''
      })
      callback({ key: 0 })
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
                <div onClick={() => callback(metadata)}>
                  <NFTCard
                    key={metadata.mint}
                    metadata={metadata}
                    sellerAddress={publicKey?.toBase58() || ''}
                  />
                </div>
              )
            )
          })}
        </div>
      )}
    </div>
  )
}

// NFT metadata sample
// {
//   "key": 4,
//   "updateAuthority": "6r6mprTMdaY1yJKryCV8N4khY5KGxbbRGU93p8PzEsrB",
//   "mint": "62h5mBheZCffjvQk4FvfV6nYDYjvLE4QK9G8ZoZRcVj3",
//   "data": {
//       "name": "Bot Labs #193",
//       "symbol": "BOTLABS",
//       "uri": "https://arweave.net/3r9H00KCNzKlg1Gzl_3JjnGOELQnyjXE6QjLdVUBCP0",
//       "sellerFeeBasisPoints": 0,
//       "creators": [
//           {
//               "address": "7MhpkuQBHLnL6k1yApymnCLLdWs7kS6yuDhVTohfa2Zq",
//               "verified": 1,
//               "share": 0
//           },
//           {
//               "address": "6r6mprTMdaY1yJKryCV8N4khY5KGxbbRGU93p8PzEsrB",
//               "verified": 0,
//               "share": 100
//           }
//       ]
//   },
//   "primarySaleHappened": 1,
//   "isMutable": 1,
//   "editionNonce": null
// }
