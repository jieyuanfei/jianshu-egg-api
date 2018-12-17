'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  // 第一个是别名 第二个是表名
  const CommentReply = app.model.define('t_comment_replys', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    comment_id: INTEGER,
    reply_id: INTEGER,
    from_user_id: INTEGER,
    from_user_name: STRING,
    to_user_id: INTEGER,
    to_user_name: STRING,
    content: STRING(600),
    created_at: DATE,
    updated_at: DATE,
  }, {
    freezeTableName: true,
    tableName: 't_comment_replys'
  });

  CommentReply.findOneByElement = async function(params) {
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
  CommentReply.findColumnByElement = async function(Column, params) {
    if (typeof params !== 'object') {
      return {};
    }
    return await this.findOne({
      where: params,
    });

  };
  return CommentReply;
};
