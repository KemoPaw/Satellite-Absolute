<template src="./Reply.html"></template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import VueMarkdown from 'vue-markdown'

import { PlusSquareIcon, MinusSquareIcon } from 'satellite-lucide-icons'

import { Message, Group } from '~/types/messaging'
import { getUsernameFromState } from '~/utilities/Messaging'

export default Vue.extend({
  components: {
    VueMarkdown,
    PlusSquareIcon,
    MinusSquareIcon,
  },
  props: {
    message: {
      type: Object as PropType<Message>,
      default: () => ({
        id: '0',
        at: 1620515543000,
        type: 'text',
        payload: 'Invalid Message',
      }),
    },
    group: {
      type: Object as PropType<Group>,
      default: () => {},
    },
    from: {
      type: String,
      default: '',
    },
  },
  data() {
    return { showReplies: false, replyHover: '' }
  },
  computed: {
    /**
     * makeReplyText: generates the "Replies from _____" text in a chat
     * depending on the number of users in the reply thread, it will generate a different replyText
     */
    makeReplyText() {
      const replyLength = Object.keys(this.$props.message.replies).length
      let baseReply = replyLength > 1 ? 'Replies from ' : 'Reply from '

      const getNamesList = (
        replies: any[],
        limit = 2,
        initialText = '',
        separator = ' and '
      ) =>
        replies
          .slice(0, limit)
          .reduce(
            (text, reply, i) =>
              text +
              (i > 0 && i < limit ? separator : '') +
              getUsernameFromState(reply.from, this.$store.state),
            initialText
          )

      const names = getNamesList(this.$props.message.replies, 2, baseReply)

      return replyLength > 2
        ? `${names} and ${replyLength - 2} more ...`
        : names
    },
  },
  methods: {
    getUsernameFromReply(reply: any) {
      return getUsernameFromState(reply.from, this.$store.state)
    },
    /**
     * @method mouseOver DocsTODO
     * @description
     * @param replyId
     * @example
     */
    mouseOver(replyId: string) {
      this.$data.replyHover = replyId
    },
    /**
     * @method emojiReaction DocsTODO
     * @description
     * @param replyId
     * @example
     */
    emojiReaction(replyID: string) {
      const myTextilePublicKey = this.$TextileManager.getIdentityPublicKey()
      this.$store.commit('ui/settingReaction', {
        status: true,
        groupID: this.$props.group.id,
        messageID: replyID,
        to:
          this.$props.message.to === myTextilePublicKey
            ? this.$props.message.from
            : this.$props.message.to,
      })
      this.$store.commit('ui/toggleEnhancers', { show: true })
    },
    /**
     * @method showQuickProfile DocsTODO
     * @description
     * @param e
     * @example
     */
    showQuickProfile(e: Event) {
      this.$store.commit('ui/setQuickProfilePosition', e)
      this.$store.commit('ui/quickProfile', true)
    },
    /**
     * @method toggleReplies DocsTODO
     * @description
     * @example
     */
    toggleReplies() {
      this.$data.showReplies = !this.$data.showReplies
    },
  },
})
</script>
<style lang="less" src="./Reply.less"></style>
