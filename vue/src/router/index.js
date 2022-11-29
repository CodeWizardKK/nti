import { createRouter, createWebHistory } from 'vue-router'

import Portfolio from '../views/Portfolio.vue'
import NftTransferEdit from '../views/NftTransferEdit.vue'
import NftTransferList from '../views/NftTransferList.vue'

const routerHistory = createWebHistory()
const routes = [
  { path: '/', component: Portfolio },
  { path: '/portfolio', component: Portfolio },
  { path: '/nft_transfer_edit', component: NftTransferEdit },
  { path: '/nft_transfer_list', component: NftTransferList },
]

const router = createRouter({
  history: routerHistory,
  routes
})

export default router
