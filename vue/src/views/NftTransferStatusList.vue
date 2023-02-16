<template>
  <div>
    <page-title title="NFT Transfer Status Explorer"></page-title>
    <a-tabs v-model:activeKey="activeKey" @change="onChange">
        <a-tab-pane key="1" tab="Search by Address">
            <nft-transfer-status-list-form-by-wallet-addr
            :key="resetKey"
            v-model:chain="chain"
            v-model:walletAddr="walletAddr"
            @subscribeNftTransferStatus="subscribeNftTransferStatusOfAddr"></nft-transfer-status-list-form-by-wallet-addr>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Search by Token">
            <nft-transfer-status-list-form-by-token
            :key="resetKey"
            v-model:chain="chain"
            v-model:contractAddr="contractAddr"
            v-model:tokenId="tokenId"
            @subscribeNftTransferStatus="subscribeNftTransferStatusOfToken"></nft-transfer-status-list-form-by-token>
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

const init = {
        chain: NaN,
        walletAddr: '',
        contractAddr:'',
        tokenId:'',
}

export default {
    components: {
        PageTitle,
        NftTransferStatusListFormByWalletAddr,
        NftTransferStatusListFormByToken,
        NftTransferStatusListTable,
    },
    setup() {
        // store
        let $s = useStore()

        // for search tabs
        const activeKey = ref('1')
        const intervalId = ref(0)
        const resetKey = ref(0)

        const chain = ref(init.chain)
        const walletAddr = ref(init.walletAddr)
        const contractAddr = ref(init.contractAddr)
        const tokenId = ref(init.tokenId)

        const resetForm = () => {
            resetKey.value++
        }

        const searchParamsOfAdrr = reactive({
            chain: init.chain,
            walletAddr: init.walletAddr,
        })

        const searchParamsOfToken = reactive({
            chain: init.chain,
            contractAddr: init.contractAddr,
            tokenId: init.tokenId,
        })

        // computed
        const searchParams = computed(() => {
            if(activeKey.value == '1'){
                return searchParamsOfAdrr
            } else {
                return searchParamsOfToken
            }
        })

        const getters = computed(() => {
            if(activeKey.value == '1'){
                return "nti.nti/getNftTransferStatusOfAddress"
            } else {
                return "nti.nti/getNftTransferStatusOfToken"
            }
        })

        const nftTransferStatusList = computed(() => {
            return (
                $s.getters[getters.value]({
                    params: searchParams.value
                })?.nftTransferStatusDetail ?? []
            )
        })

        const getNftTransferStatusOfAddr = async (values) => {
            await $s.dispatch("nti.nti/QueryNftTransferStatusOfAddress", { params:values })
        }

        const getNftTransferStatusOfToken = async (values) => {
            await $s.dispatch(`nti.nti/QueryNftTransferStatusOfToken`, { params:values })
        }

        const subscribeNftTransferStatusOfAddr = async () => {
            let values = {}
            values.chain = chain.value
            values.walletAddr = walletAddr.value
            await clearInterval(intervalId.value)
            intervalId.value = setInterval(getNftTransferStatusOfAddr, 1000, values)
            searchParamsOfAdrr.chain = chain.value
            searchParamsOfAdrr.walletAddr = walletAddr.value
        }

        const subscribeNftTransferStatusOfToken = async () => {
            let values = {}
            values.chain = chain.value
            values.contractAddr = contractAddr.value
            values.tokenId = tokenId.value
            await clearInterval(intervalId.value)
            intervalId.value = setInterval(getNftTransferStatusOfToken, 1000, values)
            searchParamsOfToken.chain = chain.value
            searchParamsOfToken.contractAddr = contractAddr.value
            searchParamsOfToken.tokenId = tokenId.value
        }

        const onChange = async () => {
            //GETrequest定期実行stop
            await clearInterval(intervalId.value)
            //form値初期化
            resetForm()
            //searchParam初期化
            resetSearchParams(searchParamsOfAdrr)
            resetSearchParams(searchParamsOfToken)
            //v-model初期化
            resetModel()
        }

        const resetSearchParams = (item) => {
            Object.keys(item).forEach(function(key) {
                item[key] = init[key]
            })
        }

        const resetModel = () => {
            chain.value = init.chain
            walletAddr.value = init.walletAddr
            contractAddr.value = init.contractAddr
            tokenId.value = init.tokenId
        }

        return {
            resetKey,
            activeKey,
            chain,
            walletAddr,
            contractAddr,
            tokenId,
            onChange,
            nftTransferStatusList,
            subscribeNftTransferStatusOfAddr,
            subscribeNftTransferStatusOfToken,
        }
    }
};
</script>