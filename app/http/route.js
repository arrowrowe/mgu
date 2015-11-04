var log = require('../log');

module.exports = function (app) {
  app.post('/api/v1/:domain/send', function (req, res) {
    log.info(req.params, req.body, req.query);
    res.json({
      'arir': 'Request arrived'
    });
  });
};
