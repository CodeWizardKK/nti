<template>
    <div>
        <div class="sp-papers__main sp-box sp-shadow sp-form-group">
            <form class="sp-papers__main__form">
            <div class="sp-papers__main__rcpt__header sp-box-header">
                Reserve NFT Transfer
            </div>

            <input class="sp-input" placeholder="NFT Source Hash" v-model="nftSrcHash" />
            <input class="sp-input" placeholder="NFT Source Chain" v-model="nftSrcChain" />
            <input class="sp-input" placeholder="NFT Source Address" v-model="nftSrcAddr" />
            <input class="sp-input" placeholder="NFT Destination Chain" v-model="nftDestChain" />
            <input class="sp-input" placeholder="NFT Destination Address" v-model="nftDestAddr" />
            <input class="sp-input" placeholder="FT Chain" v-model="ftChain" />
            <input class="sp-input" placeholder="FT Source Address" v-model="ftSrcAddr" />
            <input class="sp-input" placeholder="FT Destination Address" v-model="ftDestAddr" />
            <input class="sp-input" placeholder="Fungible Token" v-model="fungibleToken" />
            <input class="sp-input" placeholder="Block Height" v-model="blockHeight" />
            <sp-button @click="transferNft">Reserve NFT Transfer</sp-button>
            </form>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import useAccount from '../composables/useAccount'

export default {
  name: "Reserve NFT Transer Form",
  emits: ['reserveNftTransfer'],

  setup(props, context) {
    const { currentAccount } = useAccount()

    // state
    const nftSrcHash = ref('')
    const nftSrcChain = ref('')
    const nftSrcAddr = ref('')
    const nftDestChain = ref('')
    const nftDestAddr = ref('')
    const ftChain = ref('')
    const ftSrcAddr = ref('')
    const ftDestAddr = ref('')
    const fungibleToken = ref('')
    const blockHeight = ref('')

    // methods
    const transferNft = () => {
        const value = {
            creator: currentAccount.value,
            nftSrcHash: nftSrcHash.value,
            nftSrcChain: nftSrcChain.value,
            nftSrcAddr: nftSrcAddr.value,
            nftDestChain: nftDestChain.value,
            nftDestAddr: nftDestAddr.value,
            ftChain: ftChain.value,
            ftSrcAddr: ftSrcAddr.value,
            ftDestAddr: ftDestAddr.value,
            fungibleToken: fungibleToken.value,
            blockHeight: blockHeight.value,
        };

        context.emit('reserveNftTransfer', value)
    }

    return {
        nftSrcHash,
        nftSrcChain,
        nftSrcAddr,
        nftDestChain,
        nftDestAddr,
        ftChain,
        ftSrcAddr,
        ftDestAddr,
        fungibleToken,
        blockHeight,
        transferNft,
    }
  },
};
</script>