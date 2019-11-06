<template>
  <div @click="clickHandle">
    <div @click="goAddress('/pages/counter/main')">跳转到vuex页面</div>

    <a href="../counter/main" class="counter"></a>
    <div @click="bindViewTap('/pages/logs/main')">切换到启动日志</div>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      }
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap (_url) {
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url: _url })
      } else {
        mpvue.navigateTo({ url: _url })
      }
    },

    goAddress (_url) {
      mpvue.navigateTo({url: _url})
    },

    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>

</style>
