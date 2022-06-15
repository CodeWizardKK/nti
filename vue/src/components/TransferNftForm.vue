<template>
    <div>
        <div class="sp-papers__main sp-box sp-shadow sp-form-group">
            <form class="sp-papers__main__form">
            <div class="sp-papers__main__rcpt__header sp-box-header">
                Transfer NFT
            </div>

            <input class="sp-input" placeholder="Source NFT Hash" v-model="srcNftHash" />
            <input class="sp-input" placeholder="Source Chain" v-model="srcChain" />
            <input class="sp-input" placeholder="Source Address" v-model="srcAddr" />
            <input class="sp-input" placeholder="Destination NFT Hash" v-model="destNftHash" />
            <input class="sp-input" placeholder="Destination Chain" v-model="destChain" />
            <input class="sp-input" placeholder="Destination Address" v-model="destAddr" />
            <sp-button @click="transferNft">Transfer NFT</sp-button>
            </form>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import useAccount from '../composables/useAccount'

export default {
  name: "NFT Transer Form",

  setup() {
    const { currentAccount } = useAccount()

    // store
    let $s = useStore()

    // state
    const srcNftHash = ref('')
    const srcChain = ref('')
    const srcAddr = ref('')
    const destNftHash = ref('')
    const destChain = ref('')
    const destAddr = ref('')

    // methods
    const transferNft = async () => {
        const value = {
            creator: currentAccount.value,
            srcNftHash: srcNftHash.value,
            srcChain: srcChain.value,
            srcAddr: srcAddr.value,
            destNftHash: destNftHash.value,
            destChain: destChain.value,
            destAddr: destAddr.value,
        };

        try {
            await $s.dispatch("nti.nti/sendMsgTransferNft", {
                value,
                fee: [],
            });
        } catch (err) {
            console.log(err)
        }
    }

    return {
        srcNftHash,
        srcChain,
        srcAddr,
        destNftHash,
        destChain,
        destAddr,
        transferNft,
    }
  },
};
</script>