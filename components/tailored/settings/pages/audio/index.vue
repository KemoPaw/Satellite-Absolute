<template src="./Audio.html"></template>

<script lang="ts">
import Vue from 'vue'

import { mapState } from 'vuex'
import { Bitrates, SampleSizes } from './options/audioOptions'
import {
  PermissionRequestOptions,
  UserPermissions,
} from '~/components/mixins/UserPermissions'
import { CaptureMouseTypes } from '~/store/settings/types'

declare module 'vue/types/vue' {
  // 3. Declare augmentation for Vue
  interface Vue {
    settings: any
    setupDefaults: () => void
    getUserPermissions: () => Promise<any>
    requestUserPermissions: (key: PermissionRequestOptions) => Promise<any>
    getMicLevel: (stream: MediaStream) => void
    setupMicMeter: (stream: MediaStream) => void
    hasConstraint: (prop: string) => Boolean
    setConstraint: (prop: string, value: any) => void
  }
}
export default Vue.extend({
  name: 'AudioSettings',
  layout: 'settings',
  data() {
    return {
      Bitrates,
      SampleSizes,
      hasMicrophone: false,
      audioInputs: [],
      audioOutputs: [],
      hasWebcam: false,
      videoInputs: [],
      userHasGivenAudioAccess: false,
      userDeniedAudioAccess: false,
      userHasGivenVideoAccess: false,
      userDeniedVideoAccess: false,
      browserAllowsAudioOut: true,
      micLevel: 0,
      stream: null,
      updateInterval: null,
      captureMouses: [
        {
          value: CaptureMouseTypes.always,
          text: this.$i18n.t('global.always'),
        },
        {
          value: CaptureMouseTypes.motion,
          text: this.$i18n.t('global.motion'),
        },
        {
          value: CaptureMouseTypes.never,
          text: this.$i18n.t('global.never'),
        },
      ],
    }
  },
  computed: {
    ...mapState(['settings', 'audio']),
    // React to v-model changes to echoCancellation and update
    // the state accordingly with the mutation
    isEchoCancellation: {
      set(state) {
        this.$store.commit('settings/echoCancellation', state)
        this.setConstraint('echoCancellation', state)
      },
      get() {
        return this.settings.echoCancellation
      },
    },
    isNoiseSuppression: {
      set(state) {
        this.$store.commit('settings/noiseSuppression', state)
        this.setConstraint('noiseSuppression', state)
      },
      get() {
        return this.settings.noiseSuppression
      },
    },
    isBitrate: {
      set(state) {
        this.$store.commit('settings/bitrate', state)
        this.setConstraint('sampleRate', state)
      },
      get() {
        return this.settings.bitrate
      },
    },
    isSampleSize: {
      set(state) {
        this.$store.commit('settings/sampleSize', state)
        this.setConstraint('sampleSize', state)
      },
      get() {
        return this.settings.sampleSize
      },
    },
    isAudioInput: {
      set(state) {
        this.$store.commit('settings/audioInput', state)
      },
      get() {
        return this.settings.audioInput
      },
    },
    isAudioOutput: {
      set(state) {
        this.$store.commit('settings/audioOutput', state)
        this.setConstraint('volume', state)
      },
      get() {
        return this.settings.audioOutput
      },
    },
    isVideoInput: {
      set(state) {
        this.$store.commit('settings/videoInput', state)
      },
      get() {
        return this.settings.videoInput
      },
    },
    isCaptureMouse: {
      set(state) {
        this.$store.commit('settings/captureMouse', state)
      },
      get() {
        return this.settings.captureMouse
      },
    },
  },
  watch: {
    async '$store.state.settings.audioInput'(newValue, oldValue) {
      // If there is an oldValue in the persisted state
      if (oldValue !== '') {
        // Close old MediaStream
        if (this.$data.stream) {
          this.$data.stream
            .getAudioTracks()
            .forEach(function (track: MediaStreamTrack) {
              track.stop()
            })
        }

        // Open new MediaStream
        const stream = await this.requestUserPermissions({
          audio: { deviceId: newValue },
        })
        this.setupMicMeter(stream)
      }
    },
  },
  mounted() {
    // Check for new input sources
    this.setupDefaults()
    this.$data.updateInterval = setInterval(this.setupDefaults, 1000)
  },
  beforeDestroy() {
    if (this.$data.stream) {
      this.$data.stream
        .getAudioTracks()
        .forEach(function (track: MediaStreamTrack) {
          track.stop()
        })
    }
    clearInterval(this.$data.updateInterval)
  },
  methods: {
    ...UserPermissions.methods,
    /**
     * @method getMicLevel DocsTODO
     * @description
     * @param stream
     * @example
     */
    getMicLevel(stream: MediaStream) {
      const audioContext = new AudioContext()
      const gainNode = audioContext.createGain()
      const analyser = audioContext.createAnalyser()
      const microphone = audioContext.createMediaStreamSource(stream)
      const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1)

      analyser.smoothingTimeConstant = 0

      microphone.connect(gainNode)
      gainNode.connect(analyser)
      analyser.connect(javascriptNode)
      javascriptNode.connect(audioContext.destination)

      const array = new Uint8Array(analyser.frequencyBinCount)

      const draw = () => {
        // Update gain based on inputVolume
        gainNode.gain.setValueAtTime(
          this.audio.inputVolume / 100,
          audioContext.currentTime
        )
        requestAnimationFrame(draw)

        analyser.getByteFrequencyData(array)
        let values = 0

        const length = array.length
        for (let i = 0; i < length; i++) {
          values += array[i]
        }

        const average = values / length

        // The micLevel can range between 0 and 100 approximately
        this.$data.micLevel = Math.round(average)
      }

      draw()
    },
    /**
     * @method setupMicMeter DocsTODO
     * @description
     * @param stream
     * @example
     */
    setupMicMeter(stream: MediaStream) {
      this.$data.stream = stream
      this.getMicLevel(stream)
    },
    /**
     * @method setupDefaults DocsTODO
     * @description
     * @example
     */
    async setupDefaults() {
      const permissionsObject: any = await this.getUserPermissions()

      // Toggles the show/hide on the button to request permissions
      this.$data.userHasGivenAudioAccess =
        permissionsObject.permissions.microphone
      if (permissionsObject.permissions.microphone) {
        this.$data.userDeniedAudioAccess = false
      }
      this.$data.userHasGivenVideoAccess = permissionsObject.permissions.webcam
      if (permissionsObject.permissions.webcam) {
        this.$data.userDeniedVideoAccess = false
      }
      this.$data.hasMicrophone = permissionsObject.hasMicrophone
      this.$data.hasWebcam = permissionsObject.hasWebcam

      if (permissionsObject.permissions.microphone) {
        // Get the arrays of devices formtted in the name/value format the select tool wants
        this.$data.audioInputs = permissionsObject.devices.audioIn
        this.$data.audioOutputs = permissionsObject.devices.audioOut

        // Setting defaults on mount if one isn't already present in local storage
        if (!this.settings.audioInput) {
          this.isAudioInput = permissionsObject.devices.audioIn[0].value // chrome, ffx, and safari all support the audioIn object
        }
        if (!this.settings.audioOutput) {
          this.isAudioOutput = permissionsObject.devices.audioOut[0].value
        }

        if (!this.$data.stream) {
          const stream = await this.requestUserPermissions({
            audio: { deviceId: this.settings.audioInput },
          })
          this.setupMicMeter(stream)
        }
      }

      if (permissionsObject.permissions.webcam) {
        this.$data.videoInputs = permissionsObject.devices.videoIn
        this.$data.userHasGivenVideoAccess =
          permissionsObject.permissions.webcam
        if (!this.settings.videoInput) {
          this.isVideoInput = permissionsObject.devices.videoIn[0].value
        }
      }

      if (permissionsObject.browser !== 'Chrome') {
        this.$data.browserAllowsAudioOut = false
      } else if (!this.settings.audioOutput) {
        this.isAudioOutput = permissionsObject.devices.audioOut[0]?.value || ''
      }
    },
    /**
     * @method enableAudio DocsTODO
     * @description
     * @example
     */
    async enableAudio() {
      // Check to see if the user has permission
      try {
        const stream = await this.requestUserPermissions({ audio: true })
        this.setupMicMeter(stream)
        this.$data.userHasGivenAudioAccess = true
        this.setupDefaults()
      } catch (_: any) {
        // Error is returned if user selects Block/Deny
        this.$data.userDeniedAudioAccess = true
      }
    },
    /**
     * @method enableAudio DocsTODO
     * @description
     * @example
     */
    async enableVideo() {
      // Check to see if the user has permission
      try {
        await this.requestUserPermissions({ video: true })
        this.$data.userHasGivenVideoAccess = true
        this.setupDefaults()
      } catch (_: any) {
        // Error is returned if user selects Block/Deny
        this.$data.userDeniedVideoAccess = true
      }
    },
    /**
     * @method volumeControlValueChange DocsTODO
     * @description
     * @param volume
     * @example
     */
    volumeControlValueChange(volume: number) {
      this.$Sounds.changeLevels(volume / 100)
      this.$store.commit('settings/setVolume', volume)
    },
    /**
     * @method inputVolumeControlValueChange DocsTODO
     * @description
     * @param volume
     * @example
     */
    inputVolumeControlValueChange(volume: number) {
      this.$store.commit('settings/setInputVolume', volume)
    },
    /**
     * @method hasConstraint DocsTODO
     * @description
     * @param prop
     * @returns
     * @example
     */
    hasConstraint(prop: keyof MediaTrackConstraintSet): Boolean {
      const supports = navigator.mediaDevices.getSupportedConstraints()
      return Boolean(supports[prop])
    },
    /**
     * @method setContraint DocsTODO
     * @description
     * @param prop
     * @param value
     * @returns
     * @example
     */
    setConstraint(prop: keyof MediaTrackConstraintSet, value: any) {
      // hasConstraint is true only if the prop is supported by the browser
      if (!this.hasConstraint(prop)) {
        return
      }
      if (this.$data.userHasGivenAudioAccess && this.$data.stream) {
        this.$data.stream
          .getAudioTracks()
          .forEach(function (track: MediaStreamTrack) {
            const constraints = track.getConstraints()
            constraints[prop] = value
            track.applyConstraints(constraints)
          })
      }
    },
  },
})
</script>

<style lang="less" scoped src="./Audio.less"></style>
