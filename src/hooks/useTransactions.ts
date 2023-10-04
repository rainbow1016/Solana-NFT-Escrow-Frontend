import { useState, useCallback } from "react";
import axios from "axios";
import { backend_url, TxHistory } from "../utils/const";

import { TransactionType } from "../types";

export const useTransactions = (
  type: TransactionType
): [TxHistory[] | null, (address: string) => Promise<void>] => {
  const [transactions, setTransactions] = useState<TxHistory[] | null>(null);

  const fetchBuyerTransactions = useCallback(async (address: string) => {
    try {
      if (address) {
        await axios({
          method: "post",
          url: `${backend_url}/offer`,
          data: {
            initializer: address,
          },
        }).then((res) => {
          const items = res.data as TxHistory[];
          if (items.length !== 0) {
            setTransactions(items);
          }
        });
      }
    } catch (err) {
      console.log("error fetching offer transactions", err);
    }
  }, []);

  const fetchSellerTransactions = useCallback(async (address: string) => {
    try {
      if (address) {
        await axios({
          method: "post",
          url: `${backend_url}/request`,
          data: {
            initializer: address,
          },
        }).then((res) => {
          const items = res.data as TxHistory[];
          if (items.length !== 0) {
            setTransactions(items);
          }
        });
      }
    } catch (err) {
      console.log("error fetching offer transactions", err);
    }
  }, []);

  switch (type) {
    case TransactionType.Buyer:
      return [transactions, fetchBuyerTransactions];
    case TransactionType.Seller:
      return [transactions, fetchSellerTransactions];
    default:
      throw new Error("TranasactionType is missing");
  }
};
