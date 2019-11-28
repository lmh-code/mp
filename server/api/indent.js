let basicUrl = require('../utils/config').basicUrl
const indentUrl = {
  // 货架列表
  shelvesList: `${basicUrl}/indent/shelf/list`,
  // 货架配置
  inventoryCityConfig: `${basicUrl}/indent/inventory/inventoryCityConfig`,
  // 货架新增
  saveSgelf: `${basicUrl}/indent/shelf/save`,
  // 编辑货架
  setCarryShelfGoods: `${basicUrl}/indent/inventory/setCarryShelfGoods`,
  // 删除货架
  shelfDelete: `${basicUrl}/indent/shelf/delete`,
  // 货架中的商品
  goodsList: `${basicUrl}/indent/shelfGoods/list`,
  // 删除货架中的商品
  goodsDelete: `${basicUrl}/indent/shelfGoods/delete`,
   // 查找添加商品搜索接口
  storeGoodsPageList: `${basicUrl}/indent/basics/storeGoodsPageList`
}
module.exports = {
  indentUrl
}