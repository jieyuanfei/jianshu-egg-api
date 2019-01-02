## 仿简书后端接口平台

这个是一个基于egg模仿简书的后端接口,主要是为了学习使用,目前还在迭代开发中

## 目前规划

- 后端 egg.js （已完成部分功能）
- 后台管理 （计划中）
- pc前端 vue （已完成部分功能）
- 移动端APP react native （已完成部分功能）
- 小程序 mp-vue （计划中）

## 快速入门

### 技术栈

- 后端: [egg.js](https://eggjs.org/zh-cn/)、[mysql](http://www.runoob.com/mysql/mysql-tutorial.html)

- 移动端APP: [react native](https://reactnative.cn/)

- 小程序: [mp-vue](https://reactnative.cn/)

- 前端： 
  - PC端：[vue](https://cn.vuejs.org/)、[element](http://element-cn.eleme.io/#/zh-CN) 
  - 后台管理端：[vue](https://cn.vuejs.org/)、[element](http://element-cn.eleme.io/#/zh-CN) 

### 功能特性

- 轻量级Markdown编辑器，图片上传七牛
- 基本仿照简书所有的功能
- 部分功能自己添加的（每周一篇博客提交日历提醒功能）
- 标签云
### 线上地址
  [PC端页面展示](http://39.108.125.74/jianshu/#/)
### 图片演示
#### PC前台
 - 首页
 
### 目录结构

```
│  .autod.conf.js
│  .eslintignore
│  .eslintrc
│  .gitignore
│  .travis.yml
│  app.js // 项目启动前执行，比如写入管理员
│  appveyor.yml
│  package.json
│  README.md
│
├─db
│  │  db.md // db设计文档
├─screenshot // 演示图片路径
├─app
│  │  router.js // 服务端路由
│  │
│  ├─controller
│  │
│  ├─extend
│  │      helper.js
│  │
│  ├─middleware
│  │      auth.js // 登录验证中间件
│  │
│  ├─model
│  │     
│  │
│  ├─public
│  │
│  └─service // service部分用来执行具体的操作
│          
│
├─config
│      config.default.js // 项目配置相关
│      plugin.js
│
└─test // 测试相关
    └─app
        └─controller
                home.test.js
```  

### 全局配置

```javascript
module.exports = appInfo => {
  return {
      keys: appInfo.name + '_153332185447_3632',
      cluster: {
        listen: { // 启动监听的端口号配置
          path: '',
          port: 7002,
          hostname: '127.0.0.1',
        }
      },
      sequelize: {
        dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
        database: '数据库名字',
        host: 'ip',
        username: '用户名',
        password: '密码',
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
```


### 本地运行

安装mysql数据库和node环境。

``` bash
# 安装服务端依赖
npm install
# 运行服务
npm run dev


# 即可通过 http://127.0.0.1:7002访问
```

### 打包

```bash
# 在前台和后台目录分别
npm run build
# 在项目根目录
npm install --production
# 启动
npm start
```


 
