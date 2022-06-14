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
    'Source NFT Hash',
    'Source Chain',
    'Source Address',
    'Destination NFT Hash',
    'Destination Chain',
    'Destination Address',
    'Block Height',
    'Created At'
]

export default {
    setup() {
        const columns = [
            "reservedKey",
            "srcNftHash",
            "srcChain",
            "srcAddr",
            "destNftHash",
            "destChain",
            "destAddr",
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