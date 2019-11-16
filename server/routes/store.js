var express = require('express')
var request = require('request')
var config = require('../utils/config')
var storePickerUrl = config.storePickerUrl
var router = express.Router()

/* GET home page. */
// router.get('/user', function(req, res, next) {
//   var questions = [
//     {
//       data: 213,
//       num: 444,
//       age: 12
//     },
//     {
//       data: 456,
//       num: 678,
//       age: 13
//     }
//   ]
//   res.json(questions)
// })

/**
 * @description: 获取门店列表
 * @param {type} 传递Header和接口参数
 * @return: 门店信息
 */
router.post('/store/userCityStoreTreeList', function(req, res, next) {
  request({
    url: storePickerUrl.storeList,
    method: 'POST',
    headers: req.headers,
    body: JSON.stringify(req.body)
  }, function(err, response, body) {
    if (!err && response.statusCode === 200) {
      res.json(JSON.parse(body))
    } else {
      console.log("获取门店列表：", err)
    }
  })
})

module.exports = router
