<template>
  <!-- Uncomment the following component to add a form for a `modelName` -->
  <!-- <SpCrud store-name="org.repo.module" item-name="modelName" /> -->
  <div>
    <a-spin :spinning="isSpinning">
      <page-title title="NFT Transfer Reservation Form"></page-title>
      <nft-transfer-edit-form
      :key="resetKey"
      @reserveNftTransfer="reserveNftTransfer"></nft-transfer-edit-form>
    </a-spin>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex'
import { Modal } from 'ant-design-vue';
import NftTransferEditForm from '../components/nft-transfer-edit/NftTransferEditForm.vue';
import PageTitle from '../components/common/PageTitle.vue';

export default {
  name: 'Data',

  components: {
    NftTransferEditForm,
    PageTitle,
  },

  setup(props, context) {
    const isSpinning = ref(false);
    const resetKey = ref(0)
    const reset = () => {
      resetKey.value++
    }
    // store
    let $s = useStore()

    // methods
    const reserveNftTransfer = async (value) => {
      try {
        changeSpinning()
        // Send Tx
        const feeAmount = [{
            denom: 'stake',
            amount: '16000000000',
        }]

        await $s.dispatch("nti.nti/sendMsgReserveNftTransfer", {
            value,
            fee: feeAmount,
        });
        success()

      } catch (err) {
          console.log(err)
          error(err)

        } finally {
          changeSpinning()
          
      }
    }

    const success = () => {
      Modal.success({
        title: 'success',
        content: 'reservation completed',
        onOk() {
          reset()
        }
      })
    }

    const error = ( err ) => {
      Modal.error({
        title: 'error',
        content: `${err}`,
      })
    }

    const changeSpinning = () => {
      isSpinning.value = !isSpinning.value
    }

    return {
      isSpinning,
      resetKey,
      reserveNftTransfer
    }
  }
}
</script>
