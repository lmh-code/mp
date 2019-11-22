<template>
  <div>
    <image class="header-bg" src="/static/images/login_header_bg.png" mode="widthFix" lazy-load="false"></image>

    <div class="login-wrap">
      <div class="login-input-wrap">
        <image class="input-icon" src="/static/images/icon_username.png" mode="widthFix" lazy-load="false"></image>
        <input class="login-input" placeholder="请输入用户名" v-model.trim="userName" @keyup.enter="doLoginHandel" />
      </div>
      <div class="login-input-wrap">
        <image class="input-icon" src="/static/images/icon_password.png" mode="widthFix" lazy-load="false"></image>
        <input class="login-input" type="password" placeholder="请输入密码" v-model.trim="password"
          @keyup.enter="doLoginHandel" />
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
  import utils from '@/utils/utils'
  import localStorage from '@/utils/localStorage'
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
        if (!this.userName) {
          utils.toast('请输入用户名', 'none', 1500)
          return
        }
        if (!this.password) {
          utils.toast('请输入密码', 'none', 1500)
          return
        }
        let _this = this
        this.$http.post({
          showLoading: true,
          contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
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
          success: function (res) {
            if (!res['access_token']) return
            let loginInfo = {}
            loginInfo.Operator = res['user:name']
            loginInfo.UserNO = res['user:name']
            loginInfo.UserName = res['user:nickname']
            loginInfo.token_type = res['token_type']
            loginInfo.access_token = res['access_token']
            loginInfo.refresh_token = res['refresh_token']
            loginInfo.issued = res['iss']
            loginInfo.expires = res['user:expires']
            loginInfo.net_token = res.net_token
            loginInfo.IsDC = true
            if (res.selectStore) {
              let selectStore = JSON.parse(res.selectstore)
              loginInfo.StoreName = selectStore['storeName']
              loginInfo.StoreNo = selectStore['storeNo']
            }
            localStorage.set('loginInfo', loginInfo)
            // 未选择站点，需要强制跳转至站点选择页面
            if (!loginInfo.StoreSysNo) {
              mpvue.redirectTo({
                url: '/pages/StorePicker/main'
              })
            } else {
              mpvue.switchTab({
                url: '/pages/Index/main'
              })
            }
          },
          fail: function (e) {}
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
