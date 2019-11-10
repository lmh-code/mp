<template>
  <div>
    <div class="search-wrap">
      <input class="input-wrap" type="text" placeholder="输入门店名称或者编码" v-model.trim="searchVal" />
      <div class="search-btn" @click="doSearchHandel">搜索</div>
    </div>
    <div class="select-store-wrap">已选门店：{{storeNo}}-{{storeName}}</div>
    <div class="content-wrap">
      <div class="city-list-wrap">
        <div v-for="item in cityList" :key="item.cityId" class="city-item"
          :class="item.cityId === cityId ? 'city-select' : ''" @click="getStoreList(item.cityId, item.cityName)">
          {{item.cityName}}
        </div>
      </div>
      <div class="store-list-wrap">
        <div v-for="item in storeList" :key="item.nodeNo" :class="item.nodeNo === storeNo ? 'store-select' : ''"
          class="city-item" @click="selectStore(item.nodeNo, item.nodeName)">
          {{item.nodeNo}} - {{item.nodeName}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '@/utils/config'
  import utils from '@/utils/utils'
  import localStorage from '@/utils/localStorage'
  let storePickerUrl = config.storePickerUrl
  export default {
    data() {
      return {
        searchVal: '',
        treeData: [],
        cityList: [],
        storeList: [],
        storeListTemp: [],
        cityId: localStorage.get("cityId") || '',
        cityName: localStorage.get("cityName") || '',
        storeNo: localStorage.get("loginInfo").StoreNo || '',
        storeName: localStorage.get("loginInfo").StoreName || ''
      }
    },
    onShow() {
      this.resetStates()
      this.getTreeData()
    },
    methods: {
      resetStates() {
        let loginInfo = localStorage.get("loginInfo")
        this.cityId = localStorage.get("cityId") || ''
        this.cityName = localStorage.get("cityName") || ''
        this.storeNo = loginInfo.StoreNo || ''
        this.storeName = loginInfo.StoreName || ''
      },
      getTreeData() {
        let _this = this
        this.$http.post({
          showLoading: true,
          url: storePickerUrl.storeList,
          data: {},
          success: function (res) {
            if (res.code === 0 && res.data && res.data.length) {
              let currentCityId = _this.cityId ? _this.cityId : res.data[0].nodeId
              let currentCityName = _this.cityName ? _this.cityName : res.data[0].nodeName
              _this.cityId = currentCityId
              _this.cityName = currentCityName

              _this.treeData = res.data
              _this.cityList = res.data.map(item => {
                let newItem = {
                  cityId: item.nodeId,
                  cityName: item.nodeName
                }
                return newItem
              })
              _this.getStoreList(currentCityId, currentCityName)
            } else {
              utils.toast(res.msg)
            }
          },
          fail: function (e) {}
        })
      },

      /**
       * @description: 根据城市id获取当前城市下的门店
       */
      getStoreList(_cityId, _cityName) {
        let cityId = _cityId
        let cityName = _cityName
        this.cityId = _cityId
        this.cityName = _cityName
        localStorage.set('cityId', cityId)
        localStorage.set('cityName', cityName)
        let storeList = this.treeData.filter(item => {
          return item.nodeId === cityId
        })[0].childList
        this.storeList = storeList && storeList.length ? storeList : []
        this.storeListTemp = storeList && storeList.length ? storeList : []
      },

      selectStore(_storeNo, _storeName) {
        this.storeNo = _storeNo
        this.storeName = _storeName
        let loginInfo = localStorage.get('loginInfo')
        loginInfo.StoreNo = this.storeNo
        loginInfo.StoreName = this.storeName
        localStorage.set('loginInfo', loginInfo)
        mpvue.switchTab({
          url: '/pages/Home/main'
        })
      },

      doSearchHandel() {
        let storeListTemp = [...this.storeListTemp]
        if (this.searchVal) {
          this.storeList = storeListTemp.filter(item => {
            return item.nodeNo === this.searchVal || item.nodeName.includes(this.searchVal)
          })
        } else {
          this.storeList = storeListTemp
        }
      }

    }
  }

</script>

<style scoped>
  .search-wrap {
    padding: 0 40rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .input-wrap {
    flex: 1;
    height: 72rpx;
    line-height: 72rpx;
    padding-left: 20rpx;
    color: #666666;
    font-size: 32rpx;
    border: 1px solid #dddddd;
    border-radius: 10rpx;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .search-btn {
    flex: 0 0 110rpx;
    width: 110rpx;
    height: 72rpx;
    line-height: 72rpx;
    text-align: center;
    font-size: 32rpx;
    color: #666666;
    border: 1px solid #dddddd;
    border-radius: 10rpx;
    background-color: #ececec;
    border-left: 0 solid #dddddd;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }

  .select-store-wrap {
    height: 60rpx;
    line-height: 60rpx;
    color: #444444;
    padding: 0 40rpx;
    box-sizing: border-box;
    font-size: 36rpx;
  }

  .content-wrap {
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: row;
    flex-wrap: nowrap;
    box-sizing: border-box;
    padding-bottom: 132rpx;
  }

  .city-list-wrap {
    flex: 0 0 220rpx;
    width: 220rpx;
    padding-left: 40rpx;
    overflow-y: auto;
    box-sizing: border-box;
  }

  .city-item {
    padding: 20rpx 10rpx;
    font-size: 36rpx;
    color: #666666;
    position: relative;
  }

  .city-select,
  .store-select {
    color: #e35213;
  }

  .city-select::before {
    content: '';
    width: 6rpx;
    height: 40rpx;
    position: absolute;
    top: 50%;
    left: 0;
    margin-top: -20rpx;
    background-color: #e35213;
    border-radius: 8rpx;
  }

  .store-list-wrap {
    flex: 1;
    overflow-y: auto;
    padding-right: 40rpx;
    box-sizing: border-box;
  }

</style>
