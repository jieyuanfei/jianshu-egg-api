'use strict';

module.exports = app => {
  const { INTEGER, DATE } = app.Sequelize;

  // 第一个是别名 第二个是表名
  const CommentLove = app.model.define('t_comment_loves', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    comment_id: INTEGER,
    user_id: INTEGER,
    created_at: DATE,
    updated_at: DATE
  }, {
    freezeTableName: true,
    tableName: 't_comment_loves'
  });

  CommentLove.findOneByElement = async function(params) {
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
  CommentLove.findColumnByElement = async function(Column, params) {
    if (typeof params !== 'object') {
      return {};
    }
    return await this.findOne({
      where: params,
    });

  };
  return CommentLove;
};
