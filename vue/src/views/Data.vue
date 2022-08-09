<template>
  <!-- Uncomment the following component to add a form for a `modelName` -->
  <!-- <SpCrud store-name="org.repo.module" item-name="modelName" /> -->
  <div class="container">
    <div id="parent">
      <div class="child">
        <reserve-nft-transfer-form
        @reserve-nft-transfer="reserveNftTransfer"/>
        <transfer-nft-form />
      </div>

      <div class="child">
        <reserved-nft-transfer-list />
        <nft-transfer-list />
      </div>
    </div>
  </div>
</template>

<style>
h3 {
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 4px;
}

table {
  font-size: 14px;
}
table, th, td {
  border: 1px solid;
  border-collapse: collapse;
}
th ,td {
  padding: 5px 10px;
}

#parent {
  display: flex;
}
.child {
  flex-grow: 1;
  margin: 20px;
}
</style>

<script>
import { useStore } from 'vuex'
import { SigningStargateClient, assertIsDeliverTxSuccess } from '@cosmjs/stargate'
import ReservedNftTransferList from '../components/ReservedNftTransferList.vue';
import NftTransferList from '../components/NftTransferList.vue';
import ReserveNftTransferForm from '../components/ReserveNftTransferForm.vue';
import TransferNftForm from '../components/TransferNftForm.vue';

export default {
  name: 'Data',

  components: {
    ReservedNftTransferList,
    NftTransferList,
    ReserveNftTransferForm,
    TransferNftForm,
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
        const recipient = "cosmos14fsljnzssps70732lulh6463rdw6v25nhg6u3a";
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
