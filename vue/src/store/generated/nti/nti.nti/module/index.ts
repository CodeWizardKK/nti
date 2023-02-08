// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, OfflineSigner, EncodeObject, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgTransferNft } from "./types/nti/tx";
import { MsgChangeStatus } from "./types/nti/tx";
import { MsgDeleteNftMint } from "./types/nti/tx";
import { MsgReserveNftTransfer } from "./types/nti/tx";
import { MsgCreateNftMint } from "./types/nti/tx";
import { MsgAddNftMintResult } from "./types/nti/tx";
import { MsgUpdateNftMint } from "./types/nti/tx";


const types = [
  ["/nti.nti.MsgTransferNft", MsgTransferNft],
  ["/nti.nti.MsgChangeStatus", MsgChangeStatus],
  ["/nti.nti.MsgDeleteNftMint", MsgDeleteNftMint],
  ["/nti.nti.MsgReserveNftTransfer", MsgReserveNftTransfer],
  ["/nti.nti.MsgCreateNftMint", MsgCreateNftMint],
  ["/nti.nti.MsgAddNftMintResult", MsgAddNftMintResult],
  ["/nti.nti.MsgUpdateNftMint", MsgUpdateNftMint],
  
];
export const MissingWalletError = new Error("wallet is required");

export const registry = new Registry(<any>types);

const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
}

interface SignAndBroadcastOptions {
  fee: StdFee,
  memo?: string
}

const txClient = async (wallet: OfflineSigner, { addr: addr }: TxClientOptions = { addr: "http://localhost:26657" }) => {
  if (!wallet) throw MissingWalletError;
  let client;
  if (addr) {
    client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
  }else{
    client = await SigningStargateClient.offline( wallet, { registry });
  }
  const { address } = (await wallet.getAccounts())[0];

  return {
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }: SignAndBroadcastOptions = {fee: defaultFee, memo: ""}) => client.signAndBroadcast(address, msgs, fee,memo),
    msgTransferNft: (data: MsgTransferNft): EncodeObject => ({ typeUrl: "/nti.nti.MsgTransferNft", value: MsgTransferNft.fromPartial( data ) }),
    msgChangeStatus: (data: MsgChangeStatus): EncodeObject => ({ typeUrl: "/nti.nti.MsgChangeStatus", value: MsgChangeStatus.fromPartial( data ) }),
    msgDeleteNftMint: (data: MsgDeleteNftMint): EncodeObject => ({ typeUrl: "/nti.nti.MsgDeleteNftMint", value: MsgDeleteNftMint.fromPartial( data ) }),
    msgReserveNftTransfer: (data: MsgReserveNftTransfer): EncodeObject => ({ typeUrl: "/nti.nti.MsgReserveNftTransfer", value: MsgReserveNftTransfer.fromPartial( data ) }),
    msgCreateNftMint: (data: MsgCreateNftMint): EncodeObject => ({ typeUrl: "/nti.nti.MsgCreateNftMint", value: MsgCreateNftMint.fromPartial( data ) }),
    msgAddNftMintResult: (data: MsgAddNftMintResult): EncodeObject => ({ typeUrl: "/nti.nti.MsgAddNftMintResult", value: MsgAddNftMintResult.fromPartial( data ) }),
    msgUpdateNftMint: (data: MsgUpdateNftMint): EncodeObject => ({ typeUrl: "/nti.nti.MsgUpdateNftMint", value: MsgUpdateNftMint.fromPartial( data ) }),
    
  };
};

interface QueryClientOptions {
  addr: string
}

const queryClient = async ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseUrl: addr });
};

export {
  txClient,
  queryClient,
};
