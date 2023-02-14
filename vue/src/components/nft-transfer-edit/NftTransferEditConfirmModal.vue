<template>
  <a-modal v-model:visible="isVisible" :title="title" width="70%" bodyStyle="background: #ececec;" centered @ok="handleOk" @cancel="cancel">
    <a-card title="Source: ADON Kitties（NFT）" size="small" >
      <template #extra>Contract: 
        {{ srcContractAddr }}
      </template>
      <a-card title="Blockchain" size="small">
        {{ blockchainLabel(values.nftSrcChain) }}
      </a-card>
      <a-card title="Wallet address" size="small" :style="{ marginTop: '5px' }">
        {{ values.nftSrcAddr }}
      </a-card>
      <a-card title="Token ID" size="small" :style="{ marginTop: '5px' }">
        {{ values.nftTokenId }}
      </a-card>
    </a-card> 
    <div style="text-align: center;">
      <caret-down-outlined style="font-size: 30px;" />
    </div>
    <a-card title="Destination: ONFET Kitties（NFT）" size="small" >
      <template #extra>Contract: 
        {{ destContractAddr }}
      </template>
      <a-card title="Blockchain" size="small">
        {{ blockchainLabel(values.nftDestChain) }}
      </a-card>
      <a-card title="Wallet address" size="small" :style="{ marginTop: '5px' }">
        {{ values.nftDestAddr }}
      </a-card>
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