<template src="./Item.html"></template>
<script lang="ts">
// eslint-disable-next-line import/named
import Vue, { PropType } from 'vue'
import { Glyph } from '~/types/ui/glyph'

export default Vue.extend({
  props: {
    width: {
      type: Number,
      default: 28,
      required: false,
    },
    height: {
      type: Number,
      default: 28,
      required: false,
    },
    src: {
      type: String,
      default: '',
    },
    pack: {
      type: Object as PropType<Glyph>,
      default: null,
      required: false,
    },
  },
  methods: {
    getStyle() {
      return {
        'background-image': `url(${this.src})`,
        width: `${this.width}px`,
        height: `${this.height}px`,
      }
    },
    mouseOver() {
      /* Set hovered glyph info only pack property exist */
      if (this.pack) {
        this.$store.commit('ui/setHoveredGlyphInfo', {
          glyphSrc: this.src,
          pack: this.pack,
        })
      }
    },
    mouseLeave() {
      if (this.pack) {
        this.$store.commit('ui/setHoveredGlyphInfo', undefined)
      }
    },
  },
})
</script>
<style scoped lang="less" src="./Item.less"></style>
