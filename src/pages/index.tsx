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
  const [takerAddress, setTakerAddress] = useState<any>()
  const [refresh, handleRefresh] = useState<any>(true)

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
      <div className='flex flex-row gap-[20px] p-[20px]'>
        <div
          className='overflow-y-auto overflow-x-hidden container mx-auto justify-center mt-6 border-x-2 border-y-2 border-spacing-x-5 border-spacing-y-5 px-5 py-5 rounded-md border-pink-500 w-[70%]'
          style={{ height: 'calc(100vh - 166px)' }}
        >
          <Main
            refresh={refresh}
            setFirstOfDeal={setFirstOfDeal}
            setSecondOfDeal={setSecondOfDeal}
            setTakerAddress={setTakerAddress}
          />
        </div>
        {/* <div className='container mx-auto justify-center mt-6 border-x-2 border-y-2 border-spacing-x-5 border-spacing-y-5 px-5 py-5 rounded-md border-pink-500'> */}
        <div
          className='overflow-y-auto w-[30%]'
          style={{ height: 'calc(100vh - 166px)' }}
        >
          <DealWindow
            handleRefresh={() => {
              setTimeout(() => handleRefresh((e: any) => !e), 3000)
            }}
            firstOfDeal={firstOfDeal}
            setFirstOfDeal={setFirstOfDeal}
            secondOfDeal={secondOfDeal}
            setSecondOfDeal={setSecondOfDeal}
            takerAddress={takerAddress}
          />
        </div>
      </div>
    </Layout>
    // <div>aosiejfoaewjf</div>
  )
}

export default Index
