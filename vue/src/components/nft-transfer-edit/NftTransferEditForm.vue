<template>
  <Form :initial-values="initialValues" :validation-schema="schema" @submit="onSubmit">
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
      <Field name="nftSrcChain" v-slot="{ handleChange, errorMessage }">
        <a-form-item
          label="Blockchain"
          :has-feedback="!!errorMessage"
          :help="errorMessage"
          :validate-status="errorMessage ? 'error' : undefined">
          <a-select
            ref="select"
            :value="Number.isNaN(nftSrcChain) ? undefined : nftSrcChain"
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

      <Field name="nftSrcAddr" v-slot="{ handleChange, errorMessage }">
        <a-form-item
          label="Wallet address"
          :has-feedback="!!errorMessage"
          :help="errorMessage"
          :validate-status="errorMessage ? 'error' : undefined"
        >
          <a-input
           :value="removeSrcAddrPrefix(nftSrcAddr)"
           @input="updateSrcAddr"
           @update:value="handleChange"
           :addon-before="srcAddrPrefix"
           :disabled="isSrcAddrDisabled()" />
        </a-form-item>
      </Field>

      <Field name="nftTokenId" v-slot="{ handleChange, errorMessage }">
        <a-form-item
          label="Token ID"
          :has-feedback="!!errorMessage"
          :help="errorMessage"
          :validate-status="errorMessage ? 'error' : undefined"
        >
          <a-input
           :value="nftTokenId" 
           @input="updateTokenId"
           @update:value="handleChange" />
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
      <Field name="nftDestChain" v-slot="{ handleChange, errorMessage }">
        <a-form-item
          label="Blockchain"
          :has-feedback="!!errorMessage"
          :help="errorMessage"
          :validate-status="errorMessage ? 'error' : undefined">
          <a-select
            ref="select"
            :value="Number.isNaN(nftDestChain) ? undefined : nftDestChain"
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

      <Field name="nftDestAddr" v-slot="{ handleChange, errorMessage }">
        <a-form-item
          label="Wallet address"
          :has-feedback="!!errorMessage"
          :help="errorMessage"
          :validate-status="errorMessage ? 'error' : undefined"
        >
          <a-input
           :value="removeDestAddrPrefix(nftDestAddr)"
           @input="updateDestAddr"
           @update:value="handleChange"
           :addon-before="destAddrPrefix"
           :disabled="isDestAddrDisabled()" />
        </a-form-item>
      </Field>
    </a-card>
    <br />

    <a-form-item>
      <a-button type="primary" html-type="submit">Confirm</a-button>
    </a-form-item>
  </Form>
</template>

<script setup lang="ts">
import { Field, Form } from 'vee-validate';
import { reactive, computed, onBeforeMount } from 'vue';
import * as yup from 'yup';
import { CaretDownOutlined } from '@ant-design/icons-vue';
import useAccount from '../../composables/useAccount';
import useAddress from '../../composables/useAddress';
import { blockchainOpts, destContractAddr, srcContractAddr } from '../../const';
import { message } from 'ant-design-vue';
import { isNull } from 'lodash';
import { useRouter } from 'vue-router';

const props = defineProps({
  creator: {
    type : String,
    default : '',
  },
  nftSrcChain : {
    type : Number,
    default : NaN,
  },
  nftSrcAddr : {
    type : String,
    default : '',
  },
  nftTokenId : {
    type : String,
    default : '',
  },
  nftDestChain : {
    type : Number,
    default : NaN,
  },
  nftDestAddr : {
    type : String,
    default : '',
  },
})

const emits = defineEmits([
  'update:creator',
  'update:nftSrcChain',
  'update:nftSrcAddr',
  'update:nftTokenId',
  'update:nftDestChain',
  'update:nftDestAddr',
  'update:srcAddrPrefix',
])

const srcChain = computed(() => props.nftSrcChain)
const destChain = computed(() => props.nftDestChain)

const {
  addrPrefix: srcAddrPrefix,
  setAddrPrefix: setSrcAddrPrefix,
  removePrefix: removeSrcAddrPrefix,
  addPrefix: addSrcAddrPrefix,
  isAddrDisabled: isSrcAddrDisabled,
} = useAddress(srcChain)
const {
  addrPrefix: destAddrPrefix,
  setAddrPrefix: setDestAddrPrefix,
  removePrefix: removeDestAddrPrefix,
  addPrefix: addDestAddrPrefix,
  isAddrDisabled: isDestAddrDisabled,
} = useAddress(destChain)

let router = useRouter()
let initialValues = reactive({})
const { currentAccount } = useAccount()

//確認画面 => 入力画面へ戻ってきた場合を考慮する
onBeforeMount(() => {
  //Prefix固定表示の有無を設定する
  setSrcAddrPrefix()
  setDestAddrPrefix()
  //入力内容をformに反映する(validation回避の為)
  initialValues = ({
    nftTokenId: props.nftTokenId,
    nftSrcChain: Number.isNaN(props.nftSrcChain) ? undefined : props.nftSrcChain,
    nftSrcAddr: props.nftSrcAddr,
    nftDestChain: Number.isNaN(props.nftDestChain) ? undefined : props.nftDestChain,
    nftDestAddr: props.nftDestAddr,
  })
})

const onSelectSrcChain = (value: any) => {
  emits('update:nftSrcChain',value)
  fetchTokenIds()
}
const onSelectDestChain = (value: any) => {
  emits('update:nftDestChain',value)
}

const updateSrcAddr = (e:any) => {
  emits('update:nftSrcAddr', addSrcAddrPrefix(removeSrcAddrPrefix(e.target.value)))
}

const updateTokenId = (e:any) => {
  emits('update:nftTokenId', e.target.value)
}

const updateDestAddr = (e:any) => {
  emits('update:nftDestAddr', addDestAddrPrefix(removeDestAddrPrefix(e.target.value)))
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

//Transition to Confirm
const onSubmit = (values: any) => {
  console.log('Success:', values)
  if(isNull(currentAccount.value)){
    warningMessage()
    return;
  }
    emits('update:creator', currentAccount.value)
    router.push({
    hash : '#confirm',
  })
}

const warningMessage = () => {
  message.warning({
    content: () => 'Please connect the wallet and press the confirm button again',
    duration: 5,
    class: 'custom-class',
  })
}

</script>
