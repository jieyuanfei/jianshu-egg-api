'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const ArticleTypes = app.model.define('t_article_types', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    type_name: STRING(255),
    user_id: INTEGER,
    delete: INTEGER(2),
    created_at: DATE,
    updated_at: DATE,
  });

  ArticleTypes.findOneByElement = async function(params) {
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
  ArticleTypes.findColumnByElement = async function(Column, params) {
    if (typeof params !== 'object') {
      return {};
    }
    return await this.findOne({
      where: params,
    });

  };
  return ArticleTypes;
};
