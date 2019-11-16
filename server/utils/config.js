let productType = 1
let basicUrl = ""
let oldBasicUrl = ""
if (productType === 1) {
  oldBasicUrl = `http://192.168.60.47:4444`
  basicUrl = `http://192.168.60.155:9009`
} else if (productType === 2) {
  oldBasicUrl = `https://retailapi-pre.benlai.com`
  basicUrl = `https://api-blx-pre.benlai.com`
} else {
  oldBasicUrl = `https://retailapi.benlai.com`
  basicUrl = `https://api-blx.benlai.com`
}


const loginUrl = {
  getVerificationImage: `${basicUrl}/basal/adminUser/getVerificationImage`, // 获取验证码
  token: `${basicUrl}/authorization/login` // 登录
}

const storePickerUrl = {
  storeList: `${basicUrl}/foundation/store/userCityStoreTreeList`
}

module.exports = {
  oldBasicUrl: oldBasicUrl,
  basicUrl: basicUrl,
  loginUrl: loginUrl,
  storePickerUrl: storePickerUrl
}
