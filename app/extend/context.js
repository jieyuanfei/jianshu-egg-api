'use strict';

module.exports = {
  result(data = {}, success = true, code = 0, msg = '') {
    let resultJson = {
      success: success,
      data: data,
      code: code,
      msg: msg,
    }
    this.body = resultJson;
  },
  success(data = {}) {
    let resultJson = {
      success: true,
      data: data,
      code: 0,
      msg: '',
    }
    this.body = resultJson;
  },
  error(code = 0, msg = '') {
    let resultJson = {
      success: false,
      data: {},
      code: code,
      msg: msg,
    }
    this.body = resultJson;
  },
};
