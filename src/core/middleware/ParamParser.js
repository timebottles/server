/**
*  @fileOverview 处理参数请求的中间件
*
*  @author luochenxun(luochenxun@gmail.com) , 2016-12-18 16:38.
*  @copyright © 2016年 Timebottles. All rights reserved.
*/

import Config from 'app/core/config';
import crypto from 'crypto';
import {Error, ErrorCode} from 'app/base/monitor';
import ReturnJson from 'app/base/network/ReturnJson';

function isEmptyObject(e) {
   var t;
   for (t in e)
       return !1;
   return !0
}

/**
 * [paramParser description]
 *
 * @method paramParser
 *
 * @param  {[type]}    req  [description]
 * @param  {[type]}    res  [description]
 * @param  {Function}  next [description]
 *
 * @return next - parse body to req.params
 */
function paramParser(req, res, next) {
  let isPost = req.route.methods.post;
  let method = req.route.path;
  let salt = Config.requestSalt;
  let verb = isPost
    ? 'POST'
    : 'GET';
  let sign = verb + method;

  // generate sign
  if (isPost) {
    let body = req.body;
    if (isEmptyObject(body)) {
      throw Error(ErrorCode.LACK_PARAM, ErrorCode.LACK_PARAM_MSG);
    }

    // sort body
    let bodys = Object.getOwnPropertyNames(body);
    bodys = bodys.filter((item, index, arr) => (item !== 'sign'));
    bodys.sort((a, b) => (a > b));
    bodys.forEach((key, index, array) => {
      sign += (key + body[key])
    });

    // add sault
    sign += salt;
  }

  console.log('sign before sha1:' + sign);

  var sha1 = crypto.createHash('sha1');
  sha1.update(sign);
  sign = sha1.digest('hex').toLowerCase();

  console.log('sign:' + sign);

  // check sign
  if (req.body.sign !== sign) {
    throw Error(ErrorCode.SIGN_ERR, ErrorCode.SIGN_ERR_MSG);
  }else{
    next();
  }
}

export default paramParser;
