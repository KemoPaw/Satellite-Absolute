<template>
  <p class="version">
    <span v-if="name">
      {{ $config.clientName }}
    </span>
    <span v-if="name && version">&nbsp;</span>
    <span v-if="version">
      {{ $config.clientVersion }}
    </span>
  </p>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    name: Boolean,
    version: Boolean,
  },
})
</script>
<style scoped lang="less">
.version {
  display: inline-flex;
}
</style>
