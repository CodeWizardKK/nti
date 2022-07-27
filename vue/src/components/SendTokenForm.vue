<template>
    <div>
        <div class="sp-papers__main sp-box sp-shadow sp-form-group">
            <form class="sp-papers__main__form">
            <div class="sp-papers__main__rcpt__header sp-box-header">
                Send Token
            </div>

            <input class="sp-input" placeholder="Recipient" v-model="recipient" />
            <input class="sp-input" placeholder="Amount" v-model="amount" />
            <sp-button @click="submit">Submit</sp-button>
            </form>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { SigningStargateClient, assertIsDeliverTxSuccess } from '@cosmjs/stargate'
import useAccount from '../composables/useAccount'

export default {
  name: "Send Token Form",

  setup() {
    const { currentAccount } = useAccount()

    // store
    let $s = useStore()

    // state
    const recipient = ref('')
    const amount = ref('')

    // methods
    const submit = async () => {
        console.log('submit')

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
            amount: amount.value,
        }
        const fee = {
            amount: [{
                denom: 'token',
                amount: '5000',
            }, ],
            gas: '200000',
        }
        const result = await client.sendTokens(accounts[0].address, recipient.value, [amountFinal], fee, "")
        assertIsDeliverTxSuccess(result)

        if (result.code !== undefined &&
            result.code !== 0) {
            alert("Failed to send tx: " + result.log || result.rawLog);
        } else {
            alert("Succeed to send tx:" + result.transactionHash);
        }
    }

    return {
        recipient,
        amount,
        submit,
    }
  },
};
</script>