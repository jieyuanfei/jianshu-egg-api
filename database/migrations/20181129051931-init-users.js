'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('t_users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: STRING(30),
      password: STRING(255),
      header_url: STRING(255),
      user_email: STRING(100),
      phone: STRING(11),
      phone_validate: INTEGER(2),
      edit_type: INTEGER(2),
      language: INTEGER(2),
      receive_msg: INTEGER(2),
      notice: INTEGER(2),
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('t_users');
  },
};
