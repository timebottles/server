import mongoose from 'mongoose';
import {autoIncrement} from 'app/base/db/DBConnection';
let Schema = mongoose.Schema;

// -----------------------------------------------
//         Schema 定义
// -----------------------------------------------
let TimebottleSchema = new Schema({
  bid       : { type: Number , index:true},
  name      : { type: String, required: true },
  type      : { type: Number, required: true,
                default:0 ,enum : [0, 1] },            // 瓶子类型
  creator   : { type: Schema.Types.Mixed,
                required : true},                      // 创建者
  des       : { type: String, required: false },
  cover_url : { type: String, required: false },
  members   : { type: [], required: false },
  managers  : { type: [], required: false },
  fragments : { type: [], required: false },
  photo_num : {type:Number, required:false , default:0},
},
  // Schema Option
  { timestamps: { createdAt: 'create_time', updatedAt:'update_time' } }
);

// --------------------
//         静态方法
// --------------------

// --------------------
//         实例方法
// --------------------

/**
 * 返回一个瓶子的简单数据模型(用于当作文档内部对象)。
 * @method simpleOjbect
 * @return {object}     瓶子的简单数据模型，包含一个瓶子的基本信息。
 */
TimebottleSchema.methods.simpleOjbect = function () {
  return {
    bid         : this.bid,
    name        : this.name,        // 相册名
    type        : this.type,        // 相册类型
    des         : this.des,         // 描述
    creator     : this.creator ,    // 相册创建者
    cover_url   : this.cover_url,
    create_time : this.create_time, // 创建时间
    update_time : this.update_time, // 最新修改时间
    photo_num   : this.photo_num, // 照片数
  };
}

// -----------------------------------------------
//         Model 定义
// -----------------------------------------------
// compile to model
var Timebottle = mongoose.model("Timebottle", TimebottleSchema);
// ---------------------
//         Model 常量
// ----------------------
// 公开瓶子
Timebottle.TYPE_PUBLIC = 1;
// 私密瓶子
Timebottle.TYPE_PRIVATE = 0;


// -----------------------------------------------
//         Schema 选项
// -----------------------------------------------
TimebottleSchema.set('toJSON', { virtuals: true })
TimebottleSchema.plugin(autoIncrement.plugin, {
  model: 'Timebottle',
  field: 'bid',
  startAt: 1,
  incrementBy: 1
});

//导出 User Model
export default Timebottle;
