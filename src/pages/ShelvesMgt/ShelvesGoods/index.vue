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

  .del-wrap {
    background-color: #FD6400;
    width: 120rpx;
    margin-bottom: 20rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 30rpx;
    color: #FFFFFF;
    letter-spacing: 0;
    -webkit-transform: translateX(120rpx);
    transform: translateX(120rpx);
    -webkit-transition: all 0.4s;
    transition: all 0.4s;
  }

  .move-active .item-wrap,
  .move-active .del-wrap {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }

</style>
<template>
  <div class="page-container">
    <hi-search-view placeholder="请输入商品名称或编码" disabled="true" showScan="true" :pagePath="pagePath"
      @scanHandel="scanHandel"></hi-search-view>
    <div class="goods-list-wrap">
      <div v-for="(item, index) in goodsList" :key="index" class="list-item"
        :class="item.isTouchMove ? 'move-active' : ''" @touchstart="touchstart($event)"
        @touchmove="touchmove($event, index)">
        <div class="item-wrap">
          <div class="item-com name-wrap">
            {{index+1}}. {{item.name}}
            <span v-if="item.splitType === 'split'" class="tip-txt">子码</span>
          </div>
          <div class="item-com no-wrap">
            <span>编码：{{item.goodsNo}}</span>
            <span>条码：{{item.barcode}}</span>
          </div>
          <div class="item-com">当月销量：{{item.thisMonthSaleQty || 0}}</div>
        </div>
        <div class="del-wrap" @click="deleteHandel(item.id)">删除</div>
      </div>
    </div>

    <confirm-view :showModel="showModel" :showTitle="showTitle" :title="title" :showTip="showTip" :tipMsg="tipMsg"
      @cancelHandel="cancelHandel" @confirmHandel="confirmHandel">
    </confirm-view>
  </div>
</template>
<script>
  import Storage from "@/utils/localStorage"
  import utils from "@/utils/utils"
  import shelvesUrl from "@/Api/shelves"
  import HiSearch from "@/components/HiSearch"
  import ConfirmView from "@/components/Confirm"
  export default {
    data() {
      return {
        pagePath: '',
        storeNo: Storage.get('loginInfo').StoreNo,
        shelfName: '',
        shelfNo: '',
        goodsList: [],

        // 确认框相关
        showModel: false,
        showTitle: false,
        title: '',
        showTip: false,
        tipMsg: '',

        startX: 0,
        startY: 0
      }
    },
    onLoad(options) {
      let shelfName = options.shelfName
      let shelfNo = options.shelfNo
      this.shelfName = shelfName
      this.shelfNo = shelfNo
      this.pagePath = `/pages/ShelvesMgt/ShelvesGoods/GoodsSearch/main?shelfNo=${shelfNo}`
      mpvue.setNavigationBarTitle({
        title: `货架:${shelfName}`
      })
    },
    onShow() {
      this.storeNo = Storage.get('loginInfo').StoreNo
      this.getShelfGoodsList()
    },
    components: {
      "hi-search-view": HiSearch,
      'confirm-view': ConfirmView
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
              let goodsListArr = res.data && res.data.result && res.data.result.length ? res.data.result : []
              _this.goodsList = goodsListArr.map(item => {
                item.isTouchMove = false
                return item
              })
            } else {
              utils.toast(res.msg, "none")
            }
          }
        })
      },

      touchstart(e, idx) {
        this.startX = e.touches[0].clientX
        this.startY = e.touches[0].clientY
      },

      touchmove(e, idx) {
        let startX = this.startX // 开始X坐标
        let startY = this.startY // 开始Y坐标
        let touchMoveX = e.touches[0].clientX // 滑动变化坐标
        let touchMoveY = e.touches[0].clientY // 滑动变化坐标
        // 获取滑动角度
        let calAngle = this.calAngle({
          X: startX,
          Y: startY
        }, {
          X: touchMoveX,
          Y: touchMoveY
        })
        let goodsListArr = [...this.goodsList]
        goodsListArr.forEach((item, index) => {
          item.isTouchMove = false
          // 滑动超过30度角 return
          if (Math.abs(calAngle) > 30) return
          if (index === idx) {
            if (touchMoveX > startX) {
              // 右滑
              item.isTouchMove = false
            } else {
              // 左滑
              item.isTouchMove = true
            }
          }
        })
        // 更新数据
        this.goodsList = goodsListArr
      },

      /**
       * 计算滑动角度
       * @param {Object} start 起点坐标
       * @param {Object} end 终点坐标
       */
      calAngle(start, end) {
        let _X = end.X - start.X
        let _Y = end.Y - start.Y
        // 返回角度 /Math.atan()返回数字的反正切值
        return 360 * Math.atan(_Y / _X) / (2 * Math.PI)
      },

      deleteHandel(_id) {
        this.delId = _id
        this.showModel = true
        this.showTitle = true
        this.title = '温馨提示'
        this.showTip = true
        this.tipMsg = '确定要删除该商品吗？'
      },

      cancelHandel() {
        this.showModel = false
      },

      confirmHandel() {
        let _this = this
        let id = this.delId
        this.$http.post({
          showLoading: true,
          url: `${shelvesUrl.goodsDelete}/${id}`,
          success: function (res) {
            if (res.code === 0) {
              _this.showModel = false
              _this.goodsList = _this.goodsList.filter(item => {
                return item.id !== id
              })
              utils.toast("删除成功", "none")
            } else {
              utils.toast(res.msg, "none")
            }
          }
        })
      },

      scanHandel() {
        console.log("扫码成功")
      }

    }
  }

</script>
