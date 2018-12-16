const Service = require('egg').Service;
const qiniu = require('qiniu')
class ArticleService extends Service {
  // 根据用户id获取文章列表
  async getArticleList({ offset = 0, limit = 10, user_id }) {
    const options = {
      offset,
      limit,
      attributes: [ 'id', 'title', 'text', 'images', 'user_id', 'type_id', 'article_num', 'ready_num', 'like_num', 'comment_num', 'status', 'created_at', 'updated_at' ],
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
      include: {
        attributes: [ 'username', 'header_url' ],
        model: this.ctx.model.Users
      }
    };
    options.where = {
      status: 0
    }
    if (user_id) {
      options.where = {
        user_id,
      };
    }
    let data = await this.ctx.model.Article.findAndCountAll(options)
    data.rows = data.rows.map(info => {
      if (info.images) {
        info.images = JSON.parse(info.images)
      } else {
        info.images = [];
      }
      return info
    })
    return data;
  }
  // 根据其他条件添加
  async getArticleListByOther(wheres, offset, limit) {
    const options = {
      offset,
      limit,
      // attributes: [ 'id', 'title', 'content', 'user_id', 'created_at', 'updated_at' ],
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    };
    if (offset) {
      options.offset = offset
    }
    if (limit) {
      options.limit = limit
    }
    if (wheres) {
      options.where = wheres
      options.where.status = [ 0, 1, 2 ]
    } else {
      options.where = {
        status: [ 0, 1, 2 ]
      }
    }
    return this.ctx.model.Article.findAndCountAll(options);
  }
  // 根据Id
  async getArticleById(id) {
    let data = await this.ctx.model.Article.findById(id);
    if (!data) {
      return {
        code: 404,
        msg: '不存在文集类型'
      }
    }
    data.ready_num = data.ready_num + 1;
    this.addReadyNum(data.id)
    return {
      code: 0,
      data: data
    }
  }
  // 阅读数加 1
  async addReadyNum(id) {
    let data = this.app.model.query('update t_articles set ready_num = ready_num+1 where id=:id', { type: 'UPDATE', replacements: { id: id } }).then(results => results);
    return data
  }
  // 评论数加 1
  async addCommentNum(id) {
    let data = this.app.model.query('update t_articles set comment_num = comment_num+1 where id=:id', { type: 'UPDATE', replacements: { id: id } }).then(results => results);
    return data
  }
  // 新增
  async create(query) {
    const { ctx } = this;
    // 使用事务管理
    try {
      let option = {
        title: '标题栏',
        content: ' ',
        user_id: query.user_id,
        type_id: query.type_id,
        article_num: 0,
        ready_num: 0,
        like_num: 0,
        comment_num: 0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date(),
      }
      let data = await ctx.model.Article.create(option);
      let optionBack = {
        article_id: data.id,
        type_id: data.type_id,
        title: data.title,
        text: '',
        content: '',
        article_num: 0,
        status: 0,
        created_at: new Date(),
        updated_at: new Date(),
      }
      let articleBack = await ctx.model.ArticleBack.create(optionBack);
      return {
        code: 0,
        data: {
          id: data.id,
          status: data.status,
          backId: articleBack.id,
          title: data.title,
          text: '',
          article_num: 0,
        }
      }
    } catch (e) {

      return {
        code: 1,
        msg: '插入失败'
      }
    }
  }
  async del(id) {
    const article = await this.ctx.model.Article.findById(id);
    if (!article) {
      return {
        code: 404,
        msg: '不存在文集类型'
      }
    }
    let data = await article.destroy();
    return {
      code: 0,
      data: data.dataValues
    }
  }
  async update(query) {
    const article = await this.ctx.model.Article.findById(query.id);
    if (!article) {
      return {
        code: 404,
        msg: '文章已被删除'
      }
    }
    let option = {}
    if (query.id) {
      option.id = query.id
    }
    option.status = query.status
    if (query.status === 0) { // 0 发布 重备份表获取title,content.....
      let backup = await this.ctx.model.ArticleBack.findById(query.backId)
      if (backup) {
        option.title = backup.title
        option.text = backup.text
        option.images = backup.images
        option.content = backup.content
        option.article_num = backup.article_num
        option.updated_at = new Date()
      }
    }
    let data = await article.update(option);
    return {
      code: 0,
      data: data
    }
  }
  // 生成七牛token
  async getQiniuToken() {
    const { app } = this
    // 这里需要七牛的Access Key和Secret Key
    let mac = new qiniu.auth.digest.Mac(app.config.qiniu.ak, app.config.qiniu.sk);
    let options = {
      scope: 'jianshu',
    };
    let putPolicy = new qiniu.rs.PutPolicy(options);
    let uploadToken = putPolicy.uploadToken(mac);
    return uploadToken
  }

  // 备份表数据更新
  async createBack(query) {
    const { ctx } = this;
    let option = {
      article_id: query.article_id,
      type_id: query.type_id,
      title: query.title,
      images: query.images,
      content: query.content,
      text: query.text,
      article_num: query.article_num,
      status: 0,
      created_at: new Date(),
      updated_at: new Date(),
    }
    let data = await ctx.model.ArticleBack.create(option);
    if (!data) {
      return {
        code: 1,
        msg: '插入失败'
      }
    }
    return {
      code: 0,
      data: data.dataValues
    }

  }
  // 备份表更新
  async updateBack(query) {
    const articleBack = await this.ctx.model.ArticleBack.findById(query.id);
    if (!articleBack) {
      return {
        code: 404,
        msg: '文章已被删除'
      }
    }
    let data = await articleBack.update(query);
    return {
      code: 0,
      data: data
    }
  }
  // 根据类型ID 获取文章列表
  async getArticleBackByTypeId(typeId) {
    const options = {
      attributes: [ 'id', 'status' ],
      where: { type_id: typeId, status: [ 0, 1, 2 ] },
      order: [[ 'updated_at', 'desc' ], [ 'id', 'desc' ]]
    };
    let articles = await this.ctx.model.Article.findAndCountAll(options);
    let rows = []
    for (let info of articles.rows) {
      let op = {
        where: { article_id: info.id },
        order: [[ 'updated_at', 'desc' ]],
        limit: 1
      }
      let articleBack = await this.ctx.model.ArticleBack.findAndCountAll(op)
      rows.push({
        id: info.id,
        status: info.status,
        backId: articleBack.rows[0].id,
        title: articleBack.rows[0].title,
        text: articleBack.rows[0].text,
        article_num: articleBack.rows[0].title,
      })
    }
    articles.rows = rows;
    return articles
  }
  // 根据backId 获取备份表信息
  async getArticleBackById(id) {
    let data = await this.ctx.model.ArticleBack.findById(id);
    if (!data) {
      return {
        code: 404,
        msg: '不存在文集类型'
      }
    }
    return {
      code: 0,
      data: data
    }
  }
}

module.exports = ArticleService
