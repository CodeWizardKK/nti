<template>
  <a-form-item
    :label="label"
    :has-feedback="!!errorMessage"
    :help="errorMessage"
    :validate-status="errorMessage ? 'error' : undefined"
  >
    <a-input :value="value" :type="type" />
    {{ value }}
  </a-form-item>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: false,
    },
})

const { value, errorMessage } = useField(toRef(props, 'name'));
console.log(props)
console.log(useField(toRef(props, 'name')))
console.log(value)
</script>