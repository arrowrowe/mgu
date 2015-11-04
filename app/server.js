var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var log = require('./log');
var config = require('./config');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./http/route')(app);
require('./http/param')(app);

var server = app.listen(config.env.server.port, function () {
  var address = server.address();
  log.trace('Example app listening at http://%s:%s', address.address, address.port);
});
