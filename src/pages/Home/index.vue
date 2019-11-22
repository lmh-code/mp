<template>
  <div class="main-container">
    <div class="store-options-wrap">
      <div class="shelve-item-wrap" @click="goAddress('/pages/ShelvesMgt/main')">
        <div class="shelve-icon-wrap">
          <image class="shelve-icon" src="/static/images/store-recieve-logo.png" mode="widthFix" lazy-load="false"></image>
        </div>
        <div class="shelve-title">货架商品维护</div>
      </div>
    </div>
    <!-- <div @click="goAddress('/pages/counter/main')">跳转到vuex页面</div>
    <hr>
    <div @click="goAddress('/pages/Login/main')">跳转到登录页面</div>
    <hr>
    <a href="../counter/main" class="counter">跳转到计数器页面</a>
    <div @click="bindViewTap('/pages/My/main')">切换到启动日志</div> -->

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
      let hasLogin = loginInfo && loginInfo.access_token
      let hasSelectStore = loginInfo && loginInfo.StoreNo
      if (!hasLogin) {
        mpvue.redirectTo({
          url: '/pages/Login/main'
        })
      }
      if (!hasSelectStore) {
        mpvue.redirectTo({
          url: '/pages/StorePicker/main'
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
<style scoped>
  .main-container {
    background-color: #f2f2f2;
    height: 100vh;
  }
  .store-options-wrap {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx 48rpx;
    box-sizing: border-box;
  }
  .shelve-item-wrap {
    width: 204rpx;
    height: 204rpx;
    margin-top: 20rpx;
    background-color: #fff;
    border-radius: 8px;
    margin-left: 20rpx;
  }
  .shelve-item-wrap:nth-child(3n+1) {
    margin-left: 0rpx;
  }
  .shelve-icon-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 34rpx;
    margin-bottom: 10rpx;
  }
  .shelve-icon {
    width: 100rpx;
    height: 100rpx;
  }
  .shelve-title {
    width: 100%;
    font-size: 24rpx;
    color: #868686;
    text-align: center;
    line-height: 34rpx;
  }

</style>