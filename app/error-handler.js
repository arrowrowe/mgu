var chalk = require('chalk');
var log = require('./log');

module.exports = {
  errors: {
    'DOMAIN_NOT_AUTHORIZED_OR_RECORDED': function (domain) {
      log.warn('Domain "%s" not recorded', chalk.red(domain));
      return {
        status: 403,
        message: 'Domain "' + domain + '" not authorized or recorded, please confirm your current account and contact the site administrator.'
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
