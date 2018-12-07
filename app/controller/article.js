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

}

module.exports = ArticleController
