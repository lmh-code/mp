<template>
  <div @click="clickHandle">
    <div @click="goAddress('/pages/counter/main')">跳转到vuex页面</div>

    <a href="../counter/main" class="counter">跳转到计数器页面</a>
    <div @click="bindViewTap('/pages/My/main')">切换到启动日志</div>
  </div>
</template>

<script>
  import card from '@/components/card'

  export default {
    data() {
      return {}
    },

    created() {

    },

    components: {
      card
    },

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
        mpvue.navigateTo({
          url: _url
        })
      },

      clickHandle(ev) {
        console.log('clickHandle:', ev)
      }
    },

    created() {}
  }

</script>

<style scoped>

</style>
