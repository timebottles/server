/**
 *    Error.js (Monitor)
 *    Created by luochenxun on 16/09/30.
 *    Copyright © 2016年 timebottles. All rights reserved.
 *
 *  Brief:
 *
 *  错误对象生成方法
 *
 *  usage :
 *
 *  import error from '....'
 *  error(code,msg);
 */

export default function(code , msg){
  let err = new Error(msg);
  err.errCode = code;
  return err;
}
