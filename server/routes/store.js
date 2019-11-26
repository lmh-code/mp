var express = require('express')
var request = require('request')
var storeUrl = require('../api/store.js').storeUrl
var router = express.Router()

/* GET home page. */
router.get('/user', function (req, res, next) {
  var questions = [{
    data: 213,
    num: 444,
    age: 12
  }]
  res.json(questions)
})

/**
 * @description: 获取门店列表
 * @param {type} 传递Header和接口参数
 * @return: 门店信息
 */
router.post('/store/userCityStoreTreeList', function (req, res, next) {
  request({
    url: storeUrl.storeList,
    method: 'POST',
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
