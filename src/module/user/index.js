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

import crypto from 'crypto';
import UserBusiness from './business/UserBusiness'
import {Error, ErrorCode} from 'app/base/monitor'
import ReturnJson from 'app/base/network/ReturnJson'

function isEmptyObject(e) {
   var t;
   for (t in e)
       return !1;
   return !0
}

export default class UserController {


  // 登录 rest
  static login(req, res) {
    let isPost = req.route.methods.post;
    let method = req.route.path;
    let salt = '7asdf98z2p9bi23klo94nb186as2lklkj88s';
    let verb = isPost ? 'POST':'GET';
    let sign = verb + method;

    // generate sign
    if(isPost){
      let body = req.body;
      if(isEmptyObject(body)){
        throw Error(ErrorCode.LACK_PARAM, ErrorCode.LACK_PARAM_MSG);
      }

      // sort body
      let bodys = Object.getOwnPropertyNames(body);
      bodys = bodys.filter((item,index,arr)=>(item !== 'sign'));
      bodys.sort( (a,b) => (a > b) );
      bodys.forEach((key,index,array)=>{
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
    if(req.body.sign !== sign){
      throw Error(ErrorCode.SIGN_ERR, ErrorCode.SIGN_ERR_MSG);
    }

    // login
    let userInfo = UserBusiness.loginWithAccountAndPsw(req.body.user_account,req.body.user_psw);
    if(!userInfo){
      throw Error(2001, 'user invalid')
    }else {
      delete userInfo.psw;
      res.json(new ReturnJson(userInfo));
    }
  }
};
