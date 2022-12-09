import { alchemy } from './alchemy.js'

// cmd: node file-path.js to-address token-id
const toAddress = process.argv[2]
const tokenId = process.argv[3]

// 送付先アドレスでmintされたNFT一覧を取得
const res = await alchemy.core.getAssetTransfers({
  fromBlock: "0x0",
  fromAddress: "0x0000000000000000000000000000000000000000",
  toAddress: toAddress,
  excludeZeroValue: true,
  category: ["erc721"],
});

// mintしたトークンIDと一致すれば、Completedステータスに更新
let isCompleted = false;
for (const events of res.transfers) {
    if (events.tokenId == tokenId) {
        isCompleted = true;
        break;
    }
}

if (isCompleted) {
    console.log("1");
} else {
    console.log("0");
}
