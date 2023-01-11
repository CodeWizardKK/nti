<template>
  <div>
    <page-title title="NFT Transfer Status"></page-title>
    <nft-transfer-status-list-form
    @getNftTransferStatus="getNftTransferStatus"></nft-transfer-status-list-form>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import PageTitle from '../components/common/PageTitle.vue';
import NftTransferStatusListForm from '../components/nft-transfer-status-list/NftTransferStatusListForm.vue';

export default {
    components: {
        PageTitle,
        NftTransferStatusListForm
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