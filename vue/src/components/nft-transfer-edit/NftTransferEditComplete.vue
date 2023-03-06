<template>
  <a-result
    status="success"
    title="Successfully NFT Transfer Reservation!"
    sub-title=""
  >
    <template #extra>
      <a-button type="primary" @click="top">Go Reservation Form</a-button>
    </template>
  </a-result>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

// router
let router = useRouter()

const top = () => {
  router.push({
    hash : '',
  })
}
</script>
