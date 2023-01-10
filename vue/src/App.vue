<template>
  <a-layout>
    <a-layout-header :style="{ background: '#fff', padding: '0 10px'}">
      <a-space align="center">
        <SpAcc />
      </a-space>
    </a-layout-header>

    <a-layout :style="{ 'min-height': '100vh' }">
      <a-layout-sider :style="{ padding: '10px 0' }">
        <a-menu :selectedKeys="selectedKeys" theme="dark">
          <a-menu-item
          v-for="item in menuItems"
          :key="item.name"
          @click="pushRoute(item)">
            <span>
              {{ item.name }}
            </span>
          </a-menu-item>
        </a-menu>
        side menu
      </a-layout-sider>

      <a-layout>
        <a-layout-content :style="{ padding: '0 48px' }">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { SigningCosmosClient } from '@cosmjs/launchpad'
import { SpAcc } from '@starport/vue'
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const menuItems = [
  { name: 'Portfolio', url: '/portfolio' },
  { name: 'NFT Transfer Status', url: '/nft_transfer_status_list' },
  { name: 'NFT Transfer Reservation Form', url: '/nft_transfer_edit' },
  { name: 'NFT Transfer Reservations', url: '/nft_transfer_list' },
]

export default {
  components: { SpAcc },

  setup() {
    // store
    let $s = useStore()

    // router
    let router = useRouter()

    // state
    const selectedKeys = ref([''])

    // computed
    let address = computed(() => $s.getters['common/wallet/address'])

    // methods
    const pushRoute = (menuItem: any) => {
      selectedKeys.value = [menuItem.name]
      router.push(menuItem.url)
    }

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
      router,
      address,
      menuItems,
      selectedKeys,
      pushRoute
    }
  }
}
</script>

<style scoped lang="scss">
body {
  margin: 0;
}
</style>
