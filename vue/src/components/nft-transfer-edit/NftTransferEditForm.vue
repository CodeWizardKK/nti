<template>
  <Form :validation-schema="schema" @submit="onSubmit">
    <!-- You can use the field component to wrap a q-* component -->
    <!-- Do this if you have only one or a few places that need validation -->
    <input-with-validation name="nftTokenId" label="Token ID"></input-with-validation>
    <input-with-validation name="nftSrcChain" label="Blockchain"></input-with-validation>
    <input-with-validation name="nftSrcAddr" label="Address"></input-with-validation>
    <input-with-validation name="nftDestChain" label="Blockchain"></input-with-validation>
    <input-with-validation name="nftDestAddr" label="Address"></input-with-validation>
    <input-with-validation name="fungibleToken" label="Amount"></input-with-validation>
    <input-with-validation name="ftChain" label="Blockchain"></input-with-validation>
    <input-with-validation name="ftSrcAddr" label="Source address"></input-with-validation>
    <input-with-validation name="ftDestAddr" label="Destination address"></input-with-validation>
    <input-with-validation name="blockHeight" label="Block height"></input-with-validation>

    <a-form-item>
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </Form>
</template>

<script setup lang="ts">
import { Field, Form } from 'vee-validate';
import * as yup from 'yup';
import useAccount from '../../composables/useAccount';
import InputWithValidation from '../common/InputWithValidation.vue';

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

