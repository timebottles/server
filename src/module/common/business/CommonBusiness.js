/**
*  @fileOverview 系统的一般性业务
*
*  @author luochenxun(luochenxun@gmail.com) , 2016-12-18 16:38.
*  @copyright © 2016年 Timebottles. All rights reserved.
*/

import {Error, ErrorCode} from 'app/base/monitor';
import ReturnJson from 'app/base/network/ReturnJson';

class CommonBusiness {

  /**
   * 请求验证码
   *
   * @param {string} phone 手机号
   * @param {number} cmd   需要请求验证码的功能
   * @return {boolean}  请求是否成功，true表示成功
   */
  static getVerifyCode( phone , cmd ){
    return true;
  }

}

export default CommonBusiness;
