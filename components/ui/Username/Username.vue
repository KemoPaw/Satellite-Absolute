<template src="./Username.html"></template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    username: {
      type: String,
      required: true,
    },
    badge: {
      type: String,
      default: '',
      required: false,
    },
  },
})
</script>
<style scoped lang="less" src="./Username.less"></style>
