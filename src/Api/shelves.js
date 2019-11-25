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
  shelfDelete: `${basicUrl}/indent/shelf/delete`
}
