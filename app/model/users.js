'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Users = app.model.define('t_users', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(30),
    password: STRING(255),
    header_url: STRING(255),
    user_email: STRING(100),
    phone: STRING(11),
    phone_validate: INTEGER(2),
    edit_type: INTEGER(2),
    language: INTEGER(2),
    receive_msg: INTEGER(2),
    notice: INTEGER(2),
    created_at: DATE,
    updated_at: DATE,
  });

  Users.findOneByElement = async function(params) {
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
  Users.findColumnByElement = async function(Column, params) {
    if (typeof params !== 'object') {
      return {};
    }
    return await this.findOne({
      where: params,
    });

  };
  return Users;
};
