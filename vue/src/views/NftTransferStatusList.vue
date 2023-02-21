<template>
  <div>
    <page-title title="NFT Transfer Status Explorer"></page-title>
    <a-tabs v-model:activeKey="activeKey" @change="onChange">
        <a-tab-pane key="1" tab="Search by Address">
            <nft-transfer-status-list-form-by-wallet-addr
            :key="resetKey"
            v-model:chain="chain"
            v-model:walletAddr="walletAddr"
            @subscribeNftTransferStatus="subscribeNftTransferStatusOfAddress"></nft-transfer-status-list-form-by-wallet-addr>
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

const getters = {
            '1': 'nti.nti/getNftTransferStatusOfAddress',
            '2': 'nti.nti/getNftTransferStatusOfToken'
}


const dispatch = {
            '1': 'nti.nti/QueryNftTransferStatusOfAddress',
            '2': 'nti.nti/QueryNftTransferStatusOfToken'
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

        const searchParams = reactive({
            chain: init.chain,
            walletAddr: init.walletAddr,
            contractAddr: init.contractAddr,
            tokenId: init.tokenId,
        })

        const resetForm = () => {
            resetKey.value++
        }

        // computed
        const params = computed(() => {
            if(activeKey.value == '1'){
                return {
                    chain: searchParams.chain,
                    walletAddr: searchParams.walletAddr
                }
            } else {
                return {
                    chain: searchParams.chain,
                    contractAddr: searchParams.contractAddr,
                    tokenId: searchParams.tokenId,
                }
            }
        })        

        const nftTransferStatusList = computed(() => {
            return (
                $s.getters[getters[activeKey.value]]({
                    params: params.value
                })?.nftTransferStatusDetail ?? []
            )
        })

        const getNftTransferStatus = async () => {
            await $s.dispatch(dispatch[activeKey.value], { params:params.value })
        }

        const subscribeNftTransferStatusOfAddress = async () => {
            await clearInterval(intervalId.value)
            intervalId.value = setInterval(getNftTransferStatus, 1000)
            searchParams.chain = chain.value
            searchParams.walletAddr = walletAddr.value
        }

        const subscribeNftTransferStatusOfToken = async () => {
            await clearInterval(intervalId.value)
            intervalId.value = setInterval(getNftTransferStatus, 1000)
            searchParams.chain = chain.value
            searchParams.contractAddr = contractAddr.value
            searchParams.tokenId = tokenId.value
        }

        const onChange = async () => {
            //GETrequest定期実行stop
            await clearInterval(intervalId.value)
            //Prefix初期化,selectBoxのfocus初期化
            resetForm()
            //v-model初期化
            resetModel()
            //searchParams初期化
            resetSearchParams()
        }

        const resetModel = () => {
            chain.value = init.chain
            walletAddr.value = init.walletAddr
            contractAddr.value = init.contractAddr
            tokenId.value = init.tokenId
        }

        const resetSearchParams = () => {
            Object.keys(searchParams).forEach(function(key){
                searchParams[key] = init[key]
            })
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
            subscribeNftTransferStatusOfAddress,
            subscribeNftTransferStatusOfToken,
        }
    }
};
</script>