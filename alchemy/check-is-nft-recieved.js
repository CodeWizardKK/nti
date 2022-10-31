// Setup: npm install alchemy-sdk
const { Network, Alchemy } = require("alchemy-sdk");

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: "5go2eKfHJofdLEFdONmkBpiz_XsSwN7O", // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

// TODO: NTIのアドレスを発行する
const ownerAddress = "0x8aec564ef5a37bcb5fbd54ee22d6c151579c8628";

async function main() {
    // cmd: node file-path.js from-address token-id
    // const fromAddress = process.argv[2]
    // const tokenId = process.argv[3]
    
    const fromAddress = "0x1f52d5f7bd5a5e48ad593adc1b7cc278d8cb32ef";
    const tokenId = "0x000000000000000000000000000000000000000000000000000000000000121c";

    // NFT送付元からNTIへのトランザクション履歴を取得
    const data = await alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        fromAddress: fromAddress,
        toAddress: ownerAddress,
        category: ["erc721"],
    });

    // 予約のトークンIDと一致すれば、Confirmedステータスに更新
    for (const transfer of data.transfers) {
        if (transfer.tokenId == tokenId) {
            console.log("1");
            return
        }
    }

    console.log("0");
}

main();
