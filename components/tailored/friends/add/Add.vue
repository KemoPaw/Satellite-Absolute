<template src="./Add.html"></template>
<script lang="ts">
// @ts-ignore
import { PublicKey } from '@solana/web3.js'
// @ts-ignore
import QrcodeVue from 'qrcode.vue'

import { UserPlusIcon } from 'satellite-lucide-icons'

import Vue from 'vue'
import ServerProgram from '~/libraries/Solana/ServerProgram/ServerProgram'
import { Friend } from '~/types/ui/friends'

import SolanaManager from '~/libraries/Solana/SolanaManager/SolanaManager'

export default Vue.extend({
  components: {
    QrcodeVue,
    UserPlusIcon,
  },
  data() {
    return {
      value: 'https://example.com',
      size: 150,
      error: '',
      accountID: '',
      searching: false,
      friend: null as Friend | null,
    }
  },
  methods: {
    async searchFriend() {
      this.friend = null
      this.searching = true
      const accountID = this.accountID.trim()
      if (accountID === this.$store.state.accounts.active) {
        this.error = this.$t('friends.self_add') as string
        return
      }
      if (
        this.$store.state.friends.all.filter(
          (f: Friend) => f.account.accountId === accountID
        ).length === 1
      ) {
        this.error = this.$t('friends.already_friend') as string
        return
      }
      this.error = ''
      try {
        const $SolanaManager: SolanaManager = Vue.prototype.$SolanaManager
        const serverProgram: ServerProgram = new ServerProgram($SolanaManager)

        const friend = await serverProgram.getUser(new PublicKey(accountID))
        if (!friend) {
          this.error = this.$t('friends.not_found') as string
          return
        }
        this.friend = {
          ...friend,
          state: 'offline',
          // @ts-ignore
          // TODO: fix
          account: {
            accountId: this.accountID,
          },
        }
      } catch (error) {
        this.error = this.$t('friends.invalid_id') as string
      }

      this.searching = false
    },
    onFriendRequestSent(error: string) {
      this.friend = null
      if (!error) {
        // @ts-ignore
        this.$toast.show(this.$t('friends.request_sent'))
      } else {
        this.error = error
      }
    },
  },
})
</script>
<style scoped lang="less" src="./Add.less"></style>
