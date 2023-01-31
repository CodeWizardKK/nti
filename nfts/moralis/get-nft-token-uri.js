require('dotenv').config();
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");

const runApp = async () => {
  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
    // ...and any other configuration
  });
  
  const address = "0x48a192ca68E88B0A8De87aa713B6f8C87A42EbdA";

    const chain = EvmChain.GOERLI;
  
  const tokenId = 1;

  const response = await Moralis.EvmApi.nft.getNFTMetadata({
      address,
      chain,
      tokenId,
  });
  
  console.log(response.toJSON());
}

runApp();