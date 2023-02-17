<template>
  <!-- Uncomment the following component to add a form for a `modelName` -->
  <!-- <SpCrud store-name="org.repo.module" item-name="modelName" /> -->
  <div>
    <a-spin :spinning="isSpinning">
      <page-title title="NFT Transfer Reservation Form"></page-title>
      <nft-transfer-edit-form
      :key="resetKey"
      @confirm="confirm"></nft-transfer-edit-form>
      <nft-transfer-edit-confirm-modal
      :isVisible="isModalVisible" 
      :values="values" 
      @handleOk="sendTransaction" 
      @cancel="closeModal"></nft-transfer-edit-confirm-modal>
    </a-spin>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { useStore } from 'vuex'
import { Modal } from 'ant-design-vue';
import NftTransferEditConfirmModal from '../components/nft-transfer-edit/NftTransferEditConfirmModal.vue';
import NftTransferEditForm from '../components/nft-transfer-edit/NftTransferEditForm.vue';
import PageTitle from '../components/common/PageTitle.vue';

export default {
  name: 'NftTransferEdit',

  components: {
    NftTransferEditConfirmModal,
    NftTransferEditForm,
    PageTitle,
  },

  setup(props, context) {
    const isSpinning = ref(false);
    const resetKey = ref(0)
    const isModalVisible = ref(false)
    const values = reactive({})

    const resetForm = () => {
      resetKey.value++
    }
    
    // store
    let $s = useStore()

    // methods
    const confirm = (value) => {
        values.creator = value.creator
        values.nftSrcAddr = value.nftSrcAddr
        values.nftSrcChain = value.nftSrcChain
        values.nftTokenId = value.nftTokenId
        values.nftDestAddr = value.nftDestAddr
        values.nftDestChain = value.nftDestChain
        openModal()
    }

    const sendTransaction = async () => {
      try {
        closeModal()
        spinningOn()        
        // Send Tx
        const feeAmount = [{
            denom: 'stake',
            amount: '16000000000',
        }]

        await $s.dispatch("nti.nti/sendMsgReserveNftTransfer", {
            value: values,
            fee: feeAmount,
        });

        successModal()

      } catch (err) {
        console.log(err)
        errorModal(err)

      } finally {
        spinningOff()
          
      }
    }

    const openModal = () => {
      isModalVisible.value = true
    }

    const closeModal = () => {
      isModalVisible.value = false
    }

    const successModal = () => {
      Modal.success({
        title: 'success',
        content: 'reservation completed',
        onOk() {
          resetForm()
        }
      })
    }

    const errorModal = ( err ) => {
      Modal.error({
        title: 'error',
        content: `${err}`,
      })
    }

    const spinningOn = () => {
      isSpinning.value = true
    }

    const spinningOff = () => {
      isSpinning.value = false
    }

    return {
      isSpinning,
      resetKey,
      confirm,
      isModalVisible,
      values,
      sendTransaction,
      closeModal,
    }
  }
}
</script>
