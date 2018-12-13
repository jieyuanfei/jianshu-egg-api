'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 t_article_back 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('t_article_back', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      article_id: INTEGER,
      type_id: INTEGER,
      title: STRING(255),
      text: STRING(255),
      content: STRING(10000),
      article_num: INTEGER,
      status: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 t_article_back 表
  down: async queryInterface => {
    await queryInterface.dropTable('t_article_back');
  },
};
