<template>
  <Form :validation-schema="schema" @submit="onSubmit">
    <!-- You can use the field component to wrap a q-* component -->
    <!-- Do this if you have only one or a few places that need validation -->

    <a-card>
      <Field name="chain" v-slot="{ value, handleChange, errorMessage }">
        <a-form-item
          label="Blockchain"
          :has-feedback="!!errorMessage"
          :help="errorMessage"
          :validate-status="errorMessage ? 'error' : undefined">
          <a-select
            ref="select"
            :value="value"
            style="width: 120px"
            @focus="focus"
            @change="handleChange"
            @select="onSelectSrcChain">
            <a-select-option
              v-for="blockchain in blockchainOpts"
              :key="blockchain.label"
              :value="blockchain.value">
              {{ blockchain.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </Field>
    </a-card>
    <br />

    <a-form-item>
      <a-button type="primary" html-type="submit">Search</a-button>
    </a-form-item>
  </Form>
</template>

<script setup lang="ts">
import { Field, Form } from 'vee-validate';
import { ref, Ref } from 'vue';
import * as yup from 'yup';
import { Blockchain, blockchainOpts } from '../../const';

const schema = yup.object({
    chain: yup.number().required().label('Chain'),
    walletAddr: yup.string().required().label('Wallet address'),
});

const emits = defineEmits(['getNftTransferStatus'])

const onSubmit = (values: any) => {
    console.log('Success:', values)
    emits('getNftTransferStatus', values)
}

</script>
