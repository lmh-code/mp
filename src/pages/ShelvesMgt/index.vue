<template>
  <div class="page-container">
    <div class="shelves-list-wrap">
      <div v-for="(item, index) in shelvesList" :key="index" class="list-item-wrap">
        <div class="item-com item-first">
          <div class="left fw">
            {{item.shelfName}}
          </div>
          <div class="right" @click="doDelHandel(item.id)">
            <image class="del-icon" src="/static/images/loss-delete.png" mode="widthFix" lazy-load="false"></image><span style="font-size: 30rpx;color: #555555;">删除</span>
          </div>
          <div class="right" @click="showEditDialog(item)">
            <image class="edit-icon" src="/static/images/edit.png" mode="widthFix" lazy-load="false"></image><span style="font-size: 30rpx;color: #555555;">编辑</span>
          </div>
        </div>
        <div class="item-com item-second" @click="goShelvesGoodsPage(item)">
          <div class="left">
            <div>已绑定商品: {{item.skuCount}}</div>
            <div>创建时间: {{item.createTime}}</div>
          </div>
          <div class="right">
            <image class="next-icon" src="/static/images/next.png" mode="widthFix" lazy-load="false"></image>
          </div>
        </div>
      </div>
    </div>
    <footer-view 
      showRight="true" 
      rightTxt="新增货架" 
      @rightBtnHandel="showAddDialogHandel">
    </footer-view>
    <confirm-view 
      :showModel="showModel" 
      :showTitle="showTitle" 
      :title="title" 
      :showTip="showTip"
      :tipMsg="tipMsg"
      @cancelHandel="cancelHandel" 
      @confirmHandel="confirmHandel">
    </confirm-view>
    <add-shelves-view
      :showModel="showAddDialog"
      :selected="selected"
      :disabled="modified"
      :defaultName="defaultName"
      :edit="edit"
      @cancelHandel="backHandel"
      @confirmHandel="addShelvesHandel">
    </add-shelves-view>
  </div>
</template>

<script>
  import Storage from "@/utils/localStorage"
  import shelvesUrl from "@/Api/shelves"
  import utils from "@/utils/utils"
  import FooterView from "@/components/Footer"
  import ConfirmView from "@/components/Confirm"
  import AddShelvesView from "./AddShelves"
  export default {
    data() {
      return {
        pageNum: 1,
        pageSize: 50,
        storeNo: Storage.get('loginInfo').StoreNo,
        shelvesList: [],

        // 确认框相关
        showModel: false,
        showTitle: false,
        title: '',
        showTip: false,
        tipMsg: '',

        // 新增货架
        showAddDialog: false,
        selected: false,
        modified: false, // 是否可编辑
        defaultName: '',
        shelfNo: '',
        shelfId: '',
        edit: false,

        // 删除用
        delId: ''
      }
    },
    onShow() {
      this.getShelves()
    },
    components: {
      'footer-view': FooterView,
      'confirm-view': ConfirmView,
      'add-shelves-view': AddShelvesView
    },
    methods: {
      getShelves() {
        let _this = this
        let _params = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          storeNo: this.storeNo
        }
        this.$http.post({
          showLoading: true,
          url: shelvesUrl.shelvesList,
          data: {..._params},
          success: function (res) {
            if (res.code === 0) {
              _this.shelvesList = res.data && res.data.result && res.data.result.length ? res.data.result : []
            } else {
              utils.toast(res.msg, "none")
            }
          }
        })
      },
      async inventoryCityConfig(_shelfNo) {
        let _this = this
        let _params = {
          storeNo: this.storeNo,
          shelfNo: _shelfNo || null
        }
        return new Promise((resolve, reject) => {
          _this.$http.post({
            showLoading: true,
            url: shelvesUrl.inventoryCityConfig,
            data: {..._params},
            success: function (res) {
              if (res.code === 0) {
                resolve(res.data)
              } else {
                reject(res.msg)
              }
            }
          })
        })
      },
      async showAddDialogHandel () {
        // 获取货架配置
        await this.inventoryCityConfig().then(res => {
          this.showAddDialog = true
          this.edit = false
          this.defaultName = ''
          this.shelfNo = ''
          this.shelfId = ''
          this.selected = res.selected
          this.modified = res.modified
        }).catch(err => { utils.toast(err, "none") })
      },
      backHandel () {
        this.showAddDialog = false
      },
      addShelvesHandel (e) {
        let _this = this
        let _params = {
          storeNo: this.storeNo,
          carryShelfGoods: e.selected ? 1 : 0,
          shelfName: e.defaultName
        }
        if (this.edit) {
          if (!this.modified) {
            this.showAddDialog = false
            return
          }
          _params.shelfNo = this.shelfNo
          _params.id = this.shelfId
          this.$http.post({
            showLoading: true,
            url: shelvesUrl.setCarryShelfGoods,
            data: {..._params},
            success: function (res) {
              if (res.code === 0) {
                _this.showAddDialog = false
                utils.toast("编辑成功", "success")
              } else {
                utils.toast(res.msg, "none")
              }
            }
          })
        } else {
          _params.shelfNo = e.defaultName
          this.$http.post({
            showLoading: true,
            url: shelvesUrl.saveShelf,
            data: {..._params},
            success: function (res) {
              if (res.code === 0) {
                _this.getShelves()
                _this.showAddDialog = false
                utils.toast("新增成功", "success")
              } else {
                utils.toast(res.msg, "none")
              }
            }
          })
        }
      },
      async showEditDialog (_row) {
        // 获取货架配置
        await this.inventoryCityConfig(_row.shelfNo).then(res => {
          this.showAddDialog = true
          this.edit = true
          this.defaultName = _row.storeName
          this.shelfNo = _row.shelfNo
          this.shelfId = _row.id
          this.selected = res.selected
          this.modified = res.modified
        }).catch(err => { utils.toast(err, "none") })
      },
      doDelHandel (_id) {
        this.delId = _id
        this.showModel = true
        this.showTitle = true
        this.title = '温馨提示'
        this.showTip = true
        this.tipMsg = '删除后货架里的商品也会删除，请确认是否删除此货架？'
      },
      cancelHandel () {
        this.showModel = false
      },
      confirmHandel () {
        let _this = this
        let id = this.delId
        this.$http.post({
          showLoading: true,
          url: `${shelvesUrl.shelfDelete}/${id}`,
          success: function (res) {
            if (res.code === 0) {
              _this.showModel = false
              _this.shelvesList = _this.shelvesList.filter(item => {
                return item.id !== id
              })
              utils.toast("删除成功", "success")
            } else {
              utils.toast(res.msg, "none")
            }
          }
        })
      },
      goShelvesGoodsPage (_row) {
        mpvue.navigateTo({
          url: `/pages/ShelvesMgt/ShelvesGoods/main?shelfName=${_row.shelfName}`
        })
      }
    
    }
  }
</script>
<style scoped>
  .page-container {
    width: 100%;
    min-height: 100vh;
    background-color: #f2f2f2;
  }
  .shelves-list-wrap {
    padding: 20rpx 20rpx 100rpx;
    box-sizing: border-box;
  }
  .list-item-wrap {
    width: 100%;
    background-color: #fff;
    border-radius: 8rpx;
    margin-bottom: 20rpx;
    padding: 20rpx;
    box-sizing: border-box;
  }
  .item-com {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .left {
    flex: 1;
    font-size: 30rpx;
    color: #555555;
    line-height: 50rpx;
  }
  .fw {
    font-weight: bold;
  }
  .right {
    width: 100rpx;
    padding: 10rpx 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .del-icon, .edit-icon {
    width: 32rpx;
    height: 32rpx;
  }
  .next-icon {
    width: 12rpx;
    height: 28rpx;
  }
</style>
