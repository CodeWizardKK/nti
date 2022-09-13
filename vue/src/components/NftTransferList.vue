<template>
  <div>
    <h3>NFT Transfer List</h3>
    {{ items }}
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
    'Source NFT Hash',
    'Source Chain',
    'Source Address',
    'Destination NFT Hash',
    'Destination Chain',
    'Destination Address',
    'Created At'
]

export default {
    setup() {
        const columns = [
            "srcNftHash",
            "srcChain",
            "srcAddr",
            "destNftHash",
            "destChain",
            "destAddr",
            "createdAt"
        ]

        // store
        let $s = useStore()

        // computed
        const items = computed(() => {
            return (
                $s.getters["nti.nti/getNftTransferAll"]({
                    params: {}
                })?.nftTransfer ?? []
            )
        })
        console.log(items)

        return {
            headers,
            columns,
            items,
        }
    }
};
</script>