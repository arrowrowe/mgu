var config = require('./config');
var log = require('./log');
var chalk = require('chalk');
var inquirer = require('inquirer');

var domainManager = {
  showDomains: function (domains) {
    this.domainCount = 0;
    for (var domain in domains) {
      this.domainCount++;
      log.info('    %d. %s', this.domainCount, chalk.green(domain));
    }
    this.domainCount ?
      log.info(chalk.blue('Already %d domains as above.'), this.domainCount) :
      log.warn('No domains for now. Follow the instructions to add some.');
  },
  addDomain: function (fnAfterAdded) {
    var self = this;
    var isDomainWanted = function (answers) {
      return !!answers.domain;
    };
    inquirer.prompt([{
      name: 'domain',
      type: 'input',
      message: 'Enter a domain to add it, or press enter to skip',
      default: '',
      validate: function (domain) {
        if (domain in self.domains) {
          return 'Domain "' + domain + '" already exists. If wanna modify, edit .env.json directly.';
        }
        return true;
      }
    }, {
      name: 'api',
      type: 'input',
      message: 'Input the full API base URL',
      default: function (answers) {
        return 'https://api.mailgun.net/v3/' + answers.domain + '/messages';
      },
      when: isDomainWanted
    }, {
      name: 'key',
      type: 'input',
      message: 'Input the full API key',
      when: isDomainWanted
    }], function (answers) {
      if (!isDomainWanted(answers)) {
        fnAfterAdded();
        return;
      }
      self.domainCount++;
      self.domains[answers.domain] = {
        api: answers.api,
        key: answers.key
      };
      self.addDomain(fnAfterAdded);
    });
  },
  setServer: function () {
    var isStringNumberic = function (s) {
      return /^\d+$/.test(s) || 'Please enter an integer';
    };
    inquirer.prompt([{
      name: 'port',
      type: 'input',
      message: 'The local server will listen to port',
      default: config.env.server.port,
      validate: isStringNumberic
    }], function (answers) {
      config.env.server.port = answers.port;
      config.save();
    });
  },
  init: function () {
    var self = this;
    this.showDomains(this.domains = config.env.domains);
    this.addDomain(function () {
      log.info(chalk.blue('Already %d domains now.'), self.domainCount);
      config.save();
      self.setServer();
    });
  }
};

domainManager.init();
