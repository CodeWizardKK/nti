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