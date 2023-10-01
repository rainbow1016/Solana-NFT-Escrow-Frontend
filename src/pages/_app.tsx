import dynamic from 'next/dynamic'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { LoadingProvider } from '../contexts/LoadingContext'
import { ModalProvider } from '../contexts/ModalContext'
import { SearchProvider } from '../contexts/SearchContext'
import React from 'react'
import { Seo } from '../components/Seo'
import WalletConnectionProvider from '../components/Wallet'
import Link from 'next/link'

// const WalletConnectionProvider = dynamic(() => import('../components/Wallet'), {
//   ssr: false,
// })

const network = () => {
  switch (process.env.NEXT_PUBLIC_BUILD_ENV) {
    case 'dev':
      return WalletAdapterNetwork.Devnet
    case 'prod':
      return WalletAdapterNetwork.Mainnet
    default:
      return WalletAdapterNetwork.Devnet
  }
}

function HayamaApp ({ Component, pageProps }: AppProps) {
  const localAddress = process.env.NEXT_PUBLIC_LOCAL_ADDRESS
  console.log(
    'here is network configuration: ',
    process.env.NEXT_PUBLIC_BUILD_ENV
  )
  return (
    <>
      <Seo
        imgHeight={508}
        imgUrl=''
        imgWidth={1110}
        path='/'
        title='Solana NFT Trading Platform'
        pageDescription='Solana NFT Trading Platform'
      />
      <LoadingProvider>
        <ModalProvider>
          <SearchProvider>
            <WalletConnectionProvider>
              <Component {...pageProps} />
            </WalletConnectionProvider>
          </SearchProvider>
        </ModalProvider>
      </LoadingProvider>
    </>
  )
}
export default HayamaApp
