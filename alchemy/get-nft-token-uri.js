import { alchemy } from './alchemy.js'

// cmd: node file-path.js contract-address token-id
// TODO: contractAddress
const contractAddress = "0xaaA7A35e442a77e37cDE2f445b359AAbF5AD0387"
const tokenId = process.argv[2]

// Print NFT metadata returned in the response:
const data = await alchemy.nft.getNftMetadata(
  contractAddress,
  tokenId
);

console.log(data.tokenUri.gateway)