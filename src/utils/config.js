/**
 * 1: 测试环境
 * 2：预发布环境
 * 3：生产环境
 */
let productType = 1

let basicUrl = ""
let oldBasicUrl = ""
const version = '1.0.0'
const AuthorizationBasic = 'Basic d2ViOmQ4YmZjMzQwMWE3NTg5ZTc4NGIwNmJkZmdhMmFkMWM0ZQ=='
if (productType === 1) {
  oldBasicUrl = `http://192.168.60.47:4444`
  basicUrl = `http://localhost:3069`
  basicUrl = `https://api-blx-test.benlai.com`
} else if (productType === 2) {
  oldBasicUrl = `https://retailapi-pre.benlai.com`
  basicUrl = `https://api-blx-pre.benlai.com`
} else {
  oldBasicUrl = `https://retailapi.benlai.com`
  basicUrl = `https://api-blx.benlai.com`
}

const oldLoginUrl = {
  getVerificationImage: `${oldBasicUrl}/basal/adminUser/getVerificationImage`, // 获取验证码
  token: `${oldBasicUrl}/authorization/login` // 登录
}

const loginUrl = {
  getVerificationImage: `${basicUrl}/basal/adminUser/getVerificationImage`, // 获取验证码
  token: `${basicUrl}/authorization/login` // 登录
}

export default {
  version,
  basicUrl,
  oldBasicUrl,
  loginUrl,
  oldLoginUrl,
  AuthorizationBasic
}
