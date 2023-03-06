<template>
  <div class="steps">
    <a-steps :current="current" size="small" type="navigation" >
      <a-step title="Step 1" description="Fill out form" />
      <a-step title="Step 2" description="Confirm" />
      <a-step title="Step 3" description="Complete" />    </a-steps>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({ current: Number })
const current = computed(() => props.current)
</script>

<style scoped>
.steps {
  margin-bottom: 5px;
}
.ant-steps-navigation {
    padding-top: 0px;
}

</style>