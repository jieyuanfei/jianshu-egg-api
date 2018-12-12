const Controller = require('egg').Controller
class LoginController extends Controller {
  // 获取验证码
  async getCaptcha() {
    const { ctx } = this
    const captcha = ctx.service.login.genCaptcha()
    // 把生成的验证码文本信息（如：t8ec），存入session，以待验证
    ctx.session.code = captcha.text
    // 将生成的验证码svg图片返回给前端
    ctx.body = captcha.data
  }
  // 登录
  async login() {
    const { ctx } = this
    const { username, password } = ctx.request.body
    // let isCaptchaVali = ctx.service.login.checkCaptcha(code)
    // if (!isCaptchaVali) {
    //   ctx.error(1, '验证码不正确')
    //   return
    // }
    // 验证码正确则继续登录操作
    const userData = await ctx.service.login.login({ username, password })
    if (userData.err === 1 || userData.err === 2) {
      ctx.error(2, '用户名不存在或密码错误')
      return
    }
    let data = {
      username: userData.user.username,
      uid: userData.user.id,
      header_url: userData.user.header_url,
      token: userData.token
    }
    ctx.success(data)
  }
  // 注册
  async register() {
    const { ctx } = this
    // 暂时未开发
    ctx.success({})
  }
}

module.exports = LoginController
