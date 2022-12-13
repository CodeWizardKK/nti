import { alchemy } from './alchemy-goerli.js'

// cmd: node file-path.js token-id
// Contract address of (ex:) ADON NFT
const contractAddress = "0x61Bb7A3B5CdEc014bDe6dF3a644a2f0F20CEd37d"
const tokenId = process.argv[2]

// Print NFT metadata returned in the response:
const data = await alchemy.nft.getNftMetadata(
  contractAddress,
  tokenId
);

console.log(data.tokenUri.gateway)