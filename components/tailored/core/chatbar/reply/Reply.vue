<template src="./Reply.html"></template>
<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import VueMarkdown from 'vue-markdown'

import { XIcon } from 'satellite-lucide-icons'

export default Vue.extend({
  components: {
    VueMarkdown,
    XIcon,
  },
  computed: {
    ...mapState(['ui']),
  },
  methods: {
    /**
     * @method setReplyChatbarContent
     * @description Adds message reply by commiting chatbar content to setReplyChatbarContent in state
     * @example @click="setReplyChatbarContent"
     */
    setReplyChatbarContent() {
      this.$store.commit('ui/setReplyChatbarContent', {
        id: '',
        payload: '',
        from: '',
      })
    },
  },
})
</script>
<style lang="less" src="./Reply.less"></style>
