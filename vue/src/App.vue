<template>
  <div>
    <SpTheme>
      <SpNavbar
        :links="navbarLinks"
        :active-route="router.currentRoute.value.path"
      />
      <router-view />
    </SpTheme>
  </div>
</template>

<script lang="ts">
import { SigningCosmosClient } from '@cosmjs/launchpad'
import { SpNavbar, SpTheme } from '@starport/vue'
import { computed, onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  components: { SpTheme, SpNavbar },

  setup() {
    // store
    let $s = useStore()

    // router
    let router = useRouter()

    // state
    let navbarLinks = [
      { name: 'Portfolio', url: '/portfolio' },
      { name: 'Data', url: '/data' }
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
          console.log(window.keplr)
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
          console.log(accounts)
      
          // Initialize the gaia api with the offline signer that is injected by Keplr extension.
          const cosmJS = new SigningCosmosClient(
              "https://lcd-cosmoshub.keplr.app",
              accounts[0].address,
              offlineSigner,
          );

          console.log(cosmJS)
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
