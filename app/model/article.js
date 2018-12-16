'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  // 第一个是别名 第二个是表名
  const Article = app.model.define('t_articles', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(255),
    text: STRING(255),
    images: STRING(1500), // 最多保存5张图片
    content: STRING(10000),
    user_id: INTEGER,
    type_id: INTEGER,
    article_num: INTEGER(2),
    ready_num: INTEGER(2),
    like_num: INTEGER(2),
    comment_num: INTEGER(2),
    status: INTEGER(2), // 0 发布 1 草稿 2 私密 3 删除
    created_at: DATE,
    updated_at: DATE
  }, {
    freezeTableName: true,
    tableName: 't_articles'
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
  Article.associate = function() {
    app.model.Article.belongsTo(app.model.Users, { foreignKey: 'user_id', targetKey: 'id' });
  };
  return Article;
};
