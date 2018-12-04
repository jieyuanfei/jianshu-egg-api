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

}

module.exports = ArticleController
