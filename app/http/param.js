var config = require('../config');
var errorHandler = require('../error-handler');

module.exports = function (app) {
  app.param('domain', function (req, res, next, domain) {
    if (!(domain in config.env.domains)) {
      errorHandler.send(res, 'DOMAIN_NOT_AUTHORIZED_OR_RECORDED', {domain: domain});
      return;
    }
    if (req.body.password !== config.env.domains[domain].password) {
      errorHandler.send(res, 'DOMAIN_NOT_AUTHORIZED_OR_RECORDED', {domain: domain, password: req.body.password});
      return;
    }
    next();
  });
};
