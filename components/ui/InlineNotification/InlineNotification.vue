<template src="./InlineNotification.html"></template>
<script lang="ts">
import Vue from 'vue'
import { XIcon } from 'satellite-lucide-icons'

export default Vue.extend({
  components: {
    XIcon,
  },
  props: {
    text: {
      type: String,
      default() {
        return this.$t('internal.missing_text')
      },
      required: true,
    },
  },
})
</script>
<style scoped lang="less" src="./InlineNotification.less"></style>
