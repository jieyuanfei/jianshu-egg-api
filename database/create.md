## MAC mysql 安装
```
brew install mysql
brew service start mysql
```

## 初始化项目
```
// 初始化

egg-init --type=simple --dir=sequelize-project
cd sequelize-project
npm i

// 安装

npm install --save egg-sequelize mysql2

// config/plugin.js 配置

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

// config/config.default.js配置

config.sequelize = {
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  database: 'egg-sequelize-doc-default',
  username: 'root',
  password: 'root'
};
```

## mysql 创建表
``` 
mysql -u root -e 'CREATE DATABASE IF NOT EXISTS `egg-sequelize-doc-default`;'
```
## 安装 sequelize-cli
``` 
cnpm i sequelize-cli -D
```
## 项目根目录创建 `.sequelizerc`文件

``` 
'use strict';

const path = require('path');

module.exports = {
  config: path.join(__dirname, 'database/config.json'),
  'migrations-path': path.join(__dirname, 'database/migrations'),
  'seeders-path': path.join(__dirname, 'database/seeders'),
  'models-path': path.join(__dirname, 'app/model'),
};
```

## 初始化 Migrations 配置文件和目录

``` 
npx sequelize init:config
npx sequelize init:migrations
```

## 在database/migrations创建表文件
``` 
npx sequelize migration:generate --name=init-users(users表名字)
```

## 修改init-users文件
``` 
'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      age: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
```

## 执行 migrate 进行数据库变更
``` 
# 升级数据库
npx sequelize db:migrate
# 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
# npx sequelize db:migrate:undo
# 可以通过 `db:migrate:undo:all` 回退到初始状态
# npx sequelize db:migrate:undo:all
```

[官方文档链接](https://eggjs.org/zh-cn/tutorials/sequelize.html)
