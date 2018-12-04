const Service = require('egg').Service;
const jwt = require('jsonwebtoken')
const svgCaptcha = require('svg-captcha')
class LoginService extends Service {
  // 生成验证码
  genCaptcha() {
    return svgCaptcha.create({
      width: 85,
      height: 38
    })
  }
  // 检查验证码是否正确
  checkCaptcha(code) {
    const { ctx } = this
    code = code.toLowerCase()
    let sessCode = ctx.session.code ? ctx.session.code.toLowerCase() : null // 拿到之前存在session中的验证码
    // 进行验证
    if (code === sessCode) {
      // 成功后验证码作废
      ctx.session.code = null
    }
    return code === sessCode
  }
  // 登录操作
  async login({ username, password }) {
    const { ctx, app } = this
    const userData = await ctx.model.Users.findOneByElement({
      username: username
    })
    let user = {
      user: {},
      token: '',
      err: 0 // 0 登录成功 1 用户不存在 2 用户密码错误
    }
    // 用户不存在
    if (!userData) {
      user.err = 1;
      return user;
    }
    if (userData.password !== password) {
      user.err = 2;
      return user;
    }

    // 找到则以用户id 生成token
    const token = jwt.sign({
      id: userData.id
    }, app.config.jwt.cert, {
      expiresIn: '10h' // token过期时间
    })
    user.user = userData;
    user.token = token;
    return user;
  }
}

module.exports = LoginService
