/**
 *    UserInfo.js
 *    Created by luochenxun on 16/10/01.
 *    Copyright © 2016年 timebottles. All rights reserved.
 *
 *  Brief:
 *
 *  用户信息类
 *
 *
 *  Usage :
 *
 */
export default class UserInfo{

  constructor(){
    /** @type {number} 用户ID */
    this.uid = 0;
    /** @type {string} 用户帐号 */
    this.account = '';
    /** @type {string} 用户密码 */
    this.psw = '';
    /** @type {number} 用户名 */
    this.name = '';
    /** @type {string} 用户绑定的手机 */
    this.phone = '';
    /** @type {number} 姓别 */
    this.gender = UserInfo.GENDER_FEMALE;
    /** @type {number} 用户类型 */
    this.userType = UserInfo.USER_TYPE_NORMAL;
    /** @type {number} 用户状态 */
    this.userStatus = UserInfo.USER_STATUS_NORMAL;
    /** @type {string} 用户头像 */
    this.avator = '';
    /** @type {string} 用户大头像 */
    this.largeAvator = '';

    /** @type {string} 用户token */
    this.accessToken = '';
    /** @type {string} 用户openId */
    this.openId = '';
    /** @type {string} 用户token过期时间 */
    this.expires = '';

    /** @type {[]} 用户的瓶子 */
    this.bottles = new Array();
    /** @type {[]} 用户上传过的时光碎片（图片、视频等） */
    this.fragments = new Array();

    /** @type {number} 是否为新用户（1为新用户、0为老用户） */
    this.isNewUser = 0;
  }
}

// ------ 常量 -----
/** 用户姓别（女） */
UserInfo.GENDER_FEMALE = 0;
/** 用户姓别（男） */
UserInfo.GENDER_MALE = 1;

/** @type {Number} 用户类型（普通用户） */
UserInfo.USER_TYPE_NORMAL = 1;
/** @type {Number} 用户类型（QQ用户） */
UserInfo.USER_TYPE_QQ = 2;
/** @type {Number} 用户类型（微信用户） */
UserInfo.USER_TYPE_WX = 3;
/** @type {Number} 用户类型（微博用户） */
UserInfo.USER_TYPE_WB = 4;

/** @type {Number} 用户状态（正常） */
UserInfo.USER_STATUS_NORMAL = 1;
/** @type {Number} 用户状态（锁定） */
UserInfo.USER_STATUS_FORBIT = 2;
