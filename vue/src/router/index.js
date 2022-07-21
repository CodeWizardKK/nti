import { createRouter, createWebHistory } from 'vue-router'

import Data from '../views/Data.vue'
import Keplr from '../views/Keplr.vue'
import Portfolio from '../views/Portfolio.vue'

const routerHistory = createWebHistory()
const routes = [
  { path: '/', component: Portfolio },
  { path: '/portfolio', component: Portfolio },
  { path: '/data', component: Data },
  { path: '/keplr', component: Keplr },
]

const router = createRouter({
  history: routerHistory,
  routes
})

export default router
