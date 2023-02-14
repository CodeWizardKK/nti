<template>
  <Form :validation-schema="schema" @submit="onSubmit">
    <!-- You can use the field component to wrap a q-* component -->
    <!-- Do this if you have only one or a few places that need validation -->

    <a-card title="Source: ADON Kitties（NFT）">
      <template #extra>Contract: 
        <a
        target="_blank"
        rel="noopener noreferrer"
        :href="contractUrl(srcContractAddr)">
          {{ srcContractAddr }}
        </a>
      </template>
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
          label="Wallet address"
          :has-feedback="!!errorMessage"
          :help="errorMessage"
          :validate-status="errorMessage ? 'error' : undefined"
        >
          <a-input
            :value="removeSrcAddrPrefix(value)"
            @update:value="handleChange"
            :addon-before="srcAddrPrefix"
            :disabled="isSrcAddrDisabled()" />
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
    <div style="text-align: center;">
      <caret-down-outlined style="font-size: 30px;" />
    </div>
    <a-card title="Destination: ONFET Kitties（NFT）">
      <template #extra>Contract: 
        <a
        target="_blank"
        rel="noopener noreferrer"
        :href="contractUrl(destContractAddr)">
          {{ destContractAddr }}
        </a>
      </template>
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
          label="Wallet address"
          :has-feedback="!!errorMessage"
          :help="errorMessage"
          :validate-status="errorMessage ? 'error' : undefined"
        >
          <a-input
            :value="removeDestAddrPrefix(value)"
            @update:value="handleChange"
            :addon-before="destAddrPrefix"
            :disabled="isDestAddrDisabled()" />
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
import { CaretDownOutlined } from '@ant-design/icons-vue';
import useAccount from '../../composables/useAccount';
import useAddress from '../../composables/useAddress';
import { blockchainOpts, destContractAddr, srcContractAddr } from '../../const';

const srcChain = ref(NaN)
const destChain = ref(NaN)

const {
  addrPrefix: srcAddrPrefix,
  removePrefix: removeSrcAddrPrefix,
  addPrefix: addSrcAddrPrefix,
  isAddrDisabled: isSrcAddrDisabled,
} = useAddress(srcChain)
const {
  addrPrefix: destAddrPrefix,
  removePrefix: removeDestAddrPrefix,
  addPrefix: addDestAddrPrefix,
  isAddrDisabled: isDestAddrDisabled,
} = useAddress(destChain)

const onSelectSrcChain = (value: any) => {
  srcChain.value = value
  fetchTokenIds()
}
const onSelectDestChain = (value: any) => {
  destChain.value = value
}

// イーサリアムの場合、アドレスから所有するトークンのIDリストを取得する
const fetchTokenIds = () => {
  console.log('fetch')
}

const contractUrl = (addr: any) => {
  return "https://goerli.etherscan.io/address/" + addr
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
    values.creator = currentAccount.value
    values.nftSrcAddr = addSrcAddrPrefix(values.nftSrcAddr)
    values.nftDestAddr = addDestAddrPrefix(values.nftDestAddr)
    console.log('Success:', values)
    emits('reserveNftTransfer', values)
}

</script>
