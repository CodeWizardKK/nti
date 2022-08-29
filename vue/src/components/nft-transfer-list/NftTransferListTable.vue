<template>
  <div>
    <table>
        <thead>
            <tr>
                <th v-for="(key, index) in headers" :key="index">
                    {{ key }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, itemIndex) in items" :key="itemIndex">
                <td v-for="(key, columnIndex) in columns" :key="columnIndex">
                    <div>
                        {{ item[key] }}
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
const headers = [
    'Reserved Key',
    'NFT Source Hash',
    'NFT Source Chain',
    'NFT Source Address',
    'NFT Destination Chain',
    'NFT Destination Address',
    'Fungible Token',
    'FT Chain',
    'FT Source Address',
    'FT Destination Address',
    'Block Height',
    'Created At'
]

const columns = [
    "reservedKey",
    "nftSrcHash",
    "nftSrcChain",
    "nftSrcAddr",
    "nftDestChain",
    "nftDestAddr",
    "fungibleToken",
    "ftChain",
    "ftSrcAddr",
    "ftDestAddr",
    "blockHeight",
    "createdAt"
]

export default {
    props: {
        items: Object
    },
    setup(props) {
        const items = props.items

        return {
            headers,
            columns,
            items,
        }
    }
};
</script>