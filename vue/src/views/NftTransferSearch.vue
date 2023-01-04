<template>
  <div>
    <page-title title="NFT Transfer Search"></page-title>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import PageTitle from '../components/common/PageTitle.vue';

export default {
    components: {
        PageTitle
    },
    setup() {
        // store
        let $s = useStore()

        // computed
        const items = computed(() => {
            return (
                $s.getters["nti.nti/getReservedNftTransferAll"]({
                    params: {}
                })?.reservedNftTransfer ?? []
            )
        })

        return {
            items,
        }
    }
};
</script>