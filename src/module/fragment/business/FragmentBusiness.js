/**
 *    FragmentBusiness.js
 *    Created by luochenxun on 16/10/01.
 *    Copyright © 2016年 timebottles. All rights reserved.
 *
 *  Brief:
 *
 *  时光碎片模块业务类
 *
 *
 *  Usage :
 *
 */
import {Error, ErrorCode, ReturnJson} from 'app/base/network';
import TimebottleModel from 'app/model/TimebottleModel';
import FragmentModel from 'app/model/FragmentModel';
import UserModel from 'app/model/UserModel';

// 时光碎片模块业务类
export default class FragmentBusiness {

  /**
   * 上传一个时光碎片
   * @method createFragment
   *
   * @param  {UserModel}           user
   * @param  {FragmentModel}       fragment
   *
   * @return {Promise}      Promise->(fragment)
   */
  static createFragment(user, fragment, bid) {
    let bottle = null;
    return TimebottleModel.findById(bid || user.default_bottle )
                          .then((bottleDoc) => {
                            if(!bottleDoc){
                              throw new Error(5103, 'bottle not found');
                            }
                            bottle = bottleDoc;
                            fragment.bottle = bottleDoc;
                            return fragment.save();
                          })
                          .then((fragmentDoc)=>{
                            fragment = fragmentDoc;
                            return bottle.addFragment(fragmentDoc);
                          })
                          .then(()=>fragment);
  }

  /**
   * 列出瓶子里的时光碎片
   *
   * @return {Promise}      Promise->([fragmentModel])
   */
  static listFragment(bid){
    return TimebottleModel.findById(bid)
                          .then((bottleDoc)=>{
                            if(!bottleDoc){
                              throw new Error(5103, 'bottle not found');
                            }
                            return FragmentModel.findFragmentsByIdArray(bottleDoc.fragments);
                          });
  }


}
