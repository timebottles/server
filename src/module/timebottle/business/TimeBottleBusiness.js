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
   * <p>
   * 1. 添加瓶子入时光瓶集合；
   * 2. 将瓶子信息添加入用户的瓶子与创建的瓶子中。
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
    let bottleObject = bottle.simpleOjbect();

    // 保存瓶子完后，将瓶子保存到用户的信息中。
    return bottle.save()
                 .then( ()=> {
                   // 创建瓶子成功后，把瓶子添加到用户创建与所有的瓶子队列中。
                   user.user_create_bottles.addToSet([bottleObject]);
                   user.user_bottles.addToSet([bottleObject]);
                   return user.save();
                 })
                 .then( ()=>bottleObject );
  }
}
