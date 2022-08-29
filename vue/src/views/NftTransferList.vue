<template>
  <div>
    <h3>NFT Transfer List</h3>
    <nft-transfer-list-table
    :items="items"></nft-transfer-list-table>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import NftTransferListTable from '../components/nft-transfer-list/NftTransferListTable.vue';

export default {
    components: {
        NftTransferListTable
    },
    setup() {
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
            items,
        }
    }
};
</script>