<template>
  <div class="separator">{{ text }}</div>
</template>
<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'

export default Vue.extend({
  props: {
    plaintext: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    text() {
      return this.plaintext
        ? this.value
        : dayjs(parseInt(this.value)).format('MMMM DD')
    },
  },
})
</script>
<style scoped lang="less" src="./HorizontalRuleText.less"></style>
