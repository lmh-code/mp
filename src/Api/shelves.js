import config from "@/utils/config"
let basicUrl = config.basicUrl
export default {
  // 货架管理列表
  shelvesList: `${basicUrl}/indent/shelf/list`,
  // 配置
  inventoryCityConfig: `${basicUrl}/indent/inventory/inventoryCityConfig`,
  // 货架新增
  saveShelf: `${basicUrl}/indent/shelf/save`,
  // 编辑货架
  setCarryShelfGoods: `${basicUrl}/indent/inventory/setCarryShelfGoods`,
  // 删除货架
  shelfDelete: `${basicUrl}/indent/shelf/delete`,
  // 获取货架中的商品
  shelfGoodsList: `${basicUrl}/indent/shelfGoods/list`,
  // 删除货架中的商品
  goodsDelete: `${basicUrl}/indent/shelfGoods/delete`,
  // 查找添加商品搜索接口
  storeGoodsPageList: `${basicUrl}/indent/basics/storeGoodsPageList`,
  // 判断货架中商品是否存在
  isExist: `${basicUrl}/indent/shelfGoods/isExist`,
  // 保存货架商品
  shelfGoodsSave: `${basicUrl}/indent/shelfGoods/save`
}
