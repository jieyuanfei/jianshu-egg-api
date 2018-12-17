'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 t_comment_loves 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE } = Sequelize;
    await queryInterface.createTable('t_comment_loves', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      comment_id: INTEGER,
      user_id: INTEGER,
      created_at: DATE,
      updated_at: DATE
    });
  },
  // 在执行数据库降级时调用的函数，删除 t_comment_loves 表
  down: async queryInterface => {
    await queryInterface.dropTable('t_comment_loves');
  },
};
