<template>
  <div id="app-wrap" :class="`${sidebar ? 'is-open' : 'is-collapsed'}`">
    <div
      id="app"
      :class="`${sidebar ? 'is-open' : 'is-collapsed'} ${
        $device.isMobile ? 'mobile-app' : ''
      }`"
      v-touch:swipe="sidebarSwipeHandler(this)"
      v-touch-options="{ swipeTolerance: 75 }"
    >
      <UiGlobal />

      <TailoredCoreSlimbar
        :servers="$mock.servers"
        :unreads="$mock.unreads"
        :openModal="toggleModal"
      />
      <TailoredCoreSidebar
        :toggle="() => ($data.sidebar = !$data.sidebar)"
        :users="friends.all"
        :groups="$mock.groups"
      />
      <div class="dynamic-content">
        <Nuxt id="files" ref="files" />
      </div>
    </div>
    <TailoredCoreMobileNav v-if="$device.isMobile" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

import Layout from '~/components/mixins/Layouts/Layout'
import { mobileSwipe } from '~/components/mixins/Swipe/Swipe'

export default Vue.extend({
  name: 'FilesLayout',
  mixins: [mobileSwipe, Layout],
  middleware: 'authenticated',
  data() {
    return {
      sidebar: true,
    }
  },
  computed: {
    ...mapState(['friends']),
  },
})
</script>

<style lang="less" src="./Layout.less"></style>
