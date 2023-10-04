import { useWallet } from '@solana/wallet-adapter-react'
import React, { useEffect } from 'react'
import { useTransactions } from '../hooks/useTransactions'
import { TransactionType } from '../types'
import { Transactions } from './Transactions'

export const BuyerTab = () => {
  const { publicKey } = useWallet()
  const [items, fetch] = useTransactions(TransactionType.Buyer)

  useEffect(() => {
    if (publicKey) {
      fetch(publicKey.toBase58())
    }
  }, [publicKey, fetch])
  // console.log('there is offer transactions, hahaha: ', items)
  return <Transactions items={items} type={TransactionType.Buyer} />
}
