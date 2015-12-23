var log = require('../log');
var chalk = require('chalk');
var mailgun = require('mailgun-send');
var errorHandler = require('../error-handler');
var config = require('../config');

module.exports = function (app) {
  app.post('/api/v1/:domain/send', function (req, res) {
    var mail = req.body;
    var domain = req.params.domain;
    log.info('"%s" %s -> %s: %s', chalk.blue(domain), chalk.green(mail.from), chalk.yellow(mail.to), chalk.underline(mail.subject));
    mailgun.config({
      key: config.env.domains[domain].key,
      sender: mail.from
    });
    mailgun.send({
      subject: mail.subject,
      recipient: mail.to,
      body: mail.text
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
