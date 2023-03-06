<template>
  <!-- Uncomment the following component to add a form for a `modelName` -->
  <!-- <SpCrud store-name="org.repo.module" item-name="modelName" /> -->
  <div>
    <page-title title="NFT Transfer Reservation Form"></page-title>
    <!-- susPageの値に応じてコンポーネントを切り替えて、擬似的にページ遷移を表現 -->
    <nft-transfer-edit-step :current="current"></nft-transfer-edit-step>
    <component
      :is="subPage"
      v-model:creator="creator"
      v-model:nftSrcChain="nftSrcChain"
      v-model:nftSrcAddr="nftSrcAddr"
      v-model:nftTokenId="nftTokenId"
      v-model:nftDestChain="nftDestChain"
      v-model:nftDestAddr="nftDestAddr"
      ></component>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
import NftTransferEditStep from '../components/nft-transfer-edit/NftTransferEditStep.vue';
import NftTransferEditComplete from '../components/nft-transfer-edit/NftTransferEditComplete.vue';
import NftTransferEditConfirm from '../components/nft-transfer-edit/NftTransferEditConfirm.vue';
import NftTransferEditForm from '../components/nft-transfer-edit/NftTransferEditForm.vue';
import PageTitle from '../components/common/PageTitle.vue';
import { useRoute } from 'vue-router';

//initial value
const init = {
  creator : '',
  nftSrcChain : NaN,
  nftSrcAddr : '',
  nftTokenId : '',
  nftDestChain : NaN,
  nftDestAddr : '',
}

export default {
  name: 'NftTransferEdit',

  components: {
    NftTransferEditComplete,
    NftTransferEditConfirm,
    NftTransferEditForm,
    PageTitle,
    NftTransferEditStep,
  },

  setup(props, context) {
    // router
    let route = useRoute()
    //v-model
    const creator = ref(init.creator)
    const nftSrcChain = ref(init.nftSrcChain)
    const nftSrcAddr = ref(init.nftSrcAddr)
    const nftTokenId = ref(init.nftTokenId)
    const nftDestChain = ref(init.nftDestChain)
    const nftDestAddr = ref(init.nftDestAddr)

    // URLのhashの値に基づいて、stepを切り替える
    const current = computed(() => {
      switch (route.hash) {
        case '#confirm':
          return 1
        case '#complete':
          return 2
        default:
          return 0
      }
    })

    // URLのhashの値に基づいて、返すコンポーネントを切り替える
    const subPage = computed(() => {
      switch (route.hash) {
        //Confirm
        case '#confirm':
          return NftTransferEditConfirm
        //Complete
        case '#complete':
          //v-model初期化
          resetModel()
          return NftTransferEditComplete
        //FillOutForm
        default:
          return NftTransferEditForm
      }
    })

    //Initialization
    const resetModel = () => {
    creator.value = init.creator
    nftSrcChain.value = init.nftSrcChain
    nftSrcAddr.value = init.nftSrcAddr
    nftTokenId.value = init.nftTokenId
    nftDestChain.value = init.nftDestChain
    nftDestAddr.value = init.nftDestAddr
    }

    return {
      creator,
      nftSrcChain,
      nftSrcAddr,
      nftTokenId,
      nftDestChain,
      nftDestAddr,
      current,
      subPage,
    }
  }
}
</script>
