<template>
  <div>
    <page-title title="NFT Transfer Status"></page-title>
    <nft-transfer-status-list-form
    @getNftTransferStatus="getNftTransferStatus"></nft-transfer-status-list-form>
    items: {{ nftTransferStatusList }}
    <nft-transfer-status-list-table
    :items="nftTransferStatusList"></nft-transfer-status-list-table>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import PageTitle from '../components/common/PageTitle.vue';
import NftTransferStatusListForm from '../components/nft-transfer-status-list/NftTransferStatusListForm.vue';
import NftTransferStatusListTable from '../components/nft-transfer-status-list/NftTransferStatusListTable.vue';

export default {
    components: {
        PageTitle,
        NftTransferStatusListForm,
        NftTransferStatusListTable
    },
    setup() {
        const nftTransferStatusList = ref([])

        // store
        let $s = useStore()

        // computed
        const getNftTransferStatus = async (values) => {
            console.log(values)
            await $s.dispatch("nti.nti/QueryNftTransferStatusOfAddress", { options:{}, params:values })
            const data = (
                $s.getters["nti.nti/getNftTransferStatusOfAddress"]({
                    params: values
                })?.nftTransferStatusDetail ?? []
            )
            nftTransferStatusList.value = data
        }

        return {
            nftTransferStatusList,
            getNftTransferStatus,
        }
    }
};
</script>