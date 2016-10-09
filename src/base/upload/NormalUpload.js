/**
 *    NormalUpload.js
 *    Created by luochenxun on 16/09/30.
 *    Copyright © 2016年 timebottles. All rights reserved.
 *
 *  Brief:
 *
 *  普通上传，限制上传大小为 2MB
 *  将上传文件保存在 /uploads/normal 目录中，并以当前时间戳重命名
 *
 *
 *  Usage :
 *
 */
var multer = require('multer');

// 将上传文件保存在 /uploads 目录中，并以当前时间戳重命名
var storage = multer.diskStorage({
  //设置上传后文件路径，uploads文件夹会自动创建。
  destination: function(req, file, cb) {
    cb(null, './public');
  },
  //给上传文件重命名，获取添加后缀名
  filename: function(req, file, cb) {
    var fileFormat = (file.originalname).split('.');
    cb(null,
      file.fieldname +
      '-' +
      Date.now() +
      '.' +
      fileFormat[fileFormat.length - 1]
    );
  },
});

//添加配置文件到muler对象。
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
    // 2MB
    files: 5,
  }
});

//导出对象
module.exports = upload;
