import config from './config'
import UUID from 'uuid/v4'
import utils from './utils'
var _URL = config.oldLoginUrl
var newUrl = config.loginUrl

var AuthorizationBasic = 'Basic d2ViOmQ4YmZjMzQwMWE3NTg5ZTc4NGIwNmJkZmdhMmFkMWM0ZQ=='

// 当前请求地址，防止短时间内重复请求
var requstMap = {}

function Request (options) {
  if (options.showLoading) {
    wx.showLoading()
  }

  var url = options.url
  if (!url) throw new Error('request url is not defined')

  var data = options.data || {}
  var method = options.method || 'GET'
  method = method.toUpperCase()

  var dataType = options.dataType || 'json'

  var header = options.header || {}
  var loginInfo = wx.getStorageSync('loginInfo')
  var Authorization
  if (header['Authorization']) {
    Authorization = header['Authorization']
  } else if (loginInfo && loginInfo.token_type && loginInfo.access_token) {
    let javaApiList = ['srm', 'foundation', 'product', 'newretail-order', 'basal', 'member', 'report', 'intelligence', 'newretail-receipt-server', 'indent', 'wechat', 'newretail-shop']
    let token = javaApiList.indexOf(url.split('/')[3].toString().trim()) === -1 ? loginInfo.net_token : loginInfo.access_token
    Authorization = loginInfo.token_type + ' ' + token
  }

  if (Authorization) {
    header['Authorization'] = Authorization
  }

  if (loginInfo.StoreSysNo && loginInfo.StoreNo) {
    header['X-Store'] = JSON.stringify({storeSysNo: loginInfo.StoreSysNo, storeNo: loginInfo.StoreNo})
  }

  var contentType = options.contentType || 'application/x-www-form-urlencoded;charset=utf-8'
  header['Content-Type'] = header['Content-Type'] || contentType
  header['version'] = config.version
  header['source'] = 4
  var uuid = wx.getStorageSync('uuid')
  if (!uuid) {
    uuid = UUID()
    wx.setStorageSync('uuid', uuid)
  }
  header['uuid'] = uuid

  var optionsString = JSON.stringify(options)
  if (requstMap[optionsString]) {
    // 防止短时间内重复请求
    return
  }
  requstMap[optionsString] = true

  var responseType = options.responseType
  wx.request({
    url: url,
    data: data,
    header: header,
    method: method,
    dataType: dataType,
    responseType: responseType,
    success: function (result) {
      options.showLoading && wx.hideLoading()
      var res = result.data
      var statusCode = result.statusCode
      // 200OK
      // 400服务器返回自定义错误, 具体服务端错误信息见内部错误码文档
      // 401未授权
      // 403服务器拒绝请求
      // 404Not Found
      // 500服务器内部错误
      if (statusCode === 400) {
        utils.toast(res.error_description)
        options.fail && options.fail(res)
        return
      }

      if (statusCode === 401) {
        // 需要登录
        if (data.grant_type === 'password') {
          wx.showToast({
            title: res.error_description,
            icon: 'none'
          })
        } else {
          wx.redirectTo({
            url: '/page/login/login'
          })
        }
        return
      }

      if (statusCode === 404) {
        utils.toast('请求资源不存在！', 'noicon')
        return
      }

      if (res.code !== 0 && res.code !== 1 && res.code) {
        utils.toast(res.msg, "noicon", 5000)
        options.fail && options.fail(res)
        return
      }

      if (statusCode === 500) {
        utils.toast('抱歉，服务器出错了。', 'noicon')
        return
      }
      if (res.code === 500) {
        utils.toast('抱歉，服务器出错了。', 'noicon')
        return
      }
      if (statusCode === 200) {
        options.success && options.success(res)
      } else {
        utils.toast('抱歉，服务器出错了。Code：' + statusCode, 'noicon')
      }
    },
    fail: function (err) {
      // 因为小程序的toast和loading用的是同一个控件，hideLoading可能会关闭success和fail回调中的toast，所以不能在complete回调中使用hideLoading
      // update: iOS真机调试，如果在request前使用wx.showLoading，在回调中使用原生wx.hideLoading，回调中的toast会弹不出来
      options.showLoading && wx.hideLoading()
      options.fail && options.fail(err)
    },
    complete: function () {
      delete requstMap[optionsString]
      options.complete && options.complete()
    }
  })
}

function WxLogin (success, fail) {
  console.log('login')
  wx.authorize({
    scope: 'scope.userInfo',
    success: function () {
      wx.login({
        success: function (loginRes) {
          var code = loginRes.code
          wx.getUserInfo({
            withCredentials: true,
            success: function (data) {
              wx.setStorageSync('userInfo', data.userInfo)
              RequestLogin(code, data.encryptedData, data.iv, success, fail)
            }
          })
        },
        fail: function () {
          fail && fail(...arguments)
        }
      })
    },
    fail: function () {
      fail && fail(...arguments)
      var canGetUserInfoByButton = wx.canIUse('button.open-type.getUserInfo')
      if (canGetUserInfoByButton) {
        return
      }
      wx.navigateTo({
        url: '/page/unauthorized/unauthorized'
      })
    }
  })
}

function RequestLogin (code, encryptedData, iv, success, fail) {
  console.log('request')
  post({
    url: _URL.token,
    data: {
      grant_type: 'wx_miniprogram',
      code: code,
      encryptedData: encryptedData,
      iv: iv,
      systemInfo: JSON.stringify(wx.getSystemInfoSync())
    },
    success: function (res) {
      if (res.token_type && res.access_token && res.refresh_token) {
        // 登录成功
        wx.setStorageSync('loginInfo', {
          token_type: res.token_type,
          access_token: res.access_token,
          refresh_token: res.refresh_token
        })
        success && success(res)
      } else {
        fail && fail(res)
      }
    },
    fail: function () {
      fail && fail(arguments)
    }
  })
}

function RefreshToken () {
  var loginInfo = wx.getStorageSync('loginInfo')
  if (loginInfo && loginInfo.refresh_token) {
    post({
      url: newUrl.token,
      data: {
        grant_type: 'refresh_token',
        refresh_token: loginInfo.refresh_token
      },
      header: {
        Authorization: AuthorizationBasic
      },
      success: function (res) {
        if (res.token_type && res.access_token && res.refresh_token) {
          // 刷新成功
          loginInfo.token_type = res['token_type']
          loginInfo.access_token = res['access_token']
          loginInfo.refresh_token = res['refresh_token']
          loginInfo.net_token = res['net_token']
          loginInfo.issued = res['iss']
          loginInfo.expires = res['user:expires']
          wx.setStorageSync('loginInfo', loginInfo)
        }
      }
    })
  }
}

function get (options) {
  options = options || {}
  options.method = 'GET'
  Request(options)
}

function post (options) {
  options = options || {}
  options.method = 'POST'
  Request(options)
}

export default {
  Request: Request,
  get: get,
  post: post,
  AuthorizationBasic: AuthorizationBasic,
  RefreshToken: RefreshToken
}
