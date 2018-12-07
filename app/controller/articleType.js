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

  // 删除文集
  async del() {
    const ctx = this.ctx;
    const { id } = ctx.request.body
    const articleType = await ctx.service.articleType.del(id);
    if (articleType.code === 0) {
      ctx.success(articleType.data)
    } else {
      ctx.error(articleType.code, articleType.msg)
    }
  }

  // 修改文集
  async update() {
    const ctx = this.ctx;
    const { id, typeName } = ctx.request.body
    if (id == null || typeName.length === 0) {
      ctx.error(1, '文集名称不能为空')
    }
    let query = {
      id: id,
      type_name: typeName
    }
    const articleType = await ctx.service.articleType.update(query);
    if (articleType.code === 0) {
      ctx.success(articleType.data)
    } else {
      ctx.error(articleType.code, articleType.msg)
    }
  }

}

module.exports = ArticleTypeController
