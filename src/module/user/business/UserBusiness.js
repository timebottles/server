/**
 *    userBusiness.js
 *    Created by luochenxun on 16/10/01.
 *    Copyright © 2016年 timebottles. All rights reserved.
 *
 *  Brief:
 *
 *  用户模块业务类
 *
 *
 *  Usage :
 *
 */
import {Error, ErrorCode} from 'app/base/monitor';
import ReturnJson from 'app/base/network/ReturnJson';
import UserModel from 'app/model/UserModel';

// 用户模块业务类
export default class userBusiness {

  /**
   * 列出当前系统的所有用户
   * @return {Promise} Promise->(users)
   */
  static listUser() {
    return UserModel.find().exec();
  }

  /**
   * 帐密登录
   *
   * @method loginWithAccountAndPsw
   *
   * @param  {string}               account
   * @param  {string}               psw
   *
   * @return {object(userInfo)}    登录成功返回UserInfo，失败返回 null
   */
  static loginWithAccountAndPsw(account, psw) {
    let userInfo = UserModel.getUserInfoByAccount(account);
    if (userInfo != null && userInfo.psw === psw) {
      return userInfo;
    }
    return null;
  }

  /**
   * 注册
   * @return {Promise} Promise->(user document)
   */
  static registerUser(phone, psw, vcode) {
    if (!phone || !psw || !vcode) {
      throw Error(1001, 'lack of param');
    }

    // 手机号检查
    let reg = /^1[34578]\d{9}$/;
    if (!reg.test(phone)) {
      throw Error(3201, 'phone err');
    }

    // psw输入检查
    if (psw.length < 6) {
      throw Error(3202, 'psw err');
    }

    // vcode
    if (vcode.length != 6) {
      throw Error(3200, 'vcode err');
    }

    return UserModel.findOne({user_phone: phone}).exec().then((user) => {
      if (user)
        throw Error(3001, 'user exist');

      var newUser = new UserModel({user_psw: psw, user_type: UserModel.TYPE_SYSTEM, user_phone: phone});
      return newUser.save();
    });
  }
}
