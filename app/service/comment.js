'use strict';

const Service = require('egg').Service;

class Comment extends Service {
  // 通过文章id获取评论列表
  async getCommentList({ article_id, user_id, offset = 0, limit = 10, order = 'desc' }) {
    const { ctx } = this
    const options = {
      offset,
      limit,
      order: [[ 'created_at', order ], [ 'id', order ]],
      where: { article_id },
      include: [{
        order: [[ 'created_at', 'asc' ], [ 'id', 'asc' ]],
        model: this.ctx.model.CommentReply
      }]
    };
    let data = await ctx.model.Comment.findAndCountAll(options)
    let rows = []
    for (let info of data.rows) {
      let lovesId = await ctx.model.CommentLove.findOne({ attributes: [ 'id' ], where: { user_id: user_id, comment_id: info.id } })
      info.dataValues.loveId = lovesId
      rows.push(info)
    }
    return {
      rows: rows
    }
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
  async LoveNum(id, loveId) {
    let num = 0
    let option = {
      where: {
        user_id: this.ctx.userId,
        comment_id: id,
      }
    }
    if (loveId) {
      option.where.id = loveId
    }
    let Loves = await this.ctx.model.CommentLove.findOne(option);
    if (Loves) {
      await Loves.destroy();
      num = -1
    } else {
      let op = {
        comment_id: id,
        user_id: this.ctx.userId,
        created_at: new Date()
      }
      Loves = await this.ctx.model.CommentLove.create(op)
      num = 1
    }
    await this.app.model.query('update t_comments set love_num = love_num+:num where id=:id', { type: 'UPDATE', replacements: { id: id, num: num } }).then(results => results);
    Loves.dataValues.num = num
    return Loves
  }
}

module.exports = Comment;
