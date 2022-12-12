import { alchemy } from './alchemy-goerli.js'

// cmd: node file-path.js transaction-hash
const transactionHash = process.argv[2]

// トランザクションがmintされたかを取得
const res = await alchemy.transact.waitForTransaction(
    transactionHash,
    0
);

if (res == null) {
    console.log("0");
} else {
    console.log("1"); // mint完了
}
