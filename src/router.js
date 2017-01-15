/**
 *    router.js
 *    Created by luochenxun on 16/09/30.
 *    Copyright © 2016年 timebottles. All rights reserved.
 *
 *  Brief:
 *
 *  路由处理
 *
 *  Usage :
 *
 *  传入 express 实例，对之进行路由处理
 *
 */

// tools
import ReturnJson from 'app/base/network/ReturnJson';
import NormalUploadParse from 'app/base/upload/NormalUpload';
import paramParser from 'app/core/middleware/ParamParser';
import passport from 'passport';
// modules
import common from './module/common';
import user from './module/user';
import piece from './module/piece';
import demo from './module/demo';
import bottle from './module/timebottle';

// 路由处理
export default function router(app) {
  // -------------------------
  // Index
  // -------------------------
  app.get('/', (req, res) => {
    res.type('text/plain');
    res.send('欢迎来到时光瓶');
  });

  // -------------------------
  // Common 一般功能模块
  // -------------------------
  app.post('/common/get_smscode', paramParser, common.getVerifyCode);


  // -------------------------
  // 登录模块
  // -------------------------
  // 罗列所有系统用户
  app.use('/user/list', user.checkLogin , user.listUser);
  // 登录
  app.post('/user/login', paramParser, user.loginPassport(), user.passLogin);
  app.post('/logout', user.logout);
  // 注册新用户
  app.post('/user/register', paramParser, user.register);

  // -------------------------
  // Timebottle(时光瓶)模块
  // -------------------------
  app.post('/bottle/create' , user.checkLogin , paramParser , bottle.createBottle);
  app.post('/bottle/list' , user.checkLogin , paramParser , bottle.listBottles);

  // -------------------------
  // Piece（时光碎片相关）
  // -------------------------
  // upload
  app.post('/piece/upload', NormalUploadParse.single('piece'), piece.uploadPiece);

  // -------------------------
  // Demo（调试相关）
  // -------------------------
  // 数据库测试
  app.post('/demo/db', demo.dbDemo);

  // -------------------------
  // Error Process
  // -------------------------

  // 定制404页面
  app.use( (req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('原谅我，我在时光机中迷了路');
  });

  // 500 or uncatch err
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);
    if(err.errCode === undefined || err.errCode === null || err.length == 0){
      res.json(new ReturnJson('',1001,'system err'));
    }else{
      res.json(new ReturnJson('',err.errCode, err.message).json());
    }
  });
};
