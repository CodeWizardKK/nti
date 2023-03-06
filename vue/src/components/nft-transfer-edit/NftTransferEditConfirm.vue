<template>
    <a-spin :spinning="isSpinning">
    <a-card title="Source: ADON Kitties（NFT）" >
      <template #extra>Contract: 
        {{ srcContractAddr }}
      </template>
      <a-descriptions bordered>
        <a-descriptions-item label="Blockchain" :span="3">
          {{ blockchainLabel(nftSrcChain) }}
        </a-descriptions-item>
        <a-descriptions-item label="Wallet address" :span="3">
          {{ nftSrcAddr }}
        </a-descriptions-item>
        <a-descriptions-item label="Token ID" :span="3">
          {{ nftTokenId }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card> 
    <div style="text-align: center;">
      <caret-down-outlined style="font-size: 30px;" />
    </div>
    <a-card title="Destination: ONFET Kitties（NFT）" >
      <template #extra>Contract: 
        {{ destContractAddr }}
      </template>
      <a-descriptions bordered>
        <a-descriptions-item label="Blockchain" :span="3">
          {{ blockchainLabel(nftDestChain) }}
        </a-descriptions-item>
        <a-descriptions-item label="Wallet address" :span="3">
          {{ nftDestAddr }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <br />
      <a-button type="primary" @click="onSubmit">Submit</a-button>
      <a-button style="margin-left: 8px" @click="previous">Previous</a-button>
    </a-spin>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
import { CaretDownOutlined } from '@ant-design/icons-vue';
import { blockchainOpts, destContractAddr, srcContractAddr } from '../../const';
import { useRouter } from 'vue-router';

const props = defineProps({
  creator: {
    type : String,
    default : '',
  },
  nftSrcChain : {
    type : Number,
    default : NaN,
  },
  nftSrcAddr : {
    type : String,
    default : '',
  },
  nftTokenId : {
    type : String,
    default : '',
  },
  nftDestChain : {
    type : Number,
    default : NaN,
  },
  nftDestAddr : {
    type : String,
    default : '',
  },
})

// router
let router = useRouter()
// store
let $s = useStore()
const isSpinning = ref(false)

//registration data
const values = computed(() => {
  return ({
      creator : props.creator,
      nftSrcChain : props.nftSrcChain,
      nftSrcAddr : props.nftSrcAddr,
      nftTokenId : props.nftTokenId,
      nftDestChain : props.nftDestChain,
      nftDestAddr : props.nftDestAddr,
    })
})

//register
const onSubmit = async () => {
  try {
    spinningOn()        
    // Send Tx
    const feeAmount = [{
        denom: 'stake',
        amount: '16000000000',
    }]

    await $s.dispatch("nti.nti/sendMsgReserveNftTransfer", {
        value: values.value,
        fee: feeAmount,
    });

    //Transition to complete screen
    router.push({hash : '#complete'})

  } catch (err) {
    console.log(err)
    errorMessage(err)

  } finally {
    spinningOff()
      
  }
}

const errorMessage = (err:any) => {
  message.error({
    content: () => `${err}`,
    duration: 10,
    class: 'custom-class',
  })
}

const spinningOn = () => {
  isSpinning.value = true
}

const spinningOff = () => {
  isSpinning.value = false
}

//Return to Fill out form
const previous = () => {
  router.push({
    hash : '',
  })
}

const blockchainLabel = (value: number) => {
  for (const blockchainOpt of blockchainOpts) {
      if (blockchainOpt.value == value) {
          return blockchainOpt.label
      }
  }
  return null
}
</script>
