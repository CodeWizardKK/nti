import { alchemy } from './alchemy.js'

// TODO: NTIのアドレスを発行する
const ownerAddress = "0x8aec564ef5a37bcb5fbd54ee22d6c151579c8628";

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
    if (transfer.tokenId == tokenId) {
        isConfirmed = true;
        break;
    }
}

if (isConfirmed) {
    console.log("1");
} else {
    console.log("0");
}
