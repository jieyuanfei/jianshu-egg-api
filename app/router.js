'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 后台授权中间件
  const auth = app.middleware.auth()
  // 获取验证码
  router.get('/getCaptcha', controller.client.login.getCaptcha);
  router.get('/admin/getCaptcha', controller.admin.login.getCaptcha);
  // 登录
  router.post('/login', controller.client.login.login);
  // 获取七牛token
  router.get('/getQiniuToken', auth, controller.article.getQiniuToken);

  // 通过用户Id获取文集类型
  router.get('/getListByUserId', auth, controller.articleType.getListByUserId);
  // 通过用户Id获取文集类型
  router.post('/addType', auth, controller.articleType.create);
  // 通过Id修改文集类型
  router.post('/updateType', auth, controller.articleType.update);
  // 通过Id删除文集类型
  router.post('/delType', auth, controller.articleType.del);

  // 获取文章列表
  router.get('/getArticleList', controller.article.getArticleList);
  // 通过type_id 获取文章列表
  router.get('/getArticleListByTypes', controller.article.getArticleListByTypes);
  // 通过type_id 获取文章列表+备份
  router.get('/getArticleBackByTypeId', controller.article.getArticleBackByTypeId);
  // 通过backId 获取备份表
  router.get('/getArticleBackById', controller.article.getArticleBackById);
  // 通过id 获取文章列表
  router.get('/getArticleById', controller.article.getArticleById);
  // 通过id 获取文章详情
  router.get('/getArticleDetailById', controller.article.getArticleDetailById);
  // 通过type_id 添加文章
  router.post('/addArticleByTypeId', auth, controller.article.addArticleByTypeId);
  // 修改文章状态
  router.post('/updateStatus', auth, controller.article.updateStatus);
  // 修改文章
  router.post('/updateArticle', auth, controller.article.update);
  // 更新修改文章
  router.post('/editArticle', auth, controller.article.backEdit);

  router.get('/users', controller.users.index);
  router.get('/test', controller.users.test);

};
