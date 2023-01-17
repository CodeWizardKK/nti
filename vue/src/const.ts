export enum Blockchain {
  ETH,
  BTC,
  AVAX
}

export const blockchainOpts = [
  { value: Blockchain.ETH, label: "ETH", prefix: "0x" },
  { value: Blockchain.BTC, label: "BTC", prefix: "" },
  { value: Blockchain.AVAX, label: "AVAX", prefix: "" },
]

export enum TransferStatus {
  Reserved,
  Confirmed,
  Expired,
  Waiting,
  Completed
}

export const transferStatusOpts = [
  { value: TransferStatus.Reserved, label: "Reserved" },
  { value: TransferStatus.Confirmed, label: "Confirmed" },
  { value: TransferStatus.Expired, label: "Expired" },
  { value: TransferStatus.Waiting, label: "Waiting" },
  { value: TransferStatus.Completed, label: "Completed" },
]