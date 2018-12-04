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
  // 通过用户Id获取文集类型
  router.get('/getListByUserId', auth, controller.articleType.getListByUserId);
  // 通过用户Id获取文集类型
  router.post('/addType', auth, controller.articleType.create);
  // 获取文章列表
  router.get('/getArticleList', controller.article.getArticleList);

  router.get('/users', controller.users.index);
  router.get('/test', controller.users.test);

};
