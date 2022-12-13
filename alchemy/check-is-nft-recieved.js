import { alchemy } from './alchemy-goerli.js'

// TODO: NTIのアドレスを発行する
const ownerAddress = "0x9a83D048DAc86C865c0cc18c0ECd1292236B86C7";

// cmd: node file-path.js from-address token-id
const fromAddress = process.argv[2]
const tokenId = process.argv[3]

// NFT送付元からNTIへのトランザクション履歴を取得
const data = await alchemy.core.getAssetTransfers({
    fromBlock: "0x0",
    fromAddress: fromAddress,
    toAddress: ownerAddress,
    category: ["erc721"],
});

// 予約のトークンIDと一致すれば、Confirmedステータスに更新
let isConfirmed = false;
for (const transfer of data.transfers) {
    // ex: 0x000000000002 → 2
    const tokenIdFormatted = Number(transfer.tokenId.slice(2))
    if (tokenIdFormatted == tokenId) {
        isConfirmed = true;
        break;
    }
}

if (isConfirmed) {
    console.log("1");
} else {
    console.log("0");
}
