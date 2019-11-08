<template>
  <div>
    <image class="header-bg" src="/static/images/login_header_bg.png" mode="widthFix" lazy-load="false"></image>
    
    <div class="login-wrap">
      <div class="login-input-wrap">
        <image class="input-icon" src="/static/images/icon_username.png" mode="widthFix" lazy-load="false"></image>
        <input class="login-input" placeholder="请输入用户名" v-model="userName"/>
      </div>
      <div class="login-input-wrap">
        <image class="input-icon" src="/static/images/icon_password.png" mode="widthFix" lazy-load="false"></image>
        <input class="login-input" placeholder="请输入密码" v-model="password"/>
      </div>
      <div class="login-btn-wrap" @click="doLoginHandel">
        登录
      </div>
    </div>
  </div>
</template>

<script>
  import request from '@/utils/request'
  import config from '@/utils/config'
  let loginUrl = config.loginUrl
  export default {
    data() {
      return {
        userName: '',
        password: ''
      }
    },
    created() {},
    methods: {
      doLoginHandel() {
        console.log("userName:", this.userName)
        console.log("password:", this.password)
        let _this = this
        this.$http.post({
          showLoading: true,
          url: loginUrl.token,
          data: {
            username: _this.userName,
            password: _this.password,
            grant_type: 'password',
            uuid: wx.getStorageSync('uuid')
          },
          header: {
            Authorization: config.AuthorizationBasic
          },
          success: function(res) {},
          fail: function(e) {}
        })
      }
    }
  }

</script>

<style>
  .header-bg {
    width: 100%;
  }

  .login-wrap {
    padding: 60rpx 30rpx 0;
    box-sizing: border-box;
  }

  .login-input-wrap {
    border-bottom: 1px solid #dddddd;
    height: 88rpx;
    box-sizing: border-box;
    line-height: 44rpx;
    color: #000000;
    background: #ffffff;
    display: flex;
    align-items: center;
  }
  .input-icon {
    width: 32rpx;
    height: 32rpx;
  }
  .login-input {
    font-size: 28rpx;
    padding-left: 20rpx;
  }
  .login-btn-wrap {
    margin-top: 70rpx;
    width: 100%;
    height: 80rpx;
    box-sizing: border-box;
    border-radius: 8rpx;
    font-size: 32rpx;
    line-height: 80rpx;
    color: #fff;
    background: #e35213;
    letter-spacing: 30rpx;
    text-align: center;
  }
</style>
