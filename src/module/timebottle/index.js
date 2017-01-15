/**
 *    TimebottleController.js
 *    Created by luochenxun on 16/09/30.
 *    Copyright © 2016年 timebottles. All rights reserved.
 *
 *  Brief:
 *
 *  时光瓶模块(主接口)
 *
 *  Usage :
 */

import crypto from 'crypto';
import passport from 'passport';
// tools
import TimeBottleBusiness from './business/TimeBottleBusiness';
import TimebottleModel from 'app/model/TimebottleModel';
import {Error, ErrorCode, ReturnJson} from 'app/base/network';

class TimebottleController {

  /**
   * 创建时光瓶
   * @method createBottle
   */
  static createBottle(req , res , next){
    // param check
    let bottleType = req.body.type;
    let bottleName = req.body.name;
    let bottleDes  = req.body.des;
    if(!bottleName){
      throw Error(1001, 'db err');
    }

    let timebottle = new TimebottleModel({
      bottle_name : bottleName,
      bottle_type : bottleType || 0,
      bottle_des  : bottleDes || '',
    });
    TimeBottleBusiness.createBottle(req.user , timebottle)
                      .then((reBottle)=>{
                        res.json(new ReturnJson({bid:reBottle.bottle_id}));
                      })
                      .catch((err)=>{
                        next(Error(1001, 'create bottle error'));
                      });
  }

  /**
   * 列出一个用户的时光瓶
   * @method listBottles
   */
  static listBottles(req , res , next){
    let user = req.user;
    if(!user){
      throw Error(1001, 'user err');
    }

    res.json(new ReturnJson(user.user_bottles));
  }

};

export default TimebottleController;
