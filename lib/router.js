'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = router;

var _user = require('./module/user');

var _user2 = _interopRequireDefault(_user);

var _ReturnJson = require('./base/network/ReturnJson');

var _ReturnJson2 = _interopRequireDefault(_ReturnJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 路由处理
/**
 *    router.js
 *    Created by luochenxun on 16/09/30.
 *    Copyright © 2016年 timebottles. All rights reserved.
 *
 *  Brief:
 *
 *  路由处理
 *
 *  Usage :
 *
 *  传入 express 实例，对之进行路由处理
 *
 */

function router(app) {
  // -------------------------
  // Index
  // -------------------------
  app.get('/', (req, res) => {
    res.type('text/plain');
    res.send('欢迎来到时光瓶');
  });

  // -------------------------
  // User
  // -------------------------
  // login
  app.post('/user/login', _user2.default.login);

  // -------------------------
  // Error Process
  // -------------------------

  // 定制404页面
  app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('原谅我，我在时光机中迷了路');
  });

  // 500 or uncatch err
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.log('errCode:' + err.errCode + ',errorMsg :' + err.message);
    console.log('err: ' + JSON.stringify(err));
    if (err.errCode === undefined || err.errCode === null || err.length == 0) {
      console.log(err.stack);
    }
    res.json(new _ReturnJson2.default('', err.errCode, err.message).json());
  });
};