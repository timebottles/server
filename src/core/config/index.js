/** 开发环境配置对象 */
const devConfig = {
  env : 'develop',

  /** 服务器端口 */
  port: 8083,

  /** @type {object} 数据库配置 */
  dbConfig: {
    address: 'mongodb://localhost:8878/timebottles',
    user: '',
    psw: ''
  },

  cookieConfig:{
    secret: 'test',
    maxAge: 60 * 60 * 24 * 7 * 365 , // 一年
  },

  /** 请求加盐 */
  requestSalt : '7asdf98z2p9bi23klo94nb186as2lklkj88s',
}

/** 发布环境配置对象 */
const pubConfig = {
  env : 'publish',

  /** 服务器端口 */
  port: 8083,

  /** @type {object} 数据库配置 */
  dbConfig: {
    address: 'mongodb://localhost:8878/timebottles',
    user: '',
    psw: ''
  },

  cookieConfig:{
    secret: 'timebottles1990s',
    maxAge: 60 * 60 * 24 * 7 , // 一周
  },

  /** 请求加盐 */
  requestSalt : '7asdf98z2p9bi23klo94nb186as2lklkj88s',
}

// 通过NODE_ENV来设置环境变量，如果没有指定则默认为发布环境（避免发布时的误操作）
const config = (process.env.NODE_ENV === 'develop') ? devConfig : pubConfig ;

export default config;
