<template>
  <div id="bottom-bar-container">
    <UiTypingIndicator v-if="ui.isTyping" :user-name="ui.isTyping.name"/>
    <span :class="`charlimit ${charlimit ? 'is-error' : 'is-normal'}`"
      >{{ `${text.length}/${maxChars}` }}</span
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  props: {
    text: {
      type: String,
      default: '',
    },
    charlimit: {
      type: Boolean,
    }
  },
  data() {
    return {
      maxChars: 256,
    }
  },
  computed: {
    ...mapState(['ui']),
  },
})
</script>

<style lang="less">
  #bottom-bar-container {
    display: flex;
    justify-content: space-between;
    // height: 1.5rem;
    align-items: center;
    padding: 5px 0px 5px 20px;

    .charlimit {
      float: right;
      margin-right: 2rem;
      font-size: @mini-text-size;
      color: @text-muted;
      margin-left: auto;
      &.is-error {
        color: @red;
      }
    }
    &.is-error {
      border: 1px solid @red;

      .control-icon {
        &:nth-child(4) {
          color: @red;
        }
      }
    }
  }
</style>
