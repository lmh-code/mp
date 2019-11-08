<template>
  <div @click="clickHandle">
    <div @click="goAddress('/pages/counter/main')">跳转到vuex页面</div>
    <hr>
    <div @click="goAddress('/pages/Login/main')">跳转到登录页面</div>
    <hr>
    <a href="../counter/main" class="counter">跳转到计数器页面</a>
    <div @click="bindViewTap('/pages/My/main')">切换到启动日志</div>
  </div>
</template>

<script>
  import localStorage from '@/utils/localStorage'
  export default {
    data() {
      return {}
    },

    onShow() {
      // 检查用户是否已经登录
      let loginInfo = localStorage.get('loginInfo')
      if (!loginInfo) {
        mpvue.redirectTo({
          url: '/pages/Login/main'
        })
      }
    },

    created() {

    },

    mounted() {

    },

    components: {},

    methods: {
      bindViewTap(_url) {
        if (mpvuePlatform === 'wx') {
          mpvue.switchTab({
            url: _url
          })
        } else {
          mpvue.navigateTo({
            url: _url
          })
        }
      },

      goAddress(_url) {
        console.log("_url:", _url)
        mpvue.navigateTo({
          url: _url
        })
      },

      clickHandle(ev) {
        console.log('clickHandle:', ev)
      }
    }
  }

</script>
