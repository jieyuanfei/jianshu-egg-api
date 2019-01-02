'use strict';

module.exports = appInfo => {
  return {
    keys: appInfo.name + '_153332185447_3632',
    cluster: {
      listen: {
        path: '',
        port: 7002,
        hostname: '127.0.0.1',
      }
    },
    sequelize: {
      dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
      database: '',
      host: '',
      username: '',
      password: '',
      port: 3306,
    },
    user: { // 初始化管理员的账号
      userName: 'admin',
      password: 'admin',
    },
    session: {
      maxAge: 3600 * 1000,
    },
    jwt: {
      cert: 'huanggegehaoshuai' // jwt秘钥
    },
    qiniu: { // 这里填写你七牛的Access Key和Secret Key
      ak: '',
      sk: ''
    }
  }
};
