var util = require('./util');
var log = require('./log');
var envPath = './.env.json';

var env = util.readJsonSync(envPath);

if (env) {
  log.trace('Configuration loaded from "%s".', envPath);
} else {
  log.info('No previous configuration "%s" loaded. Create a fresh one.', envPath);
  env = {
    domains: Object.create(null),
    server: {
      port: 3000
    }
  };
  util.fs.writeJsonSync(envPath, env);
}

module.exports = {
  env: env,
  save: function () {
    util.fs.writeJsonSync(envPath, env);
  }
};
