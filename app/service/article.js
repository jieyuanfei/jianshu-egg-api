const Service = require('egg').Service;
const qiniu = require('qiniu')
class ArticleService extends Service {
  // 根据用户id获取文章列表
  async getArticleList({ offset = 0, limit = 10, user_id }) {
    const options = {
      offset,
      limit,
      attributes: [ 'id', 'title', 'user_id', 'created_at', 'updated_at' ],
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    };
    if (user_id) {
      options.where = {
        user_id,
      };
    }
    return this.ctx.model.Article.findAndCountAll(options);
  }
  // 生成七牛token
  async getQiniuToken() {
    const { app } = this
    // 这里需要七牛的Access Key和Secret Key
    let mac = new qiniu.auth.digest.Mac(app.config.qiniu.ak, app.config.qiniu.sk);
    let options = {
      scope: 'blog',
    };
    let putPolicy = new qiniu.rs.PutPolicy(options);
    let uploadToken = putPolicy.uploadToken(mac);
    return uploadToken
  }
}

module.exports = ArticleService
