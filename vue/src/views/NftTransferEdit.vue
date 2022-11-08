<template>
  <!-- Uncomment the following component to add a form for a `modelName` -->
  <!-- <SpCrud store-name="org.repo.module" item-name="modelName" /> -->
  <div>
    <page-title title="NFT Transfer Edit"></page-title>
    <nft-transfer-edit-form
    @reserveNftTransfer="reserveNftTransfer"></nft-transfer-edit-form>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { SigningStargateClient, assertIsDeliverTxSuccess } from '@cosmjs/stargate'
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
        // Send fungible tokens
        const amount = '10';
        // Admin's wallet address
        const recipient = "cosmos1tjq4a090lk3jqs42smueez34m92l3vu74z6y4d";
        const chainId = "nti"; // Project name

        await window.keplr.enable(chainId);
        const offlineSigner = window.getOfflineSigner(chainId);
        const accounts = await offlineSigner.getAccounts();

        const client = await SigningStargateClient.connectWithSigner(
            // "https://lcd-cosmoshub.keplr.app",
            "http://0.0.0.0:26657", // Tendermint URL
            offlineSigner
        )

        const amountFinal = {
            denom: 'token',
            amount,
        }
        const feeAmount = [{
            denom: 'stake',
            amount: '16000000000',
        }]
        const fee = {
            amount: feeAmount,
            gas: '200000',
        }

        console.log('Send tokens...')
        const result = await client.sendTokens(accounts[0].address, recipient, [amountFinal], fee, "")
        assertIsDeliverTxSuccess(result)

        if (result.code !== undefined &&
            result.code !== 0) {
            alert("Failed to send tx: " + result.log || result.rawLog);
        } else {
            alert("Succeed to send tx:" + result.transactionHash);
        }

        console.log(value)

        // Send Tx
        console.log('Send msg reserve nft transer...')
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
