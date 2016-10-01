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
import UserModel from '../model/UserModel';
import UserInfo from '../model/UserInfo';
import {Error, ErrorCode} from '../../../base/monitor'

// 用户模块业务类
export default class userBusiness{

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
  static loginWithAccountAndPsw(account , psw){
    let userInfo = UserModel.getUserInfoByAccount(account);
    if(userInfo != null && userInfo.psw === psw){
      return userInfo;
    }
    return null;
  }
}
