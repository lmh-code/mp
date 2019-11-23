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
      res.json(response.statusCode, JSON.parse(body))
    } else {
      res.json(response.statusCode, JSON.parse(response.body))
    }
  })
})

module.exports = router
