<template src="./Text.html"></template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    /**
     * Text to be included
     */
    text: {
      type: String,
      default: function () {
        return this.$t('internal.missing_text')
      },
    },
  },
})
</script>
<style scoped lang="less" src="./Text.less"></style>
