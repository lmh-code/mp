const set = (_key, _val) => {
  wx.setStorageSync(_key, _val)
}

const get = (_key) => {
  return wx.getStorageSync(_key)
}

const remove = (_key) => {
  wx.removeStorageSync(_key)
}

const clear = () => {
  wx.clearStorageSync()
}

export default {
  set,
  get,
  remove,
  clear
}
