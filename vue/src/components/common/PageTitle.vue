<template>
    <a-typography-title :level="3" :style="{ margin: '36px 0 24px 0' }">
        {{ title }}
    </a-typography-title>
</template>

<script>
export default {
  props: { title: String },
  setup(props) {
    const title = props.title
    return {
        title
    }
  },
};
</script>