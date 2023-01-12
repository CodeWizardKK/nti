<template>
  <div>
    <page-title title="NFT Transfer Status"></page-title>
    <nft-transfer-status-list-form
    @getNftTransferStatus="getNftTransferStatus"></nft-transfer-status-list-form>
    {{ nftTransferStatusList }}
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import PageTitle from '../components/common/PageTitle.vue';
import NftTransferStatusListForm from '../components/nft-transfer-status-list/NftTransferStatusListForm.vue';

export default {
    components: {
        PageTitle,
        NftTransferStatusListForm
    },
    setup() {
        const nftTransferStatusList = ref([])

        // store
        let $s = useStore()

        // computed
        const getNftTransferStatus = (values) => {
            nftTransferStatusList.value = (
                $s.getters["nti.nti/getNftTransferStatusOfAddress"]({
                    params: {}
                })?.nftTransferStatusDetail ?? []
            )
        }

        return {
            nftTransferStatusList,
            getNftTransferStatus,
        }
    }
};
</script>