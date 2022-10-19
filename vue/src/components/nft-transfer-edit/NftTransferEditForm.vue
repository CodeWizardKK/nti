<template>
  <Form :validation-schema="schema" @submit="onSubmit">
    <!-- You can use the field component to wrap a q-* component -->
    <!-- Do this if you have only one or a few places that need validation -->

    <a-card title="NFT Source">
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

    <a-card title="NFT Destination">
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

    <!--
    <a-card title="Fungible Token">
      <a-form-item label="Set fungible token">
        <a-switch :checked="isFtEnabled" @change="onChangeFtEnabled" /> 
      </a-form-item>

      <div v-if="isFtEnabled">
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
      </div>
    </a-card>
    -->
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

enum Blockchain {
  ETH,
  BTC,
  AVAX
}

const blockchainOpts = [
  { value: Blockchain.ETH, label: "ETH", prefix: "0x" },
  { value: Blockchain.BTC, label: "BTC", prefix: "" },
  { value: Blockchain.AVAX, label: "AVAX", prefix: "" },
]

const srcAddrPrefix = ref("")
const destAddrPrefix = ref("")
const onSelectSrcChain = (value: any) => {
  setAddrPrefix(srcAddrPrefix, value)
  fetchTokenIds()
}
const onSelectDestChain = (value: any) => {
  setAddrPrefix(destAddrPrefix, value)
}
// 選択されたブロックチェーンに応じたアドレスの接頭辞を表示する
const setAddrPrefix = (addrPrefix: Ref<string>, blockchain: Blockchain) => {
  for (const blockchainOpt of blockchainOpts) {
    if (blockchainOpt.value == blockchain) {
      addrPrefix.value = blockchainOpt.prefix
    }
  }
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

const schemaWithFt = yup.object({
    nftTokenId: yup.string().required().label('Token ID'),
    nftSrcChain: yup.number().required().label('Blockchain'),
    nftSrcAddr: yup.string().required().label('Address'),
    nftDestChain: yup.number().required().label('Blockchain'),
    nftDestAddr: yup.string().required().label('Address'),
    fungibleToken: yup.number().required().label('Amount'),
    ftChain: yup.number().required().label('Blockchain'),
    ftSrcAddr: yup.string().required().label('Source address'),
    ftDestAddr: yup.string().required().label('Destination address'),
    blockHeight: yup.number().required().label('Block height'),
});

const schemaWoFt = yup.object({
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

const isFtEnabled = ref(false)
const schema = ref(schemaWoFt)
const onChangeFtEnabled = (checked: boolean, e: any) => {
  console.log(e)
  isFtEnabled.value = checked
  schema.value = checked ? schemaWithFt : schemaWoFt
}

const emits = defineEmits(['reserveNftTransfer'])
const { currentAccount } = useAccount()

const onSubmit = (values: any) => {
    console.log('Success:', values)
    values.creator = currentAccount.value
    emits('reserveNftTransfer', values)
}

</script>
