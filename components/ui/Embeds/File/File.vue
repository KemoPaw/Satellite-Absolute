<template src="./File.html"></template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import filesize from 'filesize'

import { DownloadIcon, FileIcon } from 'satellite-lucide-icons'

import { FileData } from './types'

export default Vue.extend({
  components: {
    DownloadIcon,
    FileIcon,
  },
  props: {
    data: {
      type: Object as PropType<FileData> | undefined,
      default: () => {},
    },
  },
  computed: {
    filesize() {
      return filesize(this.$props.data.size)
    },
  },
})
</script>
<style lang="less" scoped src="./File.less"></style>
