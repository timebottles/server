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
import passport from 'passport';
// tools
import UserBusiness from './business/UserBusiness';
import {Error, ErrorCode, ReturnJson} from 'app/base/network';

class UserController {

  /** 列出当前系统的所有用户 */
  static listUser(req, res, next) {
    UserBusiness.listUser()
      .then((users) => res.json(new ReturnJson(users)))
      .catch((e) => next(Error(1001, 'db err')));
  }

  /** 登录授权服务 */
  static loginPassport() {
    return passport.authenticate('login');
  }

  /** 登录授权服务 */
  static passLogin(req, res) {
    res.json(new ReturnJson(req.user.specOjbect()));
  }

  /** 检查登录 */
  static checkLogin(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      throw Error(1001, 'do not login');
    }
  }

  static logout(req, res, next) {
    req.logout();
    res.json(new ReturnJson());
  }

  /**
   * 注册
   */
  static register(req, res, next) {
    UserBusiness.registerUser(req.body.phone, req.body.password, req.body.verifycode)
      .then((doc) => res.json(new ReturnJson({
        uid: doc.uid
      })))
      .catch((e) => next(e));
  }
};

export default UserController;
