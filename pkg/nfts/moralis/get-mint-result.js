// cmd: node file-path.js contract-addr token-uri

require('dotenv').config({ path: 'env/.env.local' });
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");

const runApp = async () => {
    await Moralis.start({
        apiKey: process.env.MORALIS_KEY,
        // ...and any other configuration
    });
    
    const chain = EvmChain.GOERLI;
    const address = process.argv[2];
    const tokenUri = process.argv[3];

    const response = await Moralis.EvmApi.nft.getContractNFTs({
        address,
        chain,
    });

    for (const nft of response.result) {
        if (nft.tokenUri == tokenUri) {
            console.log(nft.tokenId);
            break;
        }
    }

}

runApp();
