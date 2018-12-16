'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 t_comments 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('t_comments', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      article_id: INTEGER,
      user_id: INTEGER,
      user_name: STRING,
      user_header_url: STRING,
      content: STRING,
      live_num: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 t_comments 表
  down: async queryInterface => {
    await queryInterface.dropTable('t_comments');
  },
};
