"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (code, msg) {
  let err = new Error(msg);
  err.errCode = code;
  return err;
};