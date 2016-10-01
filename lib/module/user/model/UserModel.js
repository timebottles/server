'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UserInfo = require('./UserInfo');

var _UserInfo2 = _interopRequireDefault(_UserInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 用户模型类， 用于从网络或数据库获取用户数据
class UserModel {
  /**
   * 根据给定的帐号获得用户信息
   *
   * @method getUserInfoByAccount
   *
   * @param  {string}             account 用户帐号
   *
   * @return {object(UserInfo)}   用户信息对象(没有找到则返回 null)
   */
  static getUserInfoByAccount(account) {
    if (account !== '13812345678') {
      return null;
    }

    let user = new _UserInfo2.default();
    user.uid = 1;
    user.account = '13812345678';
    user.name = 'flex';
    user.psw = '123456';
    user.phone = '13812345678';
    user.gender = _UserInfo2.default.GENDER_MALE;
    user.userType = _UserInfo2.default.USER_TYPE_NORMAL;
    user.userStatus = _UserInfo2.default.USER_STATUS_NORMAL;
    user.avator = 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png';
    user.largeAvator = 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png';
    user.accessToken = 'token';
    user.openId = 'openId';
    user.expires = '1475291062';
    user.bottles = new Array();
    user.fragments = new Array();
    user.isNewUser = 0;
    return user;
  }
}exports.default = UserModel; /**
                               *    UserModel.js
                               *    Created by luochenxun on 16/10/01.
                               *    Copyright © 2016年 timebottles. All rights reserved.
                               *
                               *  Brief:
                               *
                               *  用户模型类， 用于从网络或数据库获取用户数据
                               *
                               *  Usage :
                               *
                               */

;