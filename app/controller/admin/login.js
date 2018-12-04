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
}

module.exports = LoginController
