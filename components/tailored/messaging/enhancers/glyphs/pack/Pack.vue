<template src="./Pack.html"></template>
<script lang="ts">
// eslint-disable-next-line import/named
import Vue, { PropType } from 'vue'
import { ChevronDownIcon, ImageIcon } from 'satellite-lucide-icons'
import { Glyph } from '~/types/ui/glyph'

export default Vue.extend({
  components: {
    ChevronDownIcon,
    ImageIcon,
  },
  props: {
    pack: {
      type: Object as PropType<Glyph>,
      default: null,
    },
  },
  data() {
    return {
      isOpen: true,
    }
  },
})
</script>
<style lang="less" src="./Pack.less"></style>
