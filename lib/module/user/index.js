'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _UserBusiness = require('./business/UserBusiness');

var _UserBusiness2 = _interopRequireDefault(_UserBusiness);

var _monitor = require('../../base/monitor');

var _ReturnJson = require('../../base/network/ReturnJson');

var _ReturnJson2 = _interopRequireDefault(_ReturnJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *    index.js(user)
 *    Created by luochenxun on 16/09/30.
 *    Copyright © 2016年 timebottles. All rights reserved.
 *
 *  Brief:
 *
 *  用户模块(主接口)
 *
 *
 *  Usage :
 *
 */

function isEmptyObject(e) {
  var t;
  for (t in e) return !1;
  return !0;
}

class user {

  // 登录 rest
  static login(req, res) {
    let isPost = req.route.methods.post;
    let method = req.route.path;
    let salt = '7asdf98z2p9bi23klo94nb186as2lklkj88s';
    let verb = isPost ? 'POST' : 'GET';
    let sign = verb + method;

    // generate sign
    if (isPost) {
      let body = req.body;
      if (isEmptyObject(body)) {
        throw (0, _monitor.Error)(_monitor.ErrorCode.LACK_PARAM, _monitor.ErrorCode.LACK_PARAM_MSG);
      }

      // sort body
      let bodys = Object.getOwnPropertyNames(body);
      bodys = bodys.filter((item, index, arr) => item !== 'sign');
      bodys.sort((a, b) => a[0] > b[0]);
      bodys.forEach((key, index, array) => {
        sign += key + body[key];
      });

      // add sault
      sign += salt;
    }

    console.log('before sha1:' + sign);
    var sha1 = _crypto2.default.createHash('sha1');
    sha1.update(sign);
    sign = sha1.digest('hex').toLowerCase();

    console.log('sign:' + sign);

    // check sign
    if (req.body.sign !== sign) {
      throw (0, _monitor.Error)(_monitor.ErrorCode.SIGN_ERR, _monitor.ErrorCode.SIGN_ERR_MSG);
    }

    // login
    let userInfo = _UserBusiness2.default.loginWithAccountAndPsw(req.body.user_account, req.body.user_psw);
    if (!userInfo) {
      throw (0, _monitor.Error)(2001, 'user invalid');
    } else {
      delete userInfo.psw;
      res.json(new _ReturnJson2.default(userInfo));
    }
  }
}exports.default = user;
;