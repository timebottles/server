'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _monitor = require('app/base/monitor');

var _ReturnJson = require('app/base/network/ReturnJson');

var _ReturnJson2 = _interopRequireDefault(_ReturnJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isEmptyObject(e) {
  var t;
  for (t in e) return !1;
  return !0;
} /**
   *    index.js(piece)
   *    Created by luochenxun on 16/10/09.
   *    Copyright © 2016年 timebottles. All rights reserved.
   *
   *  Brief:
   *
   *  时光碎片模块(主接口)
   *
   *
   *  Usage :
   *
   */

class PieceController {

  // 上传时光碎片
  static uploadPiece(req, res) {

    let method = req.route.path;
    let salt = '7asdf98z2p9bi23klo94nb186as2lklkj88s';
    let sign = 'POST' + method;
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

    console.log('sign before sha1:' + sign);
    var sha1 = _crypto2.default.createHash('sha1');
    sha1.update(sign);
    sign = sha1.digest('hex').toLowerCase();
    console.log('sign:' + sign);

    // check sign
    if (req.body.sign !== sign) {
      throw (0, _monitor.Error)(_monitor.ErrorCode.SIGN_ERR, _monitor.ErrorCode.SIGN_ERR_MSG);
    }

    res.json(new _ReturnJson2.default({
      pic_url: 'http://120.25.234.188/' + req.file.filename
    }));
  }

}exports.default = PieceController;
;