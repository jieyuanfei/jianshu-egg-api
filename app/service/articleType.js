'use strict';

const Service = require('egg').Service;

class ArticleType extends Service {
  async list() {
    let user_id = this.ctx.userId;
    return this.ctx.model.ArticleTypes.findAndCountAll({
      where: { user_id: user_id },
      order: [[ 'created_at', 'asc' ]],
    });
  }

  async find(id) {
    const articleTypes = await this.ctx.model.ArticleTypes.findById(id);
    if (!articleTypes) {
      this.ctx.error(404, '不存在文集类型');
    }
    return articleTypes;
  }

  async create(query) {
    const { ctx } = this;
    let option = {
      type_name: query.typeName,
      user_id: query.userId,
      delete: '0'
    }
    let typeData = await ctx.model.ArticleTypes.findOneByElement(option)
    if (typeData) {
      return {
        code: 1,
        msg: '不能创建同一个文集名称'
      }
    }
    let data = await ctx.model.ArticleTypes.create(option);
    if (!data) {
      return {
        code: 1,
        msg: '插入失败'
      }
    }
    return {
      code: 0,
      data: data.dataValues
    }

  }

  async update(query) {
    const articleTypes = await this.ctx.model.ArticleTypes.findById(query.id);
    if (!articleTypes) {
      return {
        code: 404,
        msg: '不存在文集类型'
      }
    }
    let user_id = this.ctx.userId
    const articleTypes2 = await this.ctx.model.ArticleTypes.findAndCountAll({ where: { type_name: query.type_name ,user_id: user_id} });
    if (articleTypes2.count > 0) {
      return {
        code: 1,
        msg: '已存在该文集类型'
      }
    }
    let data = await articleTypes.update(query);
    return {
      code: 0,
      data: data
    }
  }

  async del(id) {
    const articleTypes = await this.ctx.model.ArticleTypes.findById(id);
    if (!articleTypes) {
      return {
        code: 404,
        msg: '不存在文集类型'
      }
    }
    let data = await articleTypes.destroy();
    return {
      code: 0,
      data: data.dataValues
    }
  }
}

module.exports = ArticleType;
