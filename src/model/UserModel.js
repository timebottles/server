import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let UserSchema = new Schema({
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
  // user_bottles: { type: String, required: false },
  // user_fragments: { type: String, required: false },
  register_time: { type: Date, required: false, default: Date.now() },
  is_new_user: { type: Boolean, required: false , default: true},
});

// uid is a virtual
UserSchema.virtual('user_id').get(function () {
  return this._id + 1480148245;
});

UserSchema.methods.isPswVerified = function(psw){
  return this.user_psw === psw;
};

UserSchema.set('toJSON', { virtuals: true })

// compile to model
let User = mongoose.model("User", UserSchema);

/** 常量 **/
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

//导出 User Model
export default User;
