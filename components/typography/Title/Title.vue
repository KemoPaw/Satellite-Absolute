<template src="./Title.html"></template>
<script lang="ts">
import Vue, { PropType } from 'vue'

import { HeadingSize } from '~/types/ui/typography'

export default Vue.extend({
  props: {
    /**
     * Text to be included in the title
     */
    text: {
      type: String,
      default: function () {
        return this.$t('internal.missing_text')
      },
    },
    /**
     * Size of the subtitle.
     *
     * @remarks - Supports sizes 1-6
     */
    size: {
      type: Number as PropType<HeadingSize>,
      default: 1,
    },
  },
})
</script>
<style scoped lang="less" src="./Title.less"></style>
