<template src="./CaretDivider.html"></template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    text: {
      type: String,
      default: function () {
        return this.$t('internal.missing_text')
      },
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./CaretDivider.less"></style>
