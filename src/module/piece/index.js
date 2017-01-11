/**
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

import crypto from 'crypto';
import {Error, ErrorCode, ReturnJson} from 'app/base/network';


function isEmptyObject(e) {
  var t;
  for (t in e) return !1;
  return !0;
}

export default class PieceController {

  // 上传时光碎片
  static uploadPiece(req, res) {

    let method = req.route.path;
    let salt = '7asdf98z2p9bi23klo94nb186as2lklkj88s';
    let sign = 'POST' + method;
    let body = req.body;

    if (isEmptyObject(body)) {
      throw Error(ErrorCode.LACK_PARAM, ErrorCode.LACK_PARAM_MSG);
    }

    // sort body
    let bodys = Object.getOwnPropertyNames(body);
    bodys = bodys.filter((item, index, arr) => (item !== 'sign'));
    bodys.sort((a, b) => (a > b));
    bodys.forEach((key, index, array) => {
      sign += (key + body[key]);
    });

    // add sault
    sign += salt;

    console.log('sign before sha1:' + sign);
    var sha1 = crypto.createHash('sha1');
    sha1.update(sign);
    sign = sha1.digest('hex').toLowerCase();
    console.log('sign:' + sign);

    // check sign
    if (req.body.sign !== sign) {
      throw Error(ErrorCode.SIGN_ERR, ErrorCode.SIGN_ERR_MSG);
    }

    res.json(new ReturnJson({
      pic_url: 'http://120.25.234.188/'+req.file.filename
    }));
  }

};
