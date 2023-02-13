<template>
  <div>
    <page-title title="NFT Transfer Status Explorer"></page-title>
    <a-tabs v-model:activeKey="activeKey" @change="onChange">
        <a-tab-pane key="1" tab="Search by Address">
            <nft-transfer-status-list-form-by-wallet-addr
            :key="resetKey"
            @subscribeNftTransferStatus="subscribeNftTransferStatus"></nft-transfer-status-list-form-by-wallet-addr>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Search by Token">
            <nft-transfer-status-list-form-by-token
            :key="resetKey"
            @subscribeNftTransferStatus="subscribeNftTransferStatus"></nft-transfer-status-list-form-by-token>
        </a-tab-pane>
    </a-tabs>
    <nft-transfer-status-list-table
    :items="nftTransferStatusList"></nft-transfer-status-list-table>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import PageTitle from '../components/common/PageTitle.vue';
import NftTransferStatusListFormByWalletAddr from '../components/nft-transfer-status-list/NftTransferStatusListFormByWalletAddr.vue';
import NftTransferStatusListFormByToken from '../components/nft-transfer-status-list/NftTransferStatusListFormByToken.vue';
import NftTransferStatusListTable from '../components/nft-transfer-status-list/NftTransferStatusListTable.vue';

export default {
    components: {
        PageTitle,
        NftTransferStatusListFormByWalletAddr,
        NftTransferStatusListTable,
        NftTransferStatusListFormByToken,
    },
    setup() {
        // store
        let $s = useStore()

        // for search tabs
        const activeKey = ref('1')

        const intervalId = ref(0)

        const searchOfAddress = reactive({
            id:'Address',
            params:{
                chain: NaN,
                walletAddr: ""
            }
        })

        const searchOfToken = reactive({
            id:'Token',
            params:{
                chain: NaN,
                contractAddr: "",
                tokenId: ""
            }
        })

        let search = reactive({
            id:'',
            params:{}
        })

        const resetKey = ref(0)
        const reset = () => {
            resetKey.value++
        }

        const onChange = () => {
            reset()
            resetSearchParams(searchOfAddress)
            resetSearchParams(searchOfToken)
        }

        // computed
        const searchedIn = computed(() => {
            if(activeKey.value == '1'){
                return searchOfAddress
            } else {
                return searchOfToken
            }
        })

        const nftTransferStatusList = computed(() => {
            search = searchedIn.value
            return (
                $s.getters[`nti.nti/getNftTransferStatusOf${search.id}`]({
                    params: search.params
                })?.nftTransferStatusDetail ?? []
            )
        })

        const getNftTransferStatus = async (values) => {
            await $s.dispatch(`nti.nti/QueryNftTransferStatusOf${search.id}`, { params:values })
        }

        const subscribeNftTransferStatus = async (values) => {
            await clearInterval(intervalId.value)
            intervalId.value = setInterval(getNftTransferStatus, 1000, values)
            Object.keys(search.params).forEach(function(key) {
                search.params[key] = values[key]
            })
        }

        const resetSearchParams = (item) => {
            Object.keys(item.params).forEach(function(key) {
                if(key == 'chain'){
                    item.params[key] = NaN
                } else {
                    item.params[key] = ""
                }
            })
        }

        return {
            resetKey,
            activeKey,
            onChange,
            nftTransferStatusList,
            search,
            subscribeNftTransferStatus,
        }
    }
};
</script>