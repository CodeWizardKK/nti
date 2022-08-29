<template>
  <!-- Uncomment the following component to add a form for a `modelName` -->
  <!-- <SpCrud store-name="org.repo.module" item-name="modelName" /> -->
  <div>
    <h3>NFT Transfer Edit</h3>
    <nft-transfer-edit-form
    @reserveNftTransfer="reserveNftTransfer"></nft-transfer-edit-form>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { SigningStargateClient, assertIsDeliverTxSuccess } from '@cosmjs/stargate'
import NftTransferEditForm from '../components/nft-transfer-edit/NftTransferEditForm.vue';

export default {
  name: 'Data',

  components: {
    NftTransferEditForm,
  },

  setup(props, context) {
    // store
    let $s = useStore()

    // methods
    const reserveNftTransfer = async (value) => {
      try {
        // Send fungible tokens
        const amount = '1';
        // Admin's wallet address
        const recipient = "cosmos1kjtggekcgcprqf646r94g9x3p9cd3pjw2q27ar";
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
        const fee = {
            amount: [{
                denom: 'token',
                amount: '100',
            }, ],
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

        // Send Tx
        console.log('Send msg reserve nft transer...')
        await $s.dispatch("nti.nti/sendMsgReserveNftTransfer", {
            value,
            fee: [],
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
