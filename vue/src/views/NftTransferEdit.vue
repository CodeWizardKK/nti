<template>
  <!-- Uncomment the following component to add a form for a `modelName` -->
  <!-- <SpCrud store-name="org.repo.module" item-name="modelName" /> -->
  <div>
    <page-title title="NFT Transfer Reservation Form"></page-title>
    <nft-transfer-edit-form
    @reserveNftTransfer="reserveNftTransfer"></nft-transfer-edit-form>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import NftTransferEditForm from '../components/nft-transfer-edit/NftTransferEditForm.vue';
import PageTitle from '../components/common/PageTitle.vue';

export default {
  name: 'Data',

  components: {
    NftTransferEditForm,
    PageTitle,
  },

  setup(props, context) {
    // store
    let $s = useStore()

    // methods
    const reserveNftTransfer = async (value) => {
      try {
        // Send Tx
        console.log('Send msg reserve nft transer...')

        const feeAmount = [{
            denom: 'stake',
            amount: '16000000000',
        }]

        await $s.dispatch("nti.nti/sendMsgReserveNftTransfer", {
            value,
            fee: feeAmount,
        });

      } catch (err) {
          console.log(err)
      }
    }

    return {
      reserveNftTransfer
    }
  }
}
</script>
