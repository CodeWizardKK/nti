<template>
    <div>
        <div class="sp-papers__main sp-box sp-shadow sp-form-group">
            <form class="sp-papers__main__form">
            <div class="sp-papers__main__rcpt__header sp-box-header">
                Send Token
            </div>

            <input class="sp-input" placeholder="Recipient" v-model="recipient" />
            <input class="sp-input" placeholder="Amount" v-model="amount" />
            <sp-button @click="submit">Submit</sp-button>
            </form>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import useAccount from '../composables/useAccount'

export default {
  name: "Send Token Form",

  setup() {
    const { currentAccount } = useAccount()

    // store
    let $s = useStore()

    // state
    const recipient = ref('')
    const amount = ref('')

    // methods
    const submit = async () => {
        console.log('submit')
    }

    return {
        recipient,
        amount,
        submit,
    }
  },
};
</script>