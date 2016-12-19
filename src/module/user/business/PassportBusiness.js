/**
 *    index.js of passport module
 *    Created by luochenxun on 16/10/01.
 *    Copyright © 2016年 timebottles. All rights reserved.
 *
 *  Brief:
 *
 *  有关 passport module 的配置、初始化等工作
 *
 *
 *  Usage :
 *
 */

import passport from 'passport';
import {Strategy} from 'passport-local';
import UserModel from 'app/model/UserModel';

class PassportBusiness {

  /** 初始化 passport 认证中心 */
  static initPassport() {
    console.log('init passport success!');

    passport.serializeUser(function(user, done) {
      done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
      UserModel.findById(id, function(err, user) {
        done(err, user);
      });
    });

    passport.use('login', new Strategy({
      usernameField: 'phone',
      passwordField: 'password'
    }, (phone, password, done) => {
      UserModel.findOne({
        user_phone: phone
      }, function(err, user) {
        if (err) {
          return done(err);
        }

        console.log(user);

        if (!user) {
          return done(null, false, {message: 'Incorrect username.'});
        }
        if (!user.isPswVerified(password)) {
          return done(null, false, {message: 'Incorrect password.'});
        }

        return done(null, user);
      });
    }));
  }

}


export default PassportBusiness;
