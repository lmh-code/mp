<template>
  <div>
    <div class="header-wrap">
      <div class="store-wrap mt30">
        {{userName}}
      </div>
      <div class="store-wrap mt10">
        <span @click="goStorePicker">{{storeNo}}-{{storeName}}</span>
      </div>
    </div>
    <div @click="loginOutHandel">
      退出登录
    </div>
  </div>
</template>

<script>
  import localStorage from '@/utils/localStorage'
  import utils from '@/utils/utils'
  export default {
    data() {
      return {
        userName: localStorage.get("loginInfo").UserName || '',
        storeNo: localStorage.get("loginInfo").StoreNo || '',
        storeName: localStorage.get("loginInfo").StoreName || ''
      }
    },

    onShow() {
      this.resetStates()
    },

    methods: {
      resetStates() {
        let loginInfo = localStorage.get("loginInfo")
        this.userName = loginInfo.UserName || ''
        this.storeNo = loginInfo.StoreNo || ''
        this.storeName = loginInfo.StoreName || ''
      },
      goStorePicker() {
        mpvue.navigateTo({
          url: '/pages/StorePicker/main'
        })
      },
      loginOutHandel() {
        utils.loginOut()
      }
    }
  }

</script>

<style scoped>
  .header-wrap {
    width: 100%;
    height: 200rpx;
    background-color: #e35213;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .store-wrap {
    font-size: 36rpx;
    color: #ffffff;
  }

  .mt30 {
    margin-top: 40rpx;
  }

  .mt10 {
    margin-top: 10rpx;
  }

</style>
