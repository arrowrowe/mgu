var express = require('express');
var app = express();

var log = require('./log');
var config = require('./config');

app.use(express.static('public'));

var server = app.listen(config.env.server.port, function () {
  var address = server.address();
  log.trace('Example app listening at http://%s:%s', address.address, address.port);
});
