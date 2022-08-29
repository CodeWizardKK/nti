<template>
  <a-layout>
    <a-layout-header :style="{ background: '#fff', padding: '0 20px'}">
      <a-space align="center">
        <SpAcc />
      </a-space>
    </a-layout-header>

    <a-layout>
      <a-layout-sider>
        side menu
      </a-layout-sider>

      <a-layout>
        <a-layout-content>
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style scoped>
</style>

<script lang="ts">
import { SigningCosmosClient } from '@cosmjs/launchpad'
import { SpAcc } from '@starport/vue'
import { computed, onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  components: { SpAcc },

  setup() {
    // store
    let $s = useStore()

    // router
    let router = useRouter()

    // state
    let navbarLinks = [
      { name: 'Portfolio', url: '/portfolio' },
      { name: 'NFT Transfer Edit', url: '/nft_transfer_edit' },
      { name: 'NFT Transfer List', url: '/nft_transfer_list' },
      { name: 'Data', url: '/data' },
      { name: 'Keplr', url: '/keplr' },
    ]

    // computed
    let address = computed(() => $s.getters['common/wallet/address'])

    // lh
    onBeforeMount(async () => {
      await $s.dispatch('common/env/init')

      await $s.dispatch("nti.nti/QueryReservedNftTransferAll",{options:{subscribe:true, all:true},params:{}})
      await $s.dispatch("nti.nti/QueryNftTransferAll",{options:{subscribe:true, all:true},params:{}})

      router.push('portfolio')
    })

    onMounted(async () => {
      if (!window.keplr) {
          alert("Please install keplr extension");
      } else {
          const chainId = "cosmoshub-4";

          // Enabling before using the Keplr is recommended.
          // This method will ask the user whether to allow access if they haven't visited this website.
          // Also, it will request that the user unlock the wallet if the wallet is locked.
          await window.keplr.enable(chainId);
      
          const offlineSigner = window.keplr.getOfflineSigner(chainId);
      
          // You can get the address/public keys by `getAccounts` method.
          // It can return the array of address/public key.
          // But, currently, Keplr extension manages only one address/public key pair.
          // XXX: This line is needed to set the sender address for SigningCosmosClient.
          const accounts = await offlineSigner.getAccounts();
      
          // Initialize the gaia api with the offline signer that is injected by Keplr extension.
          const cosmJS = new SigningCosmosClient(
              "https://lcd-cosmoshub.keplr.app",
              accounts[0].address,
              offlineSigner,
          );
      }
    })

    return {
      navbarLinks,
      // router
      router,
      // computed
      address
    }
  }
}
</script>

<style scoped lang="scss">
body {
  margin: 0;
}
</style>
