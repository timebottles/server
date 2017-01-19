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
   * @param  {UserModel}           user       用户对象
   * @param  {TimebottleModel}     bottleName 瓶子名字
   * @param  {Boolean}             [isDefault=false]  是否是用户的默认瓶子
   *
   * @return {Promise} Promise->(bottleModel) 成功返回瓶子信息
   */
  static createBottle(user , bottle, isDefault = false){
    // 添加创建者对象
    bottle.creator = user;
    bottle.managers.addToSet(user);
    bottle.members.addToSet(user);
    // 保存瓶子完后，将瓶子保存到用户的信息中。
    return bottle.save()
                 .then( (bottleDoc)=> {
                   bottle = bottleDoc;
                   // 创建瓶子成功后，把瓶子添加到用户创建与所有的瓶子队列中。
                   user.create_bottles.addToSet(bottleDoc);
                   user.bottles.addToSet(bottleDoc);
                   isDefault && (user.default_bottle = bottleDoc);
                   return user.save();
                 })
                 .then( ()=>bottle );
  }

  /**
   * 返回用户的瓶子列表
   * @method listBottlesByUser
   *
   * @param  {UserModel}           user       用户对象
   *
   * @return {Promise} Promise->([bottleSimpleObject]) 成功返回瓶子信息
   */
  static listBottlesByUser(user){
    return TimebottleModel.findBottlesByIdArray(user.bottles);
  }
}
