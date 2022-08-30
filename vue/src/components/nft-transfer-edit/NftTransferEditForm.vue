<template>
    <a-form
    :model="formState"
    name="transfer"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed">
    {{ formState }}
        <a-form-item label="Token ID" name="tokenId" :rules="[{ required: true, message: 'Please input Token ID!' }]">
            <a-input :value="formState.tokenId"></a-input>
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">Transfer</a-button>
        </a-form-item>
    </a-form>
</template>
<script lang="ts">
import { reactive } from 'vue'
import useAccount from '../../composables/useAccount'

interface FormState {
    tokenId: string;
}

export default {
  name: "Reserve NFT Transer Form",
  emits: ['reserveNftTransfer'],

  setup(props: any, context: any) {
    const { currentAccount } = useAccount()

    // state
    const formState = reactive<FormState>({
        tokenId: '',
    })

    // methods
    const onFinish = (values: any) => {
        console.log('Success:', values)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    const transferNft = () => {
        const value = {
            creator: currentAccount.value,
        };

        context.emit('reserveNftTransfer', value)
    }

    return {
        formState,
        onFinish,
        onFinishFailed,
        transferNft,
    }
  },
};
</script>