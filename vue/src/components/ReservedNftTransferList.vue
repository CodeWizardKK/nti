<template>
  <div>
    <h3>Reserved NFT Transfer List</h3>
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
import { computed } from 'vue'
import { useStore } from 'vuex'

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

export default {
    setup() {
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

        // store
        let $s = useStore()

        // computed
        const items = computed(() => {
            return (
                $s.getters["nti.nti/getReservedNftTransferAll"]({
                    params: {}
                })?.reservedNftTransfer ?? []
            )
        })

        return {
            headers,
            columns,
            items,
        }
    }
};
</script>