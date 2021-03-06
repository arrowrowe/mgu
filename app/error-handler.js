var chalk = require('chalk');
var log = require('./log');

module.exports = {
  errors: {
    'DOMAIN_NOT_AUTHORIZED_OR_RECORDED': function (params) {
      if ('password' in params) {
        log.warn('Wrong password "%s" for domain "%s".', chalk.red(params.password), chalk.red(params.domain));
      } else {
        log.warn('Unknown domain "%s".', chalk.red(params.domain));
      }
      return {
        status: 403,
        message: 'Domain "' + params.domain + '" not authorized or recorded, please confirm your current account and contact the site administrator.'
      };
    },
    'MAILGUN_ERROR': function (err) {
      log.error('Mailgun throws %j', err);
      return {
        status: 403,
        message: err.message ||
          err.msg ||
          (err.toString && err.toString()) ||
          'An unrecognized error occurs from Mailgun, please contact the site administrator for details.'
      };
    }
  },
  send: function (res, error, extra) {
    var ret = this.errors[error](extra);
    var status = ret.status;
    delete ret.status;
    ret.error = error;
    res.status(status).json(ret);
  }
};
