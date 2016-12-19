  /*******  import modules  **********/
// 系统库
import express from 'express';
import path from 'path';
import fs from 'fs';
import favicon from 'serve-favicon';
// 中间件
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
// import flash from 'connect-flash';
import passport from 'passport';
// logger
import FileStreamRotator from 'file-stream-rotator';
import morgan from 'morgan';
// 配置
import config from 'app/core/config';

/**
 * 初始化Express环境，用于初始化Express运行所需要的各种环境变量及中间件
 *
 * @method initExpress
 *
 * @return {object}    express 对象
 */
const initExpress = ()=>{
  let app = express();

  // ---- 设置全局变量
  // app.set('port', process.env.PORT || 8081);
  // 项目主路径
  let __rootdir = path.join(__dirname , '..');

  // ---- 全局安全设置
  // forbit the server info leak
  app.disable('x-powered-by');

  // ---- logger（将日志输出到根 logs 目录）
  let logDirectory = path.join(__rootdir,'logs');
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory); // create a rotating write stream
  var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, 'accesslog-%DATE%.log'),
    frequency: 'daily',
    verbose: false
  });
  morgan.token('type', function (req, res) { return req.headers['content-type'] });
  let logToken = '(:remote-addr|:remote-user) [:date[clf]] ":method :url HTTP/:http-version" ":referrer" ":user-agent" (:status :res[content-length] bytes :response-time ms) ';
  app.use(morgan(logToken, {stream: accessLogStream}))

  // ---- static path
  app.use(express.static(path.join(__rootdir,'public')));
  // app.use(favicon(path.join(__rootdir,'public','favicon.png')));

  // ---- paser
  // -- cookie & session
  app.use(cookieParser());
  // -- bodyParser
  app.use(bodyParser.json());
  app.use(bodyParser.text());
  app.use(bodyParser.raw());
  // for parsing application/x-www-form-urlencoded(文件上传)
  app.use(bodyParser.urlencoded({extended: false}));
  // -- Session parser
  app.use(session({
    secret: config.cookieConfig.secret,  // cookie 密钥
    cookie: {maxAge: config.cookieConfig.maxAge},
    resave:true,
    saveUninitialized: true,
  }));
  // -- flash paser
  // app.use(flash());
  // -- passport
  app.use(passport.initialize());
  app.use(passport.session());

  return app;
}

export default initExpress;
