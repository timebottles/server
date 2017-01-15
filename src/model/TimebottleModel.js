import mongoose from 'mongoose';
import {autoIncrement} from 'app/base/db/DBConnection';
let Schema = mongoose.Schema;

// -----------------------------------------------
//         Schema 定义
// -----------------------------------------------
let TimebottleSchema = new Schema({
  bottle_id :{type:Number , index:true},
  bottle_name      : { type: String, required: true },
  bottle_type      : { type: Number, required: true,
                       default:0 ,enum : [0, 1] },            // 瓶子类型
  bottle_creator   : { type: Schema.Types.Mixed,
                       required : true},                      // 创建者
  bottle_des       : { type: String, required: false },
  bottle_cover_url : { type: String, required: false },
  bottle_members   : { type: [], required: false },
  bottle_managers  : { type: [], required: false },
  bottle_fragments : { type: [], required: false },
},
  { timestamps: { createdAt: 'created_at', updatedAt:'updated_at' } }
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
    bottle_id:this.bottle_id,
    bottle_name:this.bottle_name,
    bottle_type:this.bottle_type,
    bottle_des:this.bottle_des,
    bottle_cover_url:this.bottle_cover_url,
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
TimebottleSchema.plugin(autoIncrement.plugin, {
  model: 'Timebottle',
  field: 'bottle_id',
  startAt: 1,
  incrementBy: 1
});

//导出 User Model
export default Timebottle;
