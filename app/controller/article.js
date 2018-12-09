const Controller = require('egg').Controller
class ArticleController extends Controller {
  // 获取所有文章列表
  async getArticleList() {
    const { ctx } = this
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit || 0),
      offset: ctx.helper.parseInt(ctx.query.offset || 10),
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

  // 删除文集
  async del() {
    const ctx = this.ctx;
    const { id } = ctx.request.body
    const articleType = await ctx.service.article.del(id);
    if (articleType.code === 0) {
      ctx.success(articleType.data)
    } else {
      ctx.error(articleType.code, articleType.msg)
    }
  }

}

module.exports = ArticleController
