import mongoose from 'mongoose';
let Schema = mongoose.Schema;

// -----------------------------------------------
//         Schema 定义
// -----------------------------------------------
let FragmentSchema = new Schema({
  url           : { type: String, required: true },
  fragment_type : { type: Number, required: true,default: 0},       // 瓶子类型
  creator       : { type: Schema.Types.ObjectId, required : true},  // 创建者
  bottle        : { type: Schema.Types.ObjectId, required: true },
  name          : { type: String, required: false },                // 时光碎片名
  des           : { type: String, required: false },                // 时光碎片名描述
  create_time   : { type: Date, required: false },                  // 时光的创建时间（如：照片的拍摄时间）
  latitude      : { type: String, required: false },                // 纬度
  longitude     : { type: String, required: false },                // 经度
  local_id      : { type : String , required: false},               // 本地标识
},
  // Schema Option
  { timestamps: { createdAt: 'upload_time', updatedAt:'update_time' } }
);

// --------------------
//         静态方法
// --------------------

FragmentSchema.statics.findFragmentsByIdArray = function(idArray) {
  return this.find({_id : {$in: idArray}}).exec();
}

// --------------------
//         实例方法
// --------------------

/**
 * 返回一个瓶子的简单数据模型(用于当作文档内部对象)。
 * @method simpleObject
 * @return {object}     瓶子的简单数据模型，包含一个瓶子的基本信息。
 */
FragmentSchema.methods.simpleObject = function () {
  return {
    fid           : this._id,
    name          : this.name,                 //
    des           : this.des,
    fragment_type : this.fragment_type,        // 相册类型
    url           : this.url,                  // 资源地址
    uid           : this.creator ,             // 相册创建者
    bid           : this.bottle,
    create_time   : this.create_time,          // 创建时间
    upload_time   : this.upload_time,
    update_time   : this.update_time,
    latitude      : this.latitude,             // 纬度
    longitude     : this.longitude,            // 经度
    local_id      : this.local_id ,            // 本地标识
  };
}

// -----------------------------------------------
//         Model 定义
// -----------------------------------------------
// compile to model
var Fragment = mongoose.model("Fragment", FragmentSchema);
// ---------------------
//         Model 常量
// ----------------------
// 时光碎片类型-图片
Fragment.TYPE_PHOTO = 0;
// 时光碎片类型-音频
Fragment.TYPE_VIOCE = 1;
// 时光碎片类型-视频
Fragment.TYPE_VEDIO = 2;

// -----------------------------------------------
//         Schema 选项
// -----------------------------------------------

//导出 User Model
export default Fragment;
