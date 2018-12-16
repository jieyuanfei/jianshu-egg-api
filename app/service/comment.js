'use strict';

const Service = require('egg').Service;

class Comment extends Service {
  // 通过文章id获取评论列表
  async getCommentList({ article_id, offset = 0, limit = 10, order = 'desc' }) {
    const options = {
      offset,
      limit,
      order: [[ 'created_at', order ], [ 'id', order ]],
      where: { article_id },
      include: {
        order: [[ 'created_at', 'asc' ], [ 'id', 'asc' ]],
        model: this.ctx.model.CommentReply
      }
    };
    let data = await this.ctx.model.Comment.findAndCountAll(options)
    return data;
  }
  // 添加评论
  async create(query) {
    const { ctx } = this;
    let data = await ctx.model.Comment.create(query);
    if (!data) {
      return {
        code: 1,
        msg: '评论失败'
      }
    }
    await ctx.service.addCommentNum(data.article_id)
    return {
      code: 0,
      data: data.dataValues
    }
  }
  // 添加评论回复
  async createReply(query) {
    const { ctx } = this;
    let data = await ctx.model.CommentReply.create(query);
    if (!data) {
      return {
        code: 1,
        msg: '回复失败'
      }
    }
    return {
      code: 0,
      data: data.dataValues
    }
  }
}

module.exports = Comment;
