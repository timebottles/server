'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ErrorCode = require('../monitor/ErrorCode');

var _ErrorCode2 = _interopRequireDefault(_ErrorCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ReturnJson {
  /**
   * 构造函数
   *
   * @method constructor
   *
   * @param  {Object}    data 返回数据，封装在一个对象中
   * @param  {number}    code 返回码
   * @param  {string}    msg  返回信息
   */
  constructor(data, code = _ErrorCode2.default.SUCCESS, msg = _ErrorCode2.default.SUCCESS_MSG) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }

  /**
   * 返回Json数据
   *
   * @method json
   *
   * @return {json object} 以Json对象格式返回
   */
  json() {
    if (!this.data && this.data.length != 0) {
      return {
        code: this.code,
        msg: this.msg,
        data: this.data
      };
    } else {
      return {
        code: this.code,
        msg: this.msg
      };
    }
  }
}
exports.default = ReturnJson; /**
                               *    ReturnJson.js
                               *    Created by luochenxun on 16/09/30.
                               *    Copyright © 2016年 timebottles. All rights reserved.
                               *
                               *  Brief:
                               *
                               *  封装返回的Json格式
                               *
                               *
                               *  Usage :
                               *
                               *  let re = new ReturnJson({..},ErrorCode.SUCCESS,ErrorCode.SUCCESS_MSG);
                               *  let re = new ReturnJson({..}); // success 可以隐藏code & msg
                               *  res.json(re.json());
                               */