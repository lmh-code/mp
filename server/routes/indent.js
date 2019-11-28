var express = require('express')
var request = require('request')
var indentUrl = require('../api/indent.js').indentUrl
var router = express.Router()

/**
 * @description: 获取货架列表
 * @param {type} 传递Header和接口参数
 * @return: 用户基本信息
 */
router.post('/shelf/list', function (req, res, next) {
  request.post({
    url: indentUrl.shelvesList,
    method: "POST",
    headers: req.headers,
    body: JSON.stringify(req.body)
  }, function (err, response, body) {
    if (!err && response.statusCode === 200) {
      let result = body ? JSON.parse(body) : {}
      res.json(response.statusCode, result)
    } else {
      let result = response.body ? JSON.parse(response.body) : {}
      res.json(response.statusCode, result)
    }
  })
})

/**
 * @description: 货架配置
 */
router.post('/inventory/inventoryCityConfig', function (req, res, next) {
  request.post({
    url: indentUrl.inventoryCityConfig,
    method: "POST",
    headers: req.headers,
    body: JSON.stringify(req.body)
  }, function (err, response, body) {
    if (!err && response.statusCode === 200) {
      let result = body ? JSON.parse(body) : {}
      res.json(response.statusCode, result)
    } else {
      let result = response.body ? JSON.parse(response.body) : {}
      res.json(response.statusCode, result)
    }
  })
})

/**
 * @description: 新增货架
 */
router.post('/shelf/save', function (req, res, next) {
  request.post({
    url: indentUrl.saveSgelf,
    method: "POST",
    headers: req.headers,
    body: JSON.stringify(req.body)
  }, function (err, response, body) {
    if (!err && response.statusCode === 200) {
      let result = body ? JSON.parse(body) : {}
      res.json(response.statusCode, result)
    } else {
      let result = response.body ? JSON.parse(response.body) : {}
      res.json(response.statusCode, result)
    }
  })
})

/**
 * @description: 编辑货架
 */
router.post('/inventory/setCarryShelfGoods', function (req, res, next) {
  request.post({
    url: indentUrl.setCarryShelfGoods,
    method: "POST",
    headers: req.headers,
    body: JSON.stringify(req.body)
  }, function (err, response, body) {
    if (!err && response.statusCode === 200) {
      let result = body ? JSON.parse(body) : {}
      res.json(response.statusCode, result)
    } else {
      let result = response.body ? JSON.parse(response.body) : {}
      res.json(response.statusCode, result)
    }
  })
})

/**
 * @description: 删除货架
 */
router.post('/shelf/delete/:id', function (req, res, next) {
  request.post({
    url: indentUrl.shelfDelete + '/' + req.params.id,
    method: "POST",
    headers: req.headers
  }, function (err, response, body) {
    if (!err && response.statusCode === 200) {
      let result = body ? JSON.parse(body) : {}
      res.json(response.statusCode, result)
    } else {
      let result = response.body ? JSON.parse(response.body) : {}
      res.json(response.statusCode, result)
    }
  })
})

/**
 * @description: 货架中的商品
 */
router.post('/shelfGoods/list', function (req, res, next) {
  request.post({
    url: indentUrl.goodsList,
    method: "POST",
    headers: req.headers,
    body: JSON.stringify(req.body)
  }, function (err, response, body) {
    if (!err && response.statusCode === 200) {
      let result = body ? JSON.parse(body) : {}
      res.json(response.statusCode, result)
    } else {
      let result = response.body ? JSON.parse(response.body) : {}
      res.json(response.statusCode, result)
    }
  })
})

/**
 * @description: 删除货架中的商品
 */
router.post('/shelfGoods/delete/:id', function (req, res, next) {
  request.post({
    url: indentUrl.goodsDelete + '/' + req.params.id,
    method: "POST",
    headers: req.headers
  }, function (err, response, body) {
    if (!err && response.statusCode === 200) {
      let result = body ? JSON.parse(body) : {}
      res.json(response.statusCode, result)
    } else {
      let result = response.body ? JSON.parse(response.body) : {}
      res.json(response.statusCode, result)
    }
  })
})

/**
 * @description: 查找添加商品搜索接口
 */
router.post('/basics/storeGoodsPageList', function (req, res, next) {
  request.post({
    url: indentUrl.storeGoodsPageList,
    method: "POST",
    headers: req.headers,
    body: JSON.stringify(req.body)
  }, function (err, response, body) {
    if (!err && response.statusCode === 200) {
      let result = body ? JSON.parse(body) : {}
      res.json(response.statusCode, result)
    } else {
      let result = response.body ? JSON.parse(response.body) : {}
      res.json(response.statusCode, result)
    }
  })
})


module.exports = router
