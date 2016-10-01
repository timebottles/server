'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UserModel = require('../model/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

var _UserInfo = require('../model/UserInfo');

var _UserInfo2 = _interopRequireDefault(_UserInfo);

var _monitor = require('../../../base/monitor');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 用户模块业务类
class userBusiness {

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
    let userInfo = _UserModel2.default.getUserInfoByAccount(account);
    if (userInfo != null && userInfo.psw === psw) {
      return userInfo;
    }
    return null;
  }
}
exports.default = userBusiness; /**
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