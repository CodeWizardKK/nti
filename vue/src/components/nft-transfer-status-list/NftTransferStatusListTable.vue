<template>
    <div>
        child: {{ items }}
    </div>
</template>

<script lang="ts">
import { computed } from 'vue'
export default {
    props: {
        items: Object
    },
    setup(props: any) {
        const items = computed(() => props.items)

        return {
            items,
        }
    }
};
</script>