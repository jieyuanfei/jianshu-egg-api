'use strict';

const Service = require('egg').Service;

class User extends Service {


  async find(id) {
    const user = await this.ctx.model.Users.findById(id);
    if (!user) {
      return {
        code: 404,
        msg: '用户不存在'
      }
    }
    return {
      code: 0,
      data: user
    };
  }
}

module.exports = User;
