<template>
  <Form :validation-schema="schema" @submit="onSubmit">
    <!-- You can use the field component to wrap a q-* component -->
    <!-- Do this if you have only one or a few places that need validation -->

    <a-card title="Source: ADON（NFT）">
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

      <Field name="nftSrcAddr" v-slot="{ value, handleChange, errorMessage }">
        <a-form-item
          label="Address"
          :has-feedback="!!errorMessage"
          :help="errorMessage"
          :validate-status="errorMessage ? 'error' : undefined"
        >
          <a-input
            :value="formatAddr(value)"
            @update:value="handleChange"
            :addon-before="srcAddrPrefix"/>
        </a-form-item>
      </Field>

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
    </a-card>
    <br />

    <a-card title="Destination: ONFET（NFT）">
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
            @change="handleChange"
            @select="onSelectDestChain">
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
          <a-input
            :value="formatAddr(value)"
            @update:value="handleChange"
            :addon-before="destAddrPrefix"/>
        </a-form-item>
      </Field>
    </a-card>
    <br />

    <a-form-item>
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </Form>
</template>

<script setup lang="ts">
import { Field, Form } from 'vee-validate';
import { ref, Ref } from 'vue';
import * as yup from 'yup';
import useAccount from '../../composables/useAccount';
import useAddress from '../../composables/useAddress';
import { blockchainOpts } from '../../const';

const srcChain = ref(NaN)
const destChain = ref(NaN)
const { addrPrefix: srcAddrPrefix } = useAddress(srcChain)
const { addrPrefix: destAddrPrefix } = useAddress(destChain)

const onSelectSrcChain = (value: any) => {
  srcChain.value = value
  fetchTokenIds()
}
const onSelectDestChain = (value: any) => {
  destChain.value = value
}

// アドレスの先頭に"0x"が付いている場合除く
const formatAddr = (value: any) => {
  const addr = value ? value : ""
  return addr.startsWith("0x") ? addr.slice(2) : addr
}

// イーサリアムの場合、アドレスから所有するトークンのIDリストを取得する
const fetchTokenIds = () => {
  console.log('fetch')
}

const schema = yup.object({
    nftTokenId: yup.string().required().label('Token ID'),
    nftSrcChain: yup.number().required().label('Blockchain'),
    nftSrcAddr: yup.string().required().label('Address'),
    nftDestChain: yup.number().required().label('Blockchain'),
    nftDestAddr: yup.string().required().label('Address'),
    fungibleToken: yup.number().label('Amount'),
    ftChain: yup.number().label('Blockchain'),
    ftSrcAddr: yup.string().label('Source address'),
    ftDestAddr: yup.string().label('Destination address'),
    blockHeight: yup.number().label('Block height'),
});

const emits = defineEmits(['reserveNftTransfer'])
const { currentAccount } = useAccount()

const onSubmit = (values: any) => {
    console.log('Success:', values)
    values.creator = currentAccount.value
    values.nftSrcAddr = srcAddrPrefix.value + values.nftSrcAddr
    values.nftDestAddr = destAddrPrefix.value + values.nftDestAddr
    emits('reserveNftTransfer', values)
}

</script>
