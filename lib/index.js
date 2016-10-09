'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)(); /*******  import module  **********/


// var mongoose from ''mongoose');


/*******   配置   **********/
// // db
// mongoose.connect('mongodb://120.25.234.188:27017/timebottles_test');
// var db = mongoose.connection;

// 设置全局变量
app.set('port', process.env.PORT || 8081);

// logger
app.use((0, _morgan2.default)('dev'));

// forbit the server info leak
app.disable('x-powered-by');

//TODO: uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(_bodyParser2.default.json());

// for parsing plain/text
app.use(_bodyParser2.default.text());

// for parsing application/x-www-form-urlencoded
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use((0, _cookieParser2.default)());

/*******  Static parse  **********/
app.use(_express2.default.static('./public'));

/*******  router  **********/
(0, _router2.default)(app);

// app.use(multer()); // for parsing multipart/form-data
// app.use('/oauth2', require('./rest/oauth2'));
// app.use('/users', require('./rest/user.resource'));


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