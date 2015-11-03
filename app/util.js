var fs = require('fs-extra');
var stripJsonComments = require('strip-json-comments');
var log = require('./log');

module.exports = {
  fs: fs,
  readJsonSync: function (path, def) {
    log.trace('Loading json file "%s"...', path);
    try {
      return JSON.parse(stripJsonComments(fs.readFileSync(path).toString()));
    } catch (e) {
      log.error('Fail to read "%s". Probably because the file does not exist or has wrong json syntax.', path);
      return def;
    }
  }
};
