import { FC, useMemo } from 'react'
import {
  ConnectionProvider,
  WalletProvider
} from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base'
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter
} from '@solana/wallet-adapter-wallets'
import {
  WalletModalProvider,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'
import { customized_rpc } from '../utils/const'

require('@solana/wallet-adapter-react-ui/styles.css')

interface Props {
  children: React.ReactNode | React.ReactNode[]
}

const WalletConnectionProvider: FC<Props> = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet
  // const endpoint = useMemo(() => clusterApiUrl(network), [network])
  const endpoint = customized_rpc
  // console.log('endpoint is ', endpoint)

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter({ network }),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter()
    ],
    [network]
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          {/* <WalletMultiButton /> */}
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default WalletConnectionProvider
