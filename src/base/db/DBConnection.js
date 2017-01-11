import config from 'app/core/config';
import mongoose from 'mongoose';
//自增ID 模块
import autoIncrement from 'mongoose-auto-increment';


var db = null;

function connect() {
  // 连接数据库
  console.log('DBHelper connect');
  mongoose.connect(config.dbConfig.address);
  mongoose.Promise = global.Promise;
  db = mongoose.connection;

  // 初始化数据库插件
  autoIncrement.initialize(db);   //初始化自增插件

  return db;
}

// 连接数据库
console.log('init DBHelper');
var db = connect();

export default db;
export {db, autoIncrement};
