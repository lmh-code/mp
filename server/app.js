var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var ejs = require('ejs')
var indexRouter = require('./routes/index')

var app = express()

// const cors = require('cors');
// app.use(cors({
//   origin: ['http://localhost:3002'],
//   methods: ['PUT','POST','GET','DELETE','OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
// }))


app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Headers', "Content-Type, Content-Length, Authorization, Accept, X-Requested-With, device, device_type, version")
  res.header("Access-Control-Allow-Methods", "OPTIONS,HEAD,DELETE,GET,PUT,POST")
  res.header("Access-Control-Max-Age", 10000)
  res.header("Access-Control-Allow-Credentials", true)
  res.header("AllowCredentials", false)
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8")
  next()
})


// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.engine('.html', ejs.__express)
app.set('view engine', 'html')

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// 使用路由
app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
