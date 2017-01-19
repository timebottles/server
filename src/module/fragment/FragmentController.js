/**
 *    FragmentController
 *    Created by luochenxun on 16/10/09.
 *    Copyright © 2016年 timebottles. All rights reserved.
 *
 *  Brief:
 *
 *  时光碎片模块(主接口)
 *
 *
 *  Usage :
 *
 */

import crypto from 'crypto';
import {Error, ErrorCode, ReturnJson} from 'app/base/network';
import config from 'app/core/config';
import FragmentModel from 'app/model/FragmentModel';
import FragmentBusiness from './business/FragmentBusiness';


class FragmentController {

  // 上传时光碎片
  static uploadFragment(req, res, next) {
    // parse param
    let fragment_type = req.body.fragment_type,
        name = req.body.name,
        des = req.body.des,
        bid = req.body.bid,
        create_time = req.body.create_time,
        latitude = req.body.latitude,
        longitude = req.body.longitude,
        local_id = req.body.local_id;
    let user = req.user;
    let photoUrl = config.PHOTO_HOST + config.PHOTO_REPO + req.file.filename;
    if(!fragment_type){
      throw Error(1001, 'lack param');
    }

    // create fragment instance
    let fragment = new FragmentModel({
      url: photoUrl,
      fragment_type : fragment_type,
      creator : user,
      name : name || '',
      des : des || '',
      create_time : create_time,
      latitude : latitude,
      longitude :longitude,
      local_id : local_id,
    });

    FragmentBusiness.createFragment(user,fragment,bid)
                    .then((fragment)=>res.json(new ReturnJson({
                      fid:fragment._id,
                      url:fragment.url
                    })))
                    .catch((err)=>next(new Error(err.errorCode || 5101,
                                                 err.message   || 'create fragment error')));
  }

  /**
   * 列出瓶子里的时光碎片
   */
  static listFragment(req , res , next){
    let bid = req.body.bid;
    if(!bid){
      throw Error(1001, 'lack param');
    }
    FragmentBusiness.listFragment(bid)
                    .then((fragments)=>{
                      if(!fragments){
                        return [];
                      }
                      return fragments.map((element)=>element.simpleObject());
                    })
                    .then((fragmentObjs)=>res.json(new ReturnJson({fragments:fragmentObjs})))
                    .catch((err)=>next(new Error(err.errCode || 1001,
                                                 err.message || 'system err')));
  }

};


export default FragmentController;
