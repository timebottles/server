import mongoose from 'mongoose';
import {autoIncrement} from 'app/base/db/DBConnection';
let Schema = mongoose.Schema;

// -----------------------------------------------
//         Schema 定义
// -----------------------------------------------
let UserSchema = new Schema({
  user_id: {type:Number , index:true}, // User的自定义id索引
  user_name: { type: String, required: false },
  user_psw: { type: String, required: false },
  user_gender: { type: Number, required: true, default: 0 },
  user_type: { type: Number, required: false },
  user_status: { type: Number, required: true, default: 0 },
  user_avator: { type: String, required: false },
  user_token: { type: String, required: false },
  user_openid: { type: String, required: false },
  user_expires: { type: Date, required: false },
  user_phone: { type: String, required: false, index:true },
  user_email: { type: String, required: false },
  user_bottles: { type: [], required: false },
  user_create_bottles: { type: [], required: false },
  // user_fragments: { type: String, required: false },
  register_time: { type: Date, required: false, default: Date.now() },
  is_new_user: { type: Boolean, required: false , default: true},
});

// --------------------
//         静态方法
// --------------------


// --------------------
//         实例方法
// --------------------


/**
 * 返回用户的简单数据模型(用于当作文档内部对象)。
 * @method simpleOjbect
 * @return {object}     用户的简单数据模型，包含一个用户的基本信息。
 */
UserSchema.methods.simpleOjbect = function () {
  return {
    uid:this.user_id,
    user_name:this.user_name,
    user_gender:this.user_gender,
    user_avator:this.user_avator,
    bottle_cover_url:this.bottle_cover_url,
  };
}

/**
 * 验证帐密登录
 * @method isPswVerified
 * @return {Boolean}     返回登录结果
 */
UserSchema.methods.isPswVerified = function(psw){
  return this.user_psw === psw;
};

// -----------------------------------------------
//         Model 定义
// -----------------------------------------------
// compile to model
let User = mongoose.model("User", UserSchema);
// ---------------------
//         Model 常量
// ----------------------
// 女
User.GENDER_MALE = 1;
// 男
User.GENDER_FEMALE = 0;

// QQ 用户
User.TYPE_QQ = 0;
// 微信用户
User.TYPE_WEIXIN = 1;
// 系统用户
User.TYPE_SYSTEM = 2;

// 正常状态
User.STATUS_NORMAL = 0;
// 禁止用户
User.STATUS_FORMIT = 1;

// -----------------------------------------------
//         Schema 选项
// -----------------------------------------------
UserSchema.set('toJSON', { virtuals: true })
UserSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  field: 'user_id',
  startAt: 1,
  incrementBy: 1
});

//导出 User Model
export default User;
