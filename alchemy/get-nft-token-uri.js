import { alchemy } from './alchemy-goerli.js'

// cmd: node file-path.js token-id
// Contract address of (ex:) ADON NFT
const contractAddress = "0x48a192ca68E88B0A8De87aa713B6f8C87A42EbdA"
const tokenId = process.argv[2]

// Print NFT metadata returned in the response:
const data = await alchemy.nft.getNftMetadata(
  contractAddress,
  tokenId
);

console.log(data.tokenUri.gateway)