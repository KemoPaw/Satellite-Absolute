<template>
  <div class="message-loader">
    <div v-for="i in count" :key="i" class="message-loader-item">
      <div class="left">
        <div class="placeholder-profile"></div>
      </div>
      <div class="right">
        <div class="placeholder-item shortest"></div>
        <div class="placeholder-item"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    count: {
      type: Number,
      default: 1,
    },
  },
})
</script>
<style scoped lang="less">
.message-loader {
  &.spacing {
    padding: @light-spacing;
    .placeholder-profile {
      margin-right: 0.75rem;
    }
    .placeholder-item {
      margin-bottom: 0.6rem;
    }
  }
  .message-loader-item {
    width: 100%;
    display: flex;
    padding: 0.4rem 0.35rem;
  }

  .placeholder-profile {
    position: relative;
    overflow: hidden;
    width: 35px;
    height: 35px;
    border-radius: 100%;
    background: @semitransparent-light-gradient;
    margin-left: 0;

    &::before {
      content: '';
      display: block;
      position: absolute;
      left: -150px;
      top: 0;
      height: 100%;
      width: 100%;
      background: linear-gradient(
        to right,
        transparent 0%,
        @semitransparent-dark-gradient 50%,
        transparent 100%
      );
      animation: loadreverse 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
  }
  .right {
    width: 100%;
  }
  .placeholder-item {
    border-radius: 2px;
    height: 24px;
    position: relative;
    overflow: hidden;
    background: @semitransparent-light-gradient;
    margin-left: 0.5rem;
    margin-bottom: 0.3rem;

    &.shortest {
      height: 15px;
      width: 70%;
    }

    &::before {
      content: '';
      display: block;
      position: absolute;
      left: -150px;
      top: 0;
      height: 100%;
      width: 75%;
      background: linear-gradient(
        to right,
        transparent 0%,
        @semitransparent-dark-gradient 50%,
        transparent 100%
      );
      animation: load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
  }
  @keyframes load {
    from {
      left: -75%;
    }
    to {
      left: 100%;
    }
  }
  @keyframes loadreverse {
    from {
      left: -100%;
    }
    to {
      left: 200%;
    }
  }
}
</style>
