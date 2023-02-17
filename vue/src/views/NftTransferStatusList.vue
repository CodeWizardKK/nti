<template>
  <div>
    <page-title title="NFT Transfer Status Explorer"></page-title>
    <a-tabs v-model:activeKey="activeKey" @change="onChange">
        <a-tab-pane key="1" tab="Search by Address">
            <nft-transfer-status-list-form-by-wallet-addr
            :key="resetKey"
            v-model:chain="chain"
            v-model:walletAddr="walletAddr"
            @subscribeNftTransferStatus="subscribeNftTransferStatus"></nft-transfer-status-list-form-by-wallet-addr>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Search by Token">
            <nft-transfer-status-list-form-by-token
            :key="resetKey"
            v-model:chain="chain"
            v-model:contractAddr="contractAddr"
            v-model:tokenId="tokenId"
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

        const resetForm = () => {
            resetKey.value++
        }

        // computed
        const searchParams = computed(() => {
            if(activeKey.value == '1'){
                return {
                    chain: chain.value,
                    walletAddr: walletAddr.value
                }
            } else {
                return {
                    chain: chain.value,
                    contractAddr: contractAddr.value,
                    tokenId: tokenId.value,
                }
            }
        })        

        const nftTransferStatusList = computed(() => {
            return (
                $s.getters[getters[activeKey.value]]({
                    params: searchParams.value
                })?.nftTransferStatusDetail ?? []
            )
        })

        const getNftTransferStatus = async () => {
            await $s.dispatch(dispatch[activeKey.value], { params:searchParams.value })
        }

        const subscribeNftTransferStatus = async () => {
            await clearInterval(intervalId.value)
            intervalId.value = setInterval(getNftTransferStatus, 1000)
        }

        const onChange = async () => {
            //GETrequest定期実行stop
            await clearInterval(intervalId.value)
            //form値初期化
            resetForm()
            //v-model初期化
            resetModel()
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
            subscribeNftTransferStatus,
        }
    }
};
</script>