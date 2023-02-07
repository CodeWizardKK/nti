// cmd: node file-path.js token-id

require('dotenv').config({ path: 'env/.env.local' });
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");

const runApp = async () => {
  await Moralis.start({
    apiKey: process.env.MORALIS_KEY,
    // ...and any other configuration
  });
  
  const address = process.env.ETH_CONTRACT_ADDRESS;
  const chain = EvmChain.GOERLI;
  const tokenId = process.argv[2];

  const response = await Moralis.EvmApi.nft.getNFTMetadata({
      address,
      chain,
      tokenId,
  });
  
  console.log(response.toJSON().token_uri);
}

runApp();