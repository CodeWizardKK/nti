export const srcContractAddr = "0x48a192ca68E88B0A8De87aa713B6f8C87A42EbdA"
export const destContractAddr = "0xCebd7f0340683c627F00d992378AfF3fE69A6Ba8"

export enum Blockchain {
  ETH,
  BTC,
  AVAX
}

export const blockchainOpts = [
  { value: Blockchain.ETH, label: "ETH", prefix: "0x" },
  { value: Blockchain.BTC, label: "SOL", prefix: "" },
  { value: Blockchain.AVAX, label: "BSC", prefix: "0x" },
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