/*******  import module  **********/
import express from 'express';
const app = express();
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import multer from 'multer';

// var mongoose from ''mongoose');
import favicon from 'serve-favicon';
import logger from 'morgan';
import router from './router';

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
app.use(bodyParser.json());

// for parsing plain/text
app.use(bodyParser.text());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());

/*******  Static parse  **********/
app.use(express.static('./public'));

/*******  router  **********/
router(app);

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
