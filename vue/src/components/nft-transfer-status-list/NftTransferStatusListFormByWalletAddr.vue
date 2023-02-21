<template>
  <Form :validation-schema="schema" @submit="onSubmit">
    <!-- You can use the field component to wrap a q-* component -->
    <!-- Do this if you have only one or a few places that need validation -->

      <Field name="chain" v-slot="{ handleChange, errorMessage }">
        <a-form-item
          label="Blockchain"
          :has-feedback="!!errorMessage"
          :help="errorMessage"
          :validate-status="errorMessage ? 'error' : undefined">
          <a-select
            ref="select"
            :value="Number.isNaN(chain) ? undefined : chain"
            style="width: 120px"
            @focus="focus"
            @change="handleChange"
            @select="onSelectChain">
            <a-select-option
              v-for="blockchain in blockchainOpts"
              :key="blockchain.label"
              :value="blockchain.value">
              {{ blockchain.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </Field>

      <Field name="walletAddr" v-slot="{ handleChange, errorMessage }">
        <a-form-item
          label="Wallet address"
          :has-feedback="!!errorMessage"
          :help="errorMessage"
          :validate-status="errorMessage ? 'error' : undefined"
        >
          <a-input
            :value="removePrefix(walletAddr)"
            @input="$emit('update:walletAddr', removePrefix($event.target.value))"
            @update:value="handleChange"
            :addon-before="addrPrefix"
            :disabled="isAddrDisabled()" />
        </a-form-item>
      </Field>

      <a-form-item>
        <a-button type="primary" html-type="submit">Search</a-button>
      </a-form-item>
    <br />
  </Form>
</template>

<script setup lang="ts">
import { Field, Form } from 'vee-validate';
import { computed } from 'vue';
import * as yup from 'yup';
import useAddress from '../../composables/useAddress';
import { blockchainOpts } from '../../const';

const schema = yup.object({
    chain: yup.number().required().label('Blockchain'),
    walletAddr: yup.string().required().label('Wallet address'),
});

const props = defineProps({
  chain: {
    type : Number,
    default : NaN,
  },
  walletAddr: {
    type : String,
    default : '',
  },
})

const emits = defineEmits([
  'update:chain',
  'update:walletAddr',
  'subscribeNftTransferStatus'
])

const chain = computed(() => props.chain)
const { addrPrefix, removePrefix, addPrefix, isAddrDisabled } = useAddress(chain)

const onSelectChain = (value: any) => {
  emits('update:chain',value)
}

const onSubmit = (values: any) => {
    values.walletAddr = addPrefix(values.walletAddr)
    emits('update:walletAddr',values.walletAddr)
    emits('subscribeNftTransferStatus')
}

</script>
