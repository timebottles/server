/**
 *  @fileOverview 系统的一般性业务处理器
 *
 *  @author luochenxun(luochenxun@gmail.com) , 2016-12-18 16:38.
 *  @copyright © 2016年 Timebottles. All rights reserved.
 */

import CommonBusiness from './business/CommonBusiness';
import {Error, ErrorCode, ReturnJson} from 'app/base/network';

class CommonController {

  /**
   * 请求验证码
   */
  static getVerifyCode(req, res) {
    if(CommonBusiness.getVerifyCode(req.body.phone, req.body.cmd)){
      res.json(new ReturnJson('suc'));
    }
  }

}

export default CommonController;
