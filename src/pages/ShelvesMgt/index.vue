<template>
  <div class="page-container">
    <div class="shelves-list-wrap">
      <div v-for="(item, index) in shelvesList" :key="index" class="list-item-wrap">
        <div class="item-com item-first">
          <div class="left fw">
            {{item.shelfName}}
          </div>
          <div class="right" @click="doDelHandel">
            <image class="del-icon" src="/static/images/loss-delete.png" mode="widthFix" lazy-load="false"></image>
          </div>
          <div class="right" @click="showEditDialog(item)">
            <image class="edit-icon" src="/static/images/edit.png" mode="widthFix" lazy-load="false"></image>
          </div>
        </div>
        <div class="item-com item-second">
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
        defaultName: '',
        shelfNo: '',
        shelfId: '',
        edit: false
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
      showAddDialogHandel () {
        this.showAddDialog = true
        this.edit = false
        // 根据接口获取selected
        this.selected = true
        this.defaultName = ''
        this.shelfNo = ''
        this.shelfId = ''
      },
      backHandel () {
        this.showAddDialog = false
      },
      addShelvesHandel (e) {
        let _params = {
          selected: e.selected,
          shelfName: e.defaultName
        }
        if (this.edit) {
          _params.shelfNo = this.shelfNo
          _params.id = this.shelfId
          console.log("编辑_params:", _params)
        } else {
          console.log("新增_params:", _params)
        }
      },
      showEditDialog (_row) {
        console.log("_row:", _row)
        this.showAddDialog = true
        this.edit = true
        this.defaultName = _row.storeName
        this.shelfNo = _row.shelfNo
        this.shelfId = _row.id
        // 根据接口获取
        this.selected = _row.selected
      },
      doDelHandel () {
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
        console.log("confirmHandel")
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
    padding: 20rpx 40rpx 100rpx 20rpx;
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
