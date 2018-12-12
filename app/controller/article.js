const Controller = require('egg').Controller
const cheerio = require('cheerio');

class ArticleController extends Controller {
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
  async updateDel() {
    const ctx = this.ctx;
    const { id } = ctx.request.body
    let query = {
      id,
      status: 3
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
    let text = $('.html')
      .text()
      .replace(/\s+/g, '');
    query.text = text;
    query.article_num = text.length
    const article = await ctx.service.article.update(query);
    if (article.code === 0) {
      ctx.success(article.data)
    } else {
      ctx.error(article.code, article.msg)
    }
  }

  // 修改发布状态
  async updateStatus() {
    const ctx = this.ctx;
    const { query, html } = ctx.request.body
    let $ = cheerio.load('<div class="html">' + html + '</div>');
    let text = $('.html')
      .text()
      .replace(/\s+/g, '');
    query.text = text;
    query.article_num = text.length
    const article = await ctx.service.article.update(query);
    if (article.code === 0) {
      ctx.success(article.data)
    } else {
      ctx.error(article.code, article.msg)
    }
  }
}

module.exports = ArticleController
