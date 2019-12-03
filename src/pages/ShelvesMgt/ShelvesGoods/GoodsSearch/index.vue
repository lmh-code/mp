<style scoped>
  .page-container {
    width: 100%;
    min-height: 100vh;
    height: auto;
    background-color: #f2f2f2;
  }

  .empty {
    width: 100%;
    padding-top: 350rpx;
    text-align: center;
    font-size: 28rpx;
    color: #555555;
  }

  .goods-list-wrap {
    width: 100%;
    padding: 110rpx 20rpx 10rpx 20rpx;
    box-sizing: border-box;
  }

  .list-item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
  }

  .item-com {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    align-items: center;
    font-size: 30rpx;
    color: #555555;
    line-height: 50rpx;
  }

  .item-wrap {
    width: 100%;
    background-color: #ffffff;
    border-radius: 8rpx;
    margin-bottom: 20rpx;
    padding: 20rpx;
    box-sizing: border-box;
    margin-right: 0;
    -webkit-transition: all 0.4s;
    transition: all 0.4s;
    -webkit-transform: translateX(120rpx);
    transform: translateX(120rpx);
    margin-left: -120rpx;
  }

  .name-wrap {
    flex: 1;
    color: #333333;
    font-weight: bold;
  }

  .no-wrap {
    flex: 1;
    display: flex;
    justify-content: space-between;
  }

  .tip-txt {
    font-weight: normal;
    border: 2rpx solid #FD6400;
    line-height: 36rpx;
    font-size: 24rpx;
    color: #555555;
    padding: 0 8rpx;
    border-radius: 8rpx;
    margin-left: 10rpx;
  }

  .no-more {
    width: 100%;
    text-align: center;
    font-size: 28rpx;
    color: #555555;
    margin-bottom: 10rpx;
  }

</style>
<template>
  <div class="page-container">
    <hi-search-view placeholder="请输入商品名称或编码" showScan="true" @scanHandel="scanHandel" @doSearchHandel="doSearchHandel">
    </hi-search-view>
    <empty-view v-if="noMore && pageNum === 1"></empty-view>
    <div class="goods-list-wrap" v-else>
      <div v-for="(item, index) in goodsList" :key="index" class="list-item">
        <div class="item-wrap" @click="showAddDialog(item)">
          <div class="item-com name-wrap">
            {{index+1}}. {{item.goodsName}}
            <span v-if="item.splitType === 'split'" class="tip-txt">子码</span>
          </div>
          <div class="item-com no-wrap">
            <span>编码：{{item.goodsNo}}</span>
            <span>条码：{{item.barcode}}</span>
          </div>
          <div class="item-com">当月销量：{{item.thisMonthSaleQty || 0}}</div>
        </div>
      </div>
      <div v-if="noMore && pageNum !== 1" class="no-more">~没有更多了~</div>
      <div v-else-if="loadMore && pageNum !== 1" class="no-more">努力加载中...</div>
    </div>

    <add-shelf-goods-view :showModel="showModel" :goodsName="goodsName" :fromList="fromList" :goodsNo="goodsNo"
      :barCode="barCode" confirmTxt="添加" @cancelHandel="cancelHandel" @confirmHandel="confirmHandel">
    </add-shelf-goods-view>
    <confirm-view :showModel="showConfirm" showTitle="true" title="温馨提示" showTip="true" tipMsg="商品在此货架列表中存在，是否继续添加？"
      @cancelHandel="cancelConfirmHandel" @confirmHandel="confirmHandelAgin">
    </confirm-view>
  </div>
</template>
<script>
  import Storage from "@/utils/localStorage"
  import utils from "@/utils/utils"
  import HiSearch from "@/components/HiSearch"
  import Empty from "@/components/Empty"
  import Confirm from "@/components/Confirm"
  import AddShelfGoods from "../../AddShelfGoods"
  import shelvesUrl from "@/Api/shelves"
  export default {
    data() {
      return {
        shelfNo: '',
        pageNum: 1,
        storeNo: Storage.get('loginInfo').StoreNo,
        searchValue: '',
        goodsList: [],
        loadMore: false,
        noMore: false,

        // 添加弹窗用
        showModel: false,
        // 确认框
        showConfirm: false,
        goodsNo: ''
      }
    },
    onShow() {
      this.storeNo = Storage.get('loginInfo').StoreNo
    },
    onLoad(options) {
      let shelfNo = options.shelfNo
      this.shelfNo = shelfNo
    },
    components: {
      "hi-search-view": HiSearch,
      "empty-view": Empty,
      "add-shelf-goods-view": AddShelfGoods,
      'confirm-view': Confirm
    },
    methods: {
      doSearchHandel(params) {
        let _this = this
        let queryStr = params
        if (!queryStr) return

        this.pageNum = 1
        this.goodsList = []
        this.searchValue = queryStr
        this.noMore = false
        this.loadMore = false
        this.loadMoreHandel()
      },

      loadMoreHandel() {
        let _this = this
        let _params = {
          businessType: 1,
          pageNum: this.pageNum,
          searchValue: this.searchValue,
          storeNo: this.storeNo
        }
        this.loadMore = true
        let showLoading = false
        if (this.pageNum === 1) showLoading = true
        this.$http.post({
          showLoading: showLoading,
          url: shelvesUrl.storeGoodsPageList,
          data: {
            ..._params
          },
          success: function (res) {
            if (res.code === 0) {
              let goodsListArr = res.data && res.data.result && res.data.result.length ? res.data.result : []
              if (goodsListArr.length > 0) {
                _this.loadMore = false
                _this.goodsList = [..._this.goodsList, ...goodsListArr]
              } else {
                _this.loadMore = true
                _this.noMore = true
              }
            } else {
              _this.loadMore = false
              utils.toast(res.msg, "none")
            }
          }
        })
      },
      showAddDialog(_row) {
        this.goodsName = _row.goodsName
        this.fromList = true
        this.goodsNo = _row.goodsNo
        this.barCode = _row.barcode
        this.barCode = _row.barcode
        this.showModel = true
      },
      cancelHandel() {
        this.showModel = false
      },
      async checkIsExist() {
        let _params = {
          storeNo: this.storeNo,
          shelfNo: this.shelfNo,
          goodsNo: this.goodsNo,
          goodsId: this.goodsNo
        }
        return new Promise((resolve, reject) => {
          this.$http.post({
            showLoading: true,
            url: shelvesUrl.isExist,
            data: {
              ..._params
            },
            success: function (res) {
              if (res.code === 0) {
                resolve(res.data)
              } else {
                utils.toast(res.msg, "none")
              }
            }
          })
        })
      },
      async confirmHandel(params) {
        this.goodsNo = params.goodsNo
        let isExit = await this.checkIsExist()
        if (isExit === 'true') {
          // TODO 存在
          this.showModel = false
          this.showConfirm = true
        } else {
          // 不存在直接添加
          this.doInsertHandel()
        }
      },
      doInsertHandel() {
        let _this = this
        let _params = {
          storeNo: this.storeNo,
          shelfNo: this.shelfNo,
          goodsNo: this.goodsNo,
          goodsId: this.goodsNo
        }
        this.$http.post({
          showLoading: true,
          url: shelvesUrl.shelfGoodsSave,
          data: {
            ..._params
          },
          success: function (res) {
            if (res.code === 0) {
              utils.toast("添加成功", "none")
              _this.showConfirm = false
              _this.showModel = false
            } else {
              utils.toast(res.msg, "none")
            }
          }
        })
      },
      cancelConfirmHandel() {
        this.showConfirm = false
      },
      confirmHandelAgin() {
        this.doInsertHandel()
      },
      scanHandel() {
        console.log("扫码成功")
      }
    },
    onReachBottom() {
      if (this.loadMore) return
      let pageNum = this.pageNum
      pageNum++
      this.pageNum = pageNum
      this.loadMoreHandel()
    }
  }

</script>
