import mongoose from 'mongoose';
let Schema = mongoose.Schema;
import UserModel from 'app/model/UserModel';

// -----------------------------------------------
//         Schema 定义
// -----------------------------------------------
let TimebottleSchema = new Schema({
  name      : { type: String, required: true },
  type      : { type: Number, required: true,
                default:0 ,enum : [0, 1] },            // 瓶子类型
  creator   : { type: Schema.Types.ObjectId,
                required : true},                      // 创建者
  des       : { type: String, required: false },
  cover_url : { type: String, required: false },
  members   : { type: [Schema.Types.ObjectId], required: false },
  managers  : { type: [Schema.Types.ObjectId], required: false },
  fragments : { type: [Schema.Types.ObjectId], required: false },
  photo_num : { type: Number, required:false , default:0 },
},
  // Schema Option
  { timestamps: { createdAt: 'create_time', updatedAt:'update_time' } }
);

// --------------------
//         静态方法
// --------------------

TimebottleSchema.statics.findBottlesByIdArray = function(idArray) {
  return this.find({_id : {$in: idArray}}).exec();
}

// --------------------
//         实例方法
// --------------------

/**
 * 返回一个瓶子的简单数据模型(包含创建者信息)。
 * @method simpleOjbect
 * @return {Promise}     Promise-> 瓶子的简单数据模型，包含一个瓶子的基本信息。
 */
TimebottleSchema.methods.objectWithCreator = function () {
  return UserModel.findById(this.creator)
                  .then((creator)=>{
                    return {
                      bid         : this._id,
                      name        : this.name,                  // 相册名
                      type        : this.type,                  // 相册类型
                      des         : this.des,                   // 描述
                      creator     : creator.simpleOjbect() ,    // 相册创建者
                      cover_url   : this.cover_url,
                      create_time : this.create_time,           // 创建时间
                      update_time : this.update_time,           // 最新修改时间
                      photo_num   : this.photo_num,             // 照片数
                    };
                  })
                  .catch((err)=>new Error('creator not found'));
}

/**
 * 返回一个瓶子的简单数据模型(用于当作文档内部对象)。
 * @method simpleOjbect
 * @return {object}     瓶子的简单数据模型，包含一个瓶子的基本信息。
 */
TimebottleSchema.methods.simpleObject = function() {
  return {
    bid         : this._id,
    name        : this.name,              // 相册名
    type        : this.type,              // 相册类型
    des         : this.des,               // 描述
    cover_url   : this.cover_url,
    create_time : this.create_time,       // 创建时间
    update_time : this.update_time,       // 最新修改时间
    photo_num   : this.photo_num,         // 照片数
  };
}

/**
 * 添加一个时光碎片
 * @method addFragment
 * @param {Object} Fragment
 * @return {Promise}     Promise->(fragment)
 */
TimebottleSchema.methods.addFragment = function (fragment) {
  // param check
  if(!fragment){
    return Promise.reject('fragment can not be null');
  }

  this.fragments.addToSet(fragment);
  this.photo_num += 1;
  return this.save();
}

// -----------------------------------------------
//         Model 定义
// -----------------------------------------------
// compile to model
var Timebottle  = mongoose.model("Timebottle", TimebottleSchema);
// ---------------------
//         Model 常量
// ----------------------
// 公开瓶子
Timebottle.TYPE_PUBLIC  = 0;
// 私密瓶子
Timebottle.TYPE_PRIVATE = 1;


// -----------------------------------------------
//         Schema 选项
// -----------------------------------------------
TimebottleSchema.set('toJSON', { virtuals: true })

//导出 User Model
export default Timebottle;
