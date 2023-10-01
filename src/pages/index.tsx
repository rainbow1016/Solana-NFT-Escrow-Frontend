import type { NextPage } from 'next'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import toast from 'react-hot-toast'
import { Main } from '../components/Main'
import { DealWindow } from '../components/DealWindow'

const Index: NextPage = () => {
  const [firstOfDeal, setFirstOfDeal] = useState<any>()
  const [secondOfDeal, setSecondOfDeal] = useState<any>()

  // const [rpc, setRpc] = useState<string | null>(null)
  // const { connection } = useConnection()
  // const wallet = useWallet()
  // useEffect(() => {
  //   const toastConnected = async () => {
  //     if (wallet.connected) {
  //       const cluster = await connection.getClusterNodes()
  //       if (rpc !== cluster[0].rpc) {
  //         toast(`Connected to ${cluster[0].rpc}`)
  //         setRpc(cluster[0].rpc)
  //       }
  //     }
  //   }
  //   toastConnected()
  // }, [wallet, connection, rpc])

  // const formatRpc = rpc !== null ? `Network: ${rpc}` : ''
  // console.log('hasodihfa', formatRpc)
  return (
    <Layout formatRpc={'formatRpc'}>
      <div className='container mx-auto justify-center mt-6 border-x-2 border-y-2 border-spacing-x-5 border-spacing-y-5 px-5 py-5 rounded-md border-pink-500'>
        <Main
          setFirstOfDeal={setFirstOfDeal}
          setSecondOfDeal={setSecondOfDeal}
        />
      </div>
      {/* <div className='container mx-auto justify-center mt-6 border-x-2 border-y-2 border-spacing-x-5 border-spacing-y-5 px-5 py-5 rounded-md border-pink-500'> */}
      <div>
        <DealWindow
          firstOfDeal={firstOfDeal}
          setFirstOfDeal={setFirstOfDeal}
          secondOfDeal={secondOfDeal}
          setSecondOfDeal={setSecondOfDeal}
        />
      </div>
    </Layout>
    // <div>aosiejfoaewjf</div>
  )
}

export default Index
