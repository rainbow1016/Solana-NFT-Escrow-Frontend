import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  // Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { ConsoleHelper, toPublicKey } from "./helper";
import BN from "bn.js";
import * as anchor from "@project-serum/anchor";

export type Cluster = "devnet" | "testnet" | "mainnet";

export type TxHistory = {
  random_seed: string;
  initializer: string;
  taker: string;
  initializer_mint: string;
  taker_mint: string;
  initializerDepositTokenAccount: string;
  initializerReceiveTokenAccount: string;
  takerDepositTokenAccount: string;
  takerReceiveTokenAccount: string;
  initializer_amount: string;
  taker_amount: string;
};

export const CLUSTER: Cluster =
  // eslint-disable-next-line no-nested-ternary
  process.env.NEXT_PUBLIC_CLUSTER === `mainnet`
    ? `mainnet`
    : process.env.NEXT_PUBLIC_CLUSTER === `devnet`
    ? `devnet`
    : `testnet`;

export const SOLANA_HOST = process.env.REACT_APP_SOLANA_API_URL
  ? process.env.REACT_APP_SOLANA_API_URL
  : // eslint-disable-next-line no-nested-ternary
  CLUSTER === `mainnet`
  ? clusterApiUrl("mainnet-beta")
  : clusterApiUrl("devnet");

// export const getAssociatedTokenAddress = async (
//   mintKey: PublicKey | string,
//   ownerKey: PublicKey | string
// ): Promise<PublicKey> =>
//   Token.getAssociatedTokenAddress(
//     ASSOCIATED_TOKEN_PROGRAM_ID,
//     TOKEN_PROGRAM_ID,
//     toPublicKey(mintKey),
//     toPublicKey(ownerKey)
//   );

// export const hasNft = async (
//   solanaConnection: Connection,
//   walletAccount: string | PublicKey,
//   nftAddress: string | PublicKey,
//   tokenAccount: null | string | PublicKey
// ) => {
//   if (!solanaConnection) {
//     return false;
//   }

// const associatedKey = await getAssociatedTokenAddress(
//   toPublicKey(nftAddress),
//   toPublicKey(walletAccount)
// );
// ConsoleHelper(
//   `isEnoughNft -> associatedKey: ${pubkeyToString(associatedKey)}`
// );

//   try {
//     const nftAmount = await getTokenBalance(solanaConnection, associatedKey);
//     if (nftAmount.eq(new BN(1))) {
//       return true;
//     }
//   } catch (e) {
//     ConsoleHelper(`isEnoughNftOnSolana: ${e}`);
//   }
//   if (!tokenAccount) {
//     return false;
//   }
//   try {
//     const nftAmount = await getTokenBalance(
//       solanaConnection,
//       toPublicKey(tokenAccount)
//     );
//     if (nftAmount.eq(new BN(1))) {
//       return true;
//     }
//   } catch (e) {
//     ConsoleHelper(`isEnoughNftOnSolana: ${e}`);
//   }

//   return false;
// };

export const getTokenBalance = async (
  connection: Connection,
  pubkey: PublicKey | string
) =>
  new anchor.BN(
    (await connection.getTokenAccountBalance(toPublicKey(pubkey))).value.amount
  );

export const pubkeyToString = (key: PublicKey | null | string = ``) =>
  typeof key === `string` ? key : key?.toBase58() || ``;

// export const customized_rpc =
//   "https://special-sleek-general.solana-mainnet.discover.quiknode.pro/aaaec0f7c0ca572643d62a44743a21fb434df7d1/";

export const customized_rpc =
  "https://rough-neat-research.solana-devnet.discover.quiknode.pro/67ffb9949cc02e1656eb0761af5b5cd150e7f049/";

export const backend_url = "http://localhost:5050/api";
