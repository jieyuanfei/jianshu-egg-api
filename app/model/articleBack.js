'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  // 添加文章备份表
  const ArticleBack = app.model.define('t_article_backs', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    article_id: INTEGER,
    type_id: INTEGER,
    title: STRING(255),
    text: STRING(255),
    images: STRING(1500), // 最多保存5张图片
    content: STRING(10000),
    article_num: INTEGER,
    status: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  ArticleBack.findOneByElement = async function(params) {
    if (typeof params !== 'object') {
      return {};
    }
    let data = await this.findOne({
      where: params,
    })
    if (data === null) {
      return data;
    }
    return data.dataValues;

  };
  ArticleBack.findColumnByElement = async function(Column, params) {
    if (typeof params !== 'object') {
      return {};
    }
    return await this.findOne({
      where: params,
    });

  };
  return ArticleBack;
};
