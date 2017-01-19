import mongoose from 'mongoose';
let Schema = mongoose.Schema;

// -----------------------------------------------
//         Schema 定义
// -----------------------------------------------
let UserSchema = new Schema({
  account          : { type: String , index:true},                          // User的帐号
  name             : { type: String, required: false },
  psw              : { type: String, required: false },
  gender           : { type: Number, required: true, default: 0 },
  user_type        : { type: Number, required: false },
  user_status      : { type: Number, required: true, default: 0 },
  avator           : { type: String, required: false },
  large_avator     : { type: String, required: false },
  token            : { type: String, required: false },
  openid           : { type: String, required: false },
  expires          : { type: Date, required: false },
  phone            : { type: String, required: false, index:true },
  email            : { type: String, required: false },
  bottles          : { type: [Schema.Types.ObjectId], required: false },
  create_bottles   : { type: [Schema.Types.ObjectId], required: false },
  default_bottle   : { type: Schema.Types.ObjectId, required: false },  // 每个用户都有一个默认的瓶子
  register_time    : { type: Date, required: false, default: Date.now() },
  is_new_user      : { type: Boolean, required: false , default: true},
});

// --------------------
//         静态方法
// --------------------


// --------------------
//         实例方法
// --------------------

/**
 * 返回用户的详细数据模型。
 * @method simpleOjbect
 * @return {object}     详细数据模型。
 */
UserSchema.methods.specOjbect = function () {
  return {
    uid:this._id,
    account:this.account,
    name:this.name || '',
    gender:this.gender,
    user_type:this.user_type,
    user_status:this.user_status,
    avator:this.avator || '',
    large_avator:this.large_avator || '',
    token:this.token || '',
    expires:this.expires || '',
    phone:this.phone || '',
    email:this.email || '',
    register_time:this.register_time || '',
  };
}

/**
 * 返回用户的简单数据模型(用于当作文档内部对象)。
 * @method simpleOjbect
 * @return {object}     用户的简单数据模型，包含一个用户的基本信息。
 */
UserSchema.methods.simpleObject = function () {
  return {
    uid:this._id,
    account:this.account,
    name:this.name||'',
    gender:this.gender,
    avator:this.avator||'',
    large_avator:this.large_avator||'',
    register_time:this.register_time,
  };
}

/**
 * 验证帐密登录
 * @method isPswVerified
 * @return {Boolean}     返回登录结果
 */
UserSchema.methods.isPswVerified = function(psw){
  return this.psw === psw;
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

//导出 User Model
export default User;
