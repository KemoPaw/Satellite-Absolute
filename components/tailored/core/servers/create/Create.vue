<template src="./Create.html"></template>

<script>
import Vue from 'vue'
import ImageCropper from '~/components/tailored/core/imageCropper/ImageCropper.vue'

export default Vue.extend({
  name: 'CreateServer',
  components: {
    ImageCropper,
  },
  data() {
    return {
      showCropper: false,
      creating: '',
      croppedImage: '',
      imageUrl: '',
      name: '',
      error: '',
      friends: [],
    }
  },
  watch: {
    friends(newFriends) {
      console.log(newFriends)
    },
  },
  methods: {
    /**
     * @method toggleCropper DocsTODO
     * @description
     * @example
     */
    toggleCropper() {
      this.showCropper = !this.showCropper
    },
    /**
     * @method selectImage DocsTODO
     * @description
     * @param e
     * @example
     */
    selectImage(e) {
      if (e.target.value !== null) {
        const files = e.target.files || e.dataTransfer.files
        if (!files.length) return

        const reader = new FileReader()
        reader.onload = (e) => {
          this.imageUrl = e.target.result
          e.target.value = ''

          this.toggleCropper()
        }

        reader.readAsDataURL(files[0])
      }
    },
    /**
     * @method setCroppedImage DocsTODO
     * @description
     * @param image
     * @example
     */
    setCroppedImage(image) {
      this.croppedImage = image
      this.$refs.file.value = null
    },
    /**
     * @method confirm DocsTODO
     * @description
     * @returns
     * @example
     */
    confirm() {
      if (this.name < 5) {
        this.error = 'Server name must be at least 5 characters.'
        return false
      }
      this.error = false
      return true
    },
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" src="./Create.less"></style>
