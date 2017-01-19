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
import {Error, ErrorCode, ReturnJson} from 'app/base/network';
import UserModel from 'app/model/UserModel';
import TimebottleModel from 'app/model/TimebottleModel';
import TimeBottleBusiness from 'app/module/timebottle/business/TimeBottleBusiness';

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
   * 注册
   * @return {Promise} Promise->(userModel)
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

    return UserModel.findOne({phone: phone}).exec().then((user) => {
      if (user)
        throw Error(3001, 'user exist');

      var newUser = new UserModel({
        account: phone,
        psw: psw,
        user_type: UserModel.TYPE_SYSTEM,
        phone: phone,
      });
      return newUser.save()
                    .then((userDoc)=>{
                      newUser = userDoc;
                      let default_bottle = new TimebottleModel({
                            name      : 'default',
                            type      : TimebottleModel.TYPE_PUBLIC,
                            des       : 'default',
                            cover_url : '',
                          });
                      return TimeBottleBusiness.createBottle(userDoc, default_bottle, true);
                    })
                    .then(()=>newUser);
    });
  }
}
