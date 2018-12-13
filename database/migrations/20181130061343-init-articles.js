'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 t_article 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('t_articles', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      article_id: INTEGER,
      title: STRING(255),
      text: STRING(255),
      images: STRING(1500), // 最多保存5张文章的图片
      content: STRING(10000),
      user_id: INTEGER,
      type_id: INTEGER,
      article_num: INTEGER(2),
      ready_num: INTEGER(2),
      like_num: INTEGER(2),
      comment_num: INTEGER(2),
      status: INTEGER(2),
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 t_article 表
  down: async queryInterface => {
    await queryInterface.dropTable('t_articles');
  },
};
