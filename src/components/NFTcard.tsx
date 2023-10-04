import Image from 'next/image'
import Link from 'next/link'
import { useMetaImage } from '../hooks/useMetaImage'
import { Metadata } from '../schema/metadata'

interface NFTCardProps {
  metadata: Metadata
  sellerAddress: string
}
export const NFTCard = ({ metadata, sellerAddress }: NFTCardProps) => {
  const { isLoading, cachedUri } = useMetaImage(metadata.data.uri)
  if (!metadata) return null
  const isMeasureStorage = (path: string) => {
    const uri = new URL(path)
    return ['www.arweave.net', 'gateway.pinata.cloud'].includes(uri.hostname)
  }

  return (
    <div className='group relative'>
      <div className='inline-block px-2'>
        {/* <Link
          href={`https://solana.nftscan.com/${metadata.mint}`}
          passHref
        > */}

        <div className='w-40 h-70 max-w-xs overflow-auto rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out'>
          <div className='w-40 h-40 bg-gray-200 rounded-md overflow-hidden hover:opacity-75'>
            {cachedUri && isMeasureStorage(cachedUri) ? (
              <Image
                width={172}
                height={172}
                src={cachedUri}
                alt={metadata.data.name}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={cachedUri}
                alt={metadata.data.name}
                className='w-40 h-40 object-center object-cover'
              />
            )}
          </div>
          <div className='pt-1 px-2'>
            <h3 className='text-sm text-gray-700'>
              {metadata?.data.name != '' ? metadata?.data.name : '_'}
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              {metadata?.data.symbol != '' ? metadata?.data.symbol : '_'}
            </p>
            <a
              target='_blank'
              href={`https://solana.nftscan.com/${metadata.mint}`}
              rel='noopener noreferrer'
            >
              <h3 className='font-mono font-light text-pink-500 border-x-2 border-y-2 rounded-md border-pink-500 justify-center mx-[10px] text-center'>
                view details
              </h3>
            </a>
          </div>
        </div>
        {/* </Link> */}
      </div>
    </div>
  )
}
