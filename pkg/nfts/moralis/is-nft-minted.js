// cmd: node file-path.js transaction-hash

require('dotenv').config({ path: 'env/.env.local' });
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");

// const fromAddress = process.argv[2]

const runApp = async () => {
  await Moralis.start({
    apiKey: process.env.MORALIS_KEY,
    // ...and any other configuration
  });
  
  const chain = EvmChain.GOERLI;
  const transactionHash = process.argv[2];

  const response = await Moralis.EvmApi.transaction.getTransaction({
    transactionHash,
    chain,
  });

  const blockNumber = response.toJSON().block_number;

  if (blockNumber == null) {
      console.log("0");
  } else {
      console.log("1");
  }
}

runApp();
