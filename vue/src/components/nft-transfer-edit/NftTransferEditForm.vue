<template>
  <Form :validation-schema="schema" @submit="onSubmit">
    <!-- You can use the field component to wrap a q-* component -->
    <!-- Do this if you have only one or a few places that need validation -->
    <Field name="nftTokenId" v-slot="{ value, handleChange, errorMessage }">
      <a-form-item
        label="Token ID"
        :has-feedback="!!errorMessage"
        :help="errorMessage"
        :validate-status="errorMessage ? 'error' : undefined"
      >
        <a-input :value="value" @update:value="handleChange" />
      </a-form-item>
    </Field>

    <Field name="nftSrcChain" v-slot="{ value, handleChange, errorMessage }">
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
          @change="handleChange">
          <a-select-option
            v-for="blockchain in blockchainOpts"
            :key="blockchain.label"
            :value="blockchain.value">
            {{ blockchain.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </Field>

    <Field name="nftSrcAddr" v-slot="{ value, handleChange, errorMessage }">
      <a-form-item
        label="Address"
        :has-feedback="!!errorMessage"
        :help="errorMessage"
        :validate-status="errorMessage ? 'error' : undefined"
      >
        <a-input :value="value" @update:value="handleChange" />
      </a-form-item>
    </Field>

    <Field name="nftDestChain" v-slot="{ value, handleChange, errorMessage }">
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
          @change="handleChange">
          <a-select-option
            v-for="blockchain in blockchainOpts"
            :key="blockchain.label"
            :value="blockchain.value">
            {{ blockchain.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </Field>

    <Field name="nftDestAddr" v-slot="{ value, handleChange, errorMessage }">
      <a-form-item
        label="Address"
        :has-feedback="!!errorMessage"
        :help="errorMessage"
        :validate-status="errorMessage ? 'error' : undefined"
      >
        <a-input :value="value" @update:value="handleChange" />
      </a-form-item>
    </Field>

    <Field name="fungibleToken" v-slot="{ value, handleChange, errorMessage }">
      <a-form-item
        label="Amount"
        :has-feedback="!!errorMessage"
        :help="errorMessage"
        :validate-status="errorMessage ? 'error' : undefined">
          <a-input-number :value="value" @change="handleChange"/>
      </a-form-item>
    </Field>

    <Field name="ftChain" v-slot="{ value, handleChange, errorMessage }">
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
          @change="handleChange">
          <a-select-option
            v-for="blockchain in blockchainOpts"
            :key="blockchain.label"
            :value="blockchain.value">
            {{ blockchain.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </Field>

    <Field name="ftSrcAddr" v-slot="{ value, handleChange, errorMessage }">
      <a-form-item
        label="Source address"
        :has-feedback="!!errorMessage"
        :help="errorMessage"
        :validate-status="errorMessage ? 'error' : undefined"
      >
        <a-input :value="value" @update:value="handleChange" />
      </a-form-item>
    </Field>
    <Field name="ftDestAddr" v-slot="{ value, handleChange, errorMessage }">
      <a-form-item
        label="Destination address"
        :has-feedback="!!errorMessage"
        :help="errorMessage"
        :validate-status="errorMessage ? 'error' : undefined"
      >
        <a-input :value="value" @update:value="handleChange" />
      </a-form-item>
    </Field>

    <Field name="blockHeight" v-slot="{ value, handleChange, errorMessage }">
      <a-form-item
        label="Block height"
        :has-feedback="!!errorMessage"
        :help="errorMessage"
        :validate-status="errorMessage ? 'error' : undefined">
          <a-input-number :value="value" @change="handleChange"/>
      </a-form-item>
    </Field>


    <a-form-item>
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </Form>
</template>

<script setup lang="ts">
import { Field, Form } from 'vee-validate';
import * as yup from 'yup';
import useAccount from '../../composables/useAccount';

enum Blockchain {
  ETH,
  BTC,
  AVAX
}

const blockchainOpts = [
  { value: Blockchain.ETH, label: "ETH" },
  { value: Blockchain.BTC, label: "BTC" },
  { value: Blockchain.AVAX, label: "AVAX" },
]

const schema = yup.object({
    nftTokenId: yup.string().required().label('Token ID'),
    nftSrcChain: yup.string().required().label('Blockchain'),
    nftSrcAddr: yup.string().required().label('Address'),
    nftDestChain: yup.string().required().label('Blockchain'),
    nftDestAddr: yup.string().required().label('Address'),
    fungibleToken: yup.string().required().label('Amount'),
    ftChain: yup.string().required().label('Blockchain'),
    ftSrcAddr: yup.string().required().label('Source address'),
    ftDestAddr: yup.string().required().label('Destination address'),
    blockHeight: yup.string().required().label('Block height'),
});

const onSubmit = (values: any) => {
    console.log('Success:', values)
    // const value = {
        // creator: currentAccount.value,
    // };

    // context.emit('reserveNftTransfer', value)
}

</script>

