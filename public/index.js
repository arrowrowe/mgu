(function ($, Vue, marked) {
  /* eslint-disable no-console */

  'use strict';

  var option = {
    markdown: true
  };
  var parseRaw = function (raw) {
    console.log(option, raw);
    return option.markdown ? marked(raw) : raw;
  };

  Vue.filter('parseRaw', parseRaw);

  new Vue({
    el: '#mail-form',
    data: {
      busy: false,
      option: option,
      choices: [
        {value: true, text: 'Markdown'},
        {value: false, text: 'HTML'},
      ],
      text: '',
      domain: '',
      password: '',
      mail: {
        from: '',
        to: '',
        subject: '',
        text: ''
      }
    },
    methods: {
      send: function () {
        var that = this;
        this.busy = true;
        this.text = 'sending...';
        $.post('/api/v1/' + this.domain + '/send', {
          password: this.password,
          from: this.mail.from,
          to: this.mail.to,
          subject: this.mail.subject,
          text: parseRaw(this.mail.text)
        }).always(function (rep) {
          console.log(arguments);
          that.busy = false;
          that.text = (rep && rep.responseJSON && rep.responseJSON.message || JSON.stringify(rep)) || 'no response';
        });
      }
    }
  });

  /* eslint-enable no-console */
})(window.$, window.Vue, window.marked);
