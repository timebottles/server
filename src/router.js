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

import user from './module/user';
import piece from './module/piece'
import ReturnJson from 'app/base/network/ReturnJson'
import NormalUploadParse from 'app/base/upload/NormalUpload';

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
  // User（用户相关）
  // -------------------------
  // login
  app.post('/user/login', user.login);

  // -------------------------
  // Piece（时光碎片相关）
  // -------------------------
  // upload
  app.post('/piece/upload', NormalUploadParse.single('piece'), piece.uploadPiece);


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
    console.log('errCode:' + err.errCode + ',errorMsg :' + err.message);
    console.log('err: ' + JSON.stringify(err));
    if(err.errCode === undefined || err.errCode === null || err.length == 0){
      console.log(err.stack);
    }
    res.json(new ReturnJson('',err.errCode, err.message).json());
  });
};
