'use strict';

const Service = require('egg').Service;

class Comment extends Service {
  // 通过文章id获取评论列表
  async getCommentList({ article_id, user_id, offset = 0, limit = 10, order = 'desc' }) {
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
    let rows = data.rows.map(info => {
      if (info.love_users && user_id && info.love_users.split(',').includes(user_id.toString())) {
        info.dataValues.love_users = true
      } else {
        info.dataValues.love_users = false
      }
      return info
    })
    return {
      count: data.count,
      rows: rows
    };
  }
  // 添加评论
  async create(query) {
    const { ctx } = this;
    let user = await ctx.model.Users.findById(query.user_id);
    if (!user) {
      return {
        code: 401,
        msg: '用户不存在'
      }
    }
    query.user_name = user.username
    query.user_header_url = user.header_url
    query.love_num = 0
    query.created_at = new Date()
    query.updated_at = new Date()
    let data = await ctx.model.Comment.create(query);
    if (!data) {
      return {
        code: 401,
        msg: '评论失败'
      }
    }
    await ctx.service.article.addCommentNum(data.article_id)
    return {
      code: 0,
      data: data.dataValues
    }
  }
  // 添加评论回复
  async createReply(query) {
    const { ctx } = this;
    let user = await ctx.model.Users.findById(query.from_user_id);
    if (!user) {
      return {
        code: 401,
        msg: '用户不存在'
      }
    }
    query.from_user_name = user.username
    query.created_at = new Date()
    query.updated_at = new Date()
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
  // 添加或者取消评论点赞
  async LoveNum(id) {
    let comment = await this.ctx.model.Comment.findById(id);
    if (!comment) {
      return {
        code: 1,
        msg: '点赞失败'
      }
    }
    let num = 1
    if (comment.love_users && comment.love_users.split(',').includes(this.ctx.userId.toString())) {
      num = -1
    }
    let data = this.app.model.query('update t_comments set love_num = love_num+:num where id=:id', { type: 'UPDATE', replacements: { id: id, num: num } }).then(results => results);
    return data
  }
}

module.exports = Comment;
