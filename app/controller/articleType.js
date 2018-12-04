const Controller = require('egg').Controller
class ArticleTypeController extends Controller {
  // 获取所有文章列表
  async getListByUserId() {
    const { ctx } = this
    let data = await ctx.service.articleType.list()
    ctx.success(data)
  }
  // 添加新文集
  async create() {
    const ctx = this.ctx;
    const { typeName } = ctx.request.body
    let query = {
      userId: ctx.userId,
      typeName: typeName
    }
    const articleType = await ctx.service.articleType.create(query);
    if (articleType.code === 0) {
      ctx.success(articleType.data)
    } else {
      ctx.error(articleType.code, articleType.msg)
    }
  }

}

module.exports = ArticleTypeController
