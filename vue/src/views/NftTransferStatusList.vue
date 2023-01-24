<template>
  <div>
    <page-title title="NFT Transfer Status Explorer"></page-title>
    {{ searchParams }}
    <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="Search by Address">
            <nft-transfer-status-list-form
            @getNftTransferStatus="getNftTransferStatus"></nft-transfer-status-list-form>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Search by Token">Content of Tab Pane 2</a-tab-pane>
    </a-tabs>
    <nft-transfer-status-list-table
    :items="nftTransferStatusList"></nft-transfer-status-list-table>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
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
        const activeKey = ref('1')
        const searchParams = reactive({
            chain: NaN,
            walletAddr: ""
        })

        // computed
        const nftTransferStatusList = computed(() => {
            return (
                $s.getters["nti.nti/getNftTransferStatusOfAddress"]({
                    params: searchParams
                })?.nftTransferStatusDetail ?? []
            )
        })

        // store
        let $s = useStore()

        const getNftTransferStatus = async (values) => {
            console.log(values)
            await $s.dispatch("nti.nti/QueryNftTransferStatusOfAddress", { options:{subscribe:true, all:true}, params:values })
            searchParams.chain = values.chain
            searchParams.walletAddr = values.walletAddr
        }

        return {
            activeKey,
            nftTransferStatusList,
            searchParams,
            getNftTransferStatus,
        }
    }
};
</script>