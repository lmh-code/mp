<style scoped>
  .page-container {
    width: 100%;
    min-height: 100vh;
    height: auto;
    background-color: #f2f2f2;
  }

  .goods-list-wrap {
    width: 100%;
    padding: 110rpx 20rpx 10rpx 20rpx;
    box-sizing: border-box;
  }

  .list-item {
    width: 100%;
    background-color: #ffffff;
    border-radius: 8rpx;
    margin-bottom: 20rpx;
    padding: 20rpx;
    box-sizing: border-box;
  }

</style>
<template>
  <div class="page-container">
    <hi-search-view placeholder="请输入商品名称或编码" disabled="true"></hi-search-view>
    <div class="goods-list-wrap">
      <div v-for="(item, index) in goodsList" :key="index" class="list-item">
        <div class="name-wrap">{{item.name}}</div>
        <div class="name-wrap">
          <span>编码：{{item.goodsNo}}</span>
          <span>条码：{{item.barcode}}</span>
        </div>
        <div>当月销量：{{item.thisMonthSaleQty || 0}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import Storage from "@/utils/localStorage"
  import utils from "@/utils/utils"
  import shelvesUrl from "@/Api/shelves"
  import HiSearch from "@/components/HiSearch"
  export default {
    data() {
      return {
        storeNo: Storage.get('loginInfo').StoreNo,
        shelfName: '',
        shelfNo: '',
        goodsList: []
      }
    },
    onLoad(options) {
      let shelfName = options.shelfName
      let shelfNo = options.shelfNo
      this.shelfName = shelfName
      this.shelfNo = shelfNo
      mpvue.setNavigationBarTitle({
        title: `货架:${shelfName}`
      })
    },
    onShow() {
      this.getShelfGoodsList()
    },
    components: {
      "hi-search-view": HiSearch
    },
    methods: {
      getShelfGoodsList() {
        let _this = this
        let _params = {
          pageNum: 1,
          pageSize: -1,
          businessType: 1,
          shelfNo: this.shelfNo,
          shelfName: this.shelfName,
          storeNo: this.storeNo
        }
        this.$http.post({
          showLoading: true,
          url: shelvesUrl.shelfGoodsList,
          data: {
            ..._params
          },
          success: function (res) {
            if (res.code === 0) {
              _this.goodsList = res.data && res.data.result && res.data.result.length ? res.data.result : []
            } else {
              utils.toast(res.msg, "none")
            }
          }
        })
      }
    }
  }

</script>
