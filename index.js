/*******  import module  **********/
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');
// var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var logger = require('morgan');


/*******   配置   **********/
// // db
// mongoose.connect('mongodb://120.25.234.188:27017/timebottles_test');
// var db = mongoose.connection;

// 设置全局变量
app.set('port', process.env.PORT || 8081);

// logger
app.use(logger('dev'));

// forbit the server info leak
app.disable('x-powered-by');

//TODO: uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

// Static parse
app.use(express.static(path.join(__dirname, 'public')));


/*******  router  **********/
// 设置路由 - 首页
app.get('/', (req, res) => {
    res.type('text/plain');
    res.send('欢迎来到时光瓶');
});

// app.use(multer()); // for parsing multipart/form-data
// app.use('/oauth2', require('./rest/oauth2'));
// app.use('/users', require('./rest/user.resource'));

// Error process
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// 开启服务，监听配置中给定的端口
app.listen(app.get('port'), () => {
    console.log('server is start a port :' + app.get('port'));
});

// /*******  start server & fault-tolerance  **********/
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', (cb) => {
//   console.log('mongo connected.');
//   var server = app.listen(port, function() {
//     var host = server.address().address;
//     console.log("Server listening at http://%s : %s", host, port);
//   });
// });
