var express = require('express')
var request = require('request')
var config = require('../utils/config')
var loginUrl = config.loginUrl
var router = express.Router()

/* GET home page. */
router.get('/user', function(req, res, next) {
  var questions = [
    {
      data: 213,
      num: 444,
      age: 12
    },
    {
      data: 456,
      num: 678,
      age: 13
    }
  ]
  res.json(questions)
})
/**
 * @description: 登录接口
 * @param {type} 传递Header和接口参数
 * @return: 用户基本信息
 */
router.post('/authorization/login', function(req, res, next) {
  request.post({
    url: loginUrl.token,
    method: "POST",
    headers: req.headers,
    form: req.body
  }, function(e, r, body) {
    if (!e && r.statusCode === 200) {
      res.json(JSON.parse(body))
    } else {
      console.log("登录：", e)
    }
  })
})

module.exports = router
