/**
 *    TimeBottleBusiness.js
 *    Created by luochenxun on 16/10/01.
 *    Copyright © 2016年 timebottles. All rights reserved.
 *
 *  Brief:
 *
 *  瓶子模块业务类
 *
 *
 *  Usage :
 *
 */
import {Error, ErrorCode, ReturnJson} from 'app/base/network';
import TimebottleModel from 'app/model/TimebottleModel';

// 瓶子模块业务类
export default class TimeBottleBusiness {

  /**
   * 创建瓶子
   * @method createBottle
   *
   * @param  {object}     user       用户对象
   * @param  {String}     bottleName 瓶子名字
   * @param  {Number}     bottleType 瓶子类型
   * @param  {String}     bottleDes  瓶子描述
   *
   * @return {Promise} Promise->(bottle) 成功返回瓶子信息
   */
  static createBottle(user , bottle){
    bottle.bottle_creator = user;
    bottle.bottle_managers = user;
    bottle.bottle_members = user;

    return bottle.save();
  }
}
