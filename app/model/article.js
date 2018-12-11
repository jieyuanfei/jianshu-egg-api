'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Article = app.model.define('t_articles', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(255),
    text: STRING(255),
    content: STRING(10000),
    user_id: INTEGER,
    type_id: INTEGER,
    article_num: INTEGER(2),
    ready_num: INTEGER(2),
    like_num: INTEGER(2),
    comment_num: INTEGER(2),
    status: INTEGER(2),
    created_at: DATE,
    updated_at: DATE
  });

  Article.findOneByElement = async function(params) {
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
  Article.findColumnByElement = async function(Column, params) {
    if (typeof params !== 'object') {
      return {};
    }
    return await this.findOne({
      where: params,
    });

  };
  return Article;
};
