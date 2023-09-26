import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";
import { useState } from "react";
import { create } from "superstruct";
import { TokenAccount } from "../accounts/token";
import { Metadata } from "../schema/metadata";
import { getMetadata } from "../web3/metaplex/metadataHelpers";
import { getParsedAccountByMint, getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";

export const useMetadata = (): [
  (Metadata | undefined)[] | null,
  ({
    connection,
    ownerAddress,
  }: {
    connection: Connection;
    ownerAddress: string;
  }) => Promise<void>
] => {
  const [metadataList, setMetadataList] = useState<
    (Metadata | undefined)[] | null
  >(null);

  async function fetchMetadata({
    connection,
    ownerAddress,
  }: {
    connection: Connection;
    ownerAddress: string;
  }) {
    try {
      // const owner = new PublicKey(ownerAddress);
      console.log('useMetadata.ts is called.', ownerAddress, connection)
      const tokenAccounts = await getParsedNftAccountsByOwner({
        publicAddress: ownerAddress,
        connection: connection
    });
    console.log('in useMetadata ', tokenAccounts)
    setMetadataList(tokenAccounts);
    //   const nftAccounts = tokenAccounts.value
    //     .map((v) => create(v.account.data, TokenAccount))
    //     .map((tokenAccount) => tokenAccount.parsed.info)
    //     .filter((info) => {
    //       return (
    //         info.tokenAmount.decimals === 0 && info.tokenAmount.amount === "1"
    //       );
    //     });
    //   const result = await Promise.all(
    //     nftAccounts.map((nft) => getMetadata(connection, nft.mint))
    //   ).then((metadatas) => metadatas.filter((meta) => meta !== undefined));
    //   setMetadataList(result);
    } catch (e) {
      setMetadataList([]);
    }
  }
  return [metadataList, fetchMetadata];
};
