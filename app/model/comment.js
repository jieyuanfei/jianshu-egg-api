'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  // 第一个是别名 第二个是表名
  const Comment = app.model.define('t_comments', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    article_id: INTEGER,
    user_id: INTEGER,
    user_name: STRING,
    user_header_url: STRING,
    content: STRING,
    live_num: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  }, {
    freezeTableName: true,
    tableName: 't_comments'
  });

  Comment.findOneByElement = async function(params) {
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
  Comment.findColumnByElement = async function(Column, params) {
    if (typeof params !== 'object') {
      return {};
    }
    return await this.findOne({
      where: params,
    });

  };
  Comment.associate = function() {
    app.model.Comment.hasMany(app.model.CommentReply, { foreignKey: 'comment_id', targetKey: 'id' });
  };
  return Comment;
};
