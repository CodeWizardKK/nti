<template>
  <div>
    <page-title title="NFT Transfer List"></page-title>
    <nft-transfer-list-table
    :items="items"></nft-transfer-list-table>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import NftTransferListTable from '../components/nft-transfer-list/NftTransferListTable.vue';
import PageTitle from '../components/common/PageTitle.vue';

export default {
    components: {
        NftTransferListTable,
        PageTitle
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