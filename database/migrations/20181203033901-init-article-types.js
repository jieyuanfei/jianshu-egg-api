'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('t_article_types', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      type_name: STRING(255),
      user_id: INTEGER,
      delete: INTEGER(2),
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('t_article_types');
  },
};
