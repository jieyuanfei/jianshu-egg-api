const Controller = require('egg').Controller
const cheerio = require('cheerio');

class ArticleController extends Controller {
  // 获取七牛token
  async getQiniuToken() {
    const { ctx } = this
    let resMsg = {
      code: 0,
      data: {},
      msg: '获取token成功'
    }
    let uploadToken = await ctx.service.article.getQiniuToken()
    console.log(uploadToken)
    resMsg.data.token = uploadToken
    ctx.success(resMsg)
  }
  // 获取所有文章列表
  async getArticleList() {
    const { ctx } = this
    const query = {
      offset: ctx.helper.parseInt(ctx.query.offset || 0),
      limit: ctx.helper.parseInt(ctx.query.limit || 10),
    };
    let data = await ctx.service.article.getArticleList(query)
    ctx.success(data)
  }

  // 根据类型id获取文章列表
  async getArticleListByTypes() {
    const { ctx } = this
    let type_id = ctx.query.type_id
    let wheres = {
      type_id
    }
    let data = await ctx.service.article.getArticleListByOther(wheres)
    ctx.success(data)
  }

  // 根据Id获取文章
  async getArticleById() {
    const { ctx } = this
    let id = ctx.query.id
    if (!id) {
      ctx.error(404, '文章id不能为空')
    }
    let data = await ctx.service.article.getArticleById(id)
    ctx.success(data)
  }

  // 根据文章id 获取文章详情
  async getArticleDetailById() {
    const { ctx } = this
    let id = ctx.query.id
    if (!id) {
      ctx.error(404, '文章id不能为空')
    }
    let data = await ctx.service.article.getArticleById(id)
    let user = await ctx.service.user.find(data.data.user_id)
    let users = {
      id: user.data.id,
      username: user.data.username,
      header_url: user.data.header_url
    };

    ctx.success({ article: data.data, user: users })
  }

  // 根据typeId创建文章
  async addArticleByTypeId() {
    const { ctx } = this
    const { type_id } = ctx.request.body
    let query = {
      type_id,
      user_id: ctx.userId
    }
    let data = await ctx.service.article.create(query)
    ctx.success(data)
  }

  // 真实删除文章
  async del() {
    const ctx = this.ctx;
    const { id } = ctx.request.body
    const article = await ctx.service.article.del(id);
    if (article.code === 0) {
      ctx.success(article.data)
    } else {
      ctx.error(article.code, article.msg)
    }
  }

  // 修改状态，删除文章
  async updateStatus() {
    const ctx = this.ctx;
    const { id, status, backId } = ctx.request.body
    let query = {
      id,
      backId,
      status
    }
    const article = await ctx.service.article.update(query);
    if (article.code === 0) {
      ctx.success(article.data)
    } else {
      ctx.error(article.code, article.msg)
    }
  }

  // 更新文章
  async update() {
    const ctx = this.ctx;
    const { query, html } = ctx.request.body
    let $ = cheerio.load('<div class="html">' + html + '</div>');
    let text = $('.html').text().replace(/\s+/g, '');
    query.text = text;
    query.article_num = text.length;
    if (text.length > 254) { // 描述文字长度控制在255个字就ok
      query.text = text.substring(0, 254)
    }
    let images = $('.html').find('img');
    let imgList = [];
    // 保存3张图片就够了
    images.each(function(index) {
      if (index > 2) {
        return false;
      }
      imgList.push($(this).attr('src'))
    })
    query.images = JSON.stringify(imgList)
    const article = await ctx.service.article.update(query);
    if (article.code === 0) {
      ctx.success(article.data)
    } else {
      ctx.error(article.code, article.msg)
    }
  }

  // 修改发布状态
  async backEdit() {
    const ctx = this.ctx;
    const { query, html } = ctx.request.body
    let $ = cheerio.load('<div class="html">' + html + '</div>');
    let text = $('.html').text().replace(/\s+/g, '');
    query.text = text;
    query.article_num = text.length;
    if (text.length > 254) { // 描述文字长度控制在255个字就ok
      query.text = text.substring(0, 254)
    }
    let images = $('.html').find('img');
    let imgList = [];
    // 保存3张图片就够了
    images.each(function(index) {
      if (index > 2) {
        return false;
      }
      imgList.push($(this).attr('src'))
    })
    query.images = JSON.stringify(imgList)
    query.text = text;
    query.article_num = text.length
    let article = await ctx.service.article.createBack(query);

    if (article.code === 0) {
      ctx.success(article.data)
    } else {
      ctx.error(article.code, article.msg)
    }
  }

  // 通过类型Id 获取文章列表和备份表数据
  async getArticleBackByTypeId() {
    const { ctx } = this
    let type_id = ctx.query.type_id
    let data = await ctx.service.article.getArticleBackByTypeId(type_id)
    ctx.success(data)
  }
  // 根据backId获取文章
  async getArticleBackById() {
    const { ctx } = this
    let id = ctx.query.id
    if (!id) {
      ctx.error(404, '文章id不能为空')
    }
    let data = await ctx.service.article.getArticleBackById(id)
    ctx.success(data)
  }
  // 获取评论
  async getCommentListByArticleId() {
    const { ctx } = this
    const query = {
      article_id: ctx.query.article_id,
      user_id: ctx.query.user_id,
      offset: ctx.helper.parseInt(ctx.query.offset || 0),
      limit: ctx.helper.parseInt(ctx.query.limit || 10),
    };
    let data = await ctx.service.comment.getCommentList(query);
    ctx.success(data);
  }
  // 添加评论
  async addComment() {
    const { ctx } = this
    const { query } = ctx.request.body
    let user_id = ctx.userId
    if (user_id) {
      ctx.error(401, '请先登录')
    }
    query.user_id = user_id
    let data = await ctx.service.comment.create(query)
    if (data.code === 0) {
      ctx.success(data)
    } else {
      ctx.error(data)
    }
  }
  // 添加评论回复
  async addCommentReply() {
    const { ctx } = this
    const { query } = ctx.request.body
    let user_id = ctx.userId
    if (user_id) {
      ctx.error(401, '请先登录')
    }
    query.from_user_id = user_id
    let data = await ctx.service.comment.createReply(query)
    ctx.success(data)
  }
  // 评论点赞
  async addCommentLoveNum() {
    const { ctx } = this
    const { id, LoveId } = ctx.request.body
    let data = await ctx.service.comment.LoveNum(id, LoveId)
    ctx.success(data)
  }
}

module.exports = ArticleController
