<template src="./Shop.html"></template>

<script lang="ts">
import Vue from 'vue'
import { marketGlyphShopFilter, marketGlyphs } from '~/mock/marketplace'

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      marketGlyphShopFilter,
      marketGlyphs,
    }
  },
})
</script>

<style scoped lang="less" src="./Shop.less"></style>
