<template>
  <Form :validation-schema="schema" @submit="onSubmit">
    <!-- You can use the field component to wrap a q-* component -->
    <!-- Do this if you have only one or a few places that need validation -->
    <Field name="tokenId" v-slot="{ value, handleChange, errorMessage }">
      <a-form-item
        label="Token ID"
        :has-feedback="!!errorMessage"
        :help="errorMessage"
        :validate-status="errorMessage ? 'error' : undefined"
      >
        <a-input :value="value" @update:value="handleChange" />
      </a-form-item>
    </Field>

    <a-form-item>
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </Form>
</template>

<script lang="ts">
import { Field, Form } from 'vee-validate';
import * as yup from 'yup';
import useAccount from '../../composables/useAccount';

export default {
    emits: ['reserveNftTransfer'],
    components: { Field, Form },

    setup(props: any, context: any) {
        const { currentAccount } = useAccount()

        const schema = yup.object({
            tokenId: yup.string().required().label('Token ID'),
            nftSrcAddr: yup.string().required().label('Address'),
        });

        const onSubmit = (values: any) => {
            console.log('Success:', values)
            const value = {
                creator: currentAccount.value,
            };

            context.emit('reserveNftTransfer', value)
        }

        return {
            onSubmit,
            schema,
        }
    },
}


</script>

