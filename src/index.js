/*******  import module  **********/
import env from './env';
import router from './router';
import config from 'app/core/config';
import db from 'app/base/db/DBConnection';
// passport
import PassportBusiness from 'app/module/user/business/PassportBusiness';

/*******  init app  **********/
const app = env();

/*******  router  **********/
router(app);


/*******  start server & fault-tolerance  **********/
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', (cb) => {
  console.log('mongo connected!');
  var server = app.listen(config.port, function() {
    // 服务开启后，初始``化 passport 认证中心
    PassportBusiness.initPassport();

    // log
    console.log("Server listening at : %s", config.port);
  });
});
