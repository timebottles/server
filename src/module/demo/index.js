/**
 *    index.js(demo)
 *    Created by luochenxun on 16/09/30.
 *    Copyright © 2016年 timebottles. All rights reserved.
 *
 *  Brief:
 *
 *  demo模块，用于调试代码(主接口)
 *
 *
 *  Usage :
 *
 */

import crypto from 'crypto';
import passport from 'passport';
// tools
import {Error, ErrorCode, ReturnJson} from 'app/base/network';

import DBDemo from './DBDemo';

class DemoController {

  /** 通用test处 */
  static test(req, res, next) {
    // res.json(new ReturnJson({test:'hello'}));
    // next(Error(1001, 'unknown err'));
  }

  static dbDemo(req , res , next){
    DBDemo
  }

};

export default DemoController;
