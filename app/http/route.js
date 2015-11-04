var log = require('../log');
var chalk = require('chalk');
var Mailgun = require('mailgun').Mailgun;
var errorHandler = require('../error-handler');
var config = require('../config');

module.exports = function (app) {
  app.post('/api/v1/:domain/send', function (req, res) {
    var mail = req.body;
    var domain = req.params.domain;
    log.info('"%s" %s -> %s: %s', chalk.blue(domain), chalk.green(mail.from), chalk.yellow(mail.to), chalk.underline(mail.subject));
    var mg = new Mailgun(config.env.domains[domain].key);
    mg.sendText(mail.from, mail.to, mail.subject, mail.text, domain, {

    }, function (err) {
      if (err) {
        errorHandler.send(res, 'MAILGUN_ERROR', err);
        return;
      }
      log.info('Successfully sent.');
      res.json({
        'message': 'Successfully sent.'
      });
    });
  });
};
