<template>
    <div>
        {{ items }}
    </div>
</template>

<script lang="ts">
export default {
    props: {
        items: Object
    },
    setup(props: any) {
        const items = props.items

        return {
            items,
        }
    }
};
</script>