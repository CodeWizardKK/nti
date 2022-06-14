import { computed } from 'vue'
import { useStore } from 'vuex'

export default function useAccount() {
    // store
    let $s = useStore()

    // computed
    const loggedIn = computed(() => {
        return $s.getters['common/wallet/loggedIn']
    })

    const currentAccount = computed(() => {
        if (loggedIn.value) {
            return $s.getters['common/wallet/address']
        } else {
            return null
        }
    })

    return {
        currentAccount
    }
}