<template>
  <a-modal v-model:visible="isVisible" :title="title" width="70%" bodyStyle="background: #ececec;" centered @ok="handleOk" @cancel="cancel">
    <a-card title="Source: ADON Kitties（NFT）" >
      <template #extra>Contract: 
        {{ srcContractAddr }}
      </template>
      <a-descriptions bordered>
        <a-descriptions-item label="Blockchain" :span="3">
          {{ blockchainLabel(values.nftSrcChain) }}
        </a-descriptions-item>
        <a-descriptions-item label="Wallet address" :span="3">
          {{ values.nftSrcAddr }}
        </a-descriptions-item>
        <a-descriptions-item label="Token ID" :span="3">
          {{ values.nftTokenId }}
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
          {{ blockchainLabel(values.nftDestChain) }}
        </a-descriptions-item>
        <a-descriptions-item label="Wallet address" :span="3">
          {{ values.nftDestAddr }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
  </a-modal>
</template>

<script lang="ts">
import { computed } from 'vue';
import { CaretDownOutlined } from '@ant-design/icons-vue';
import { blockchainOpts, destContractAddr, srcContractAddr } from '../../const';

export default {
  name: 'NftTransferEditConfirmModal',

  components: {
    blockchainOpts,
    CaretDownOutlined,
  },
  emits: ['handleOk','cancel'],
  props: {
    isVisible: Boolean,
    values: {
      type: Object,
      required: true,
      'default': () => ({
        creator:'',
        nftSrcChain: NaN,
        nftSrcAddr: '',
        nftTokenId: '',
        nftDestChain: NaN,
        nftDestAddr: '',
      })
    }
  },
  setup(props,{ emit }) {
    const title = 'Are these details ok?'
    const isVisible = computed(() => props.isVisible)
    const values = computed(() => props.values) 

    // methods
    const handleOk = () => {
      emit('handleOk')
    }

    const cancel = () => {
      emit('cancel')
    }

    const blockchainLabel = (value: number) => {
      for (const blockchainOpt of blockchainOpts) {
          if (blockchainOpt.value == value) {
              return blockchainOpt.label
          }
      }
      return null
    }

    return {
      srcContractAddr,
      destContractAddr,
      title,
      isVisible,
      values,
      handleOk,
      cancel,
      blockchainLabel,
    }
  }  
}
</script>