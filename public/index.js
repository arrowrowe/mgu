(function ($, Vue, marked) {
  /* eslint-disable no-console */

  'use strict';

  Vue.filter('marked', marked);

  new Vue({
    el: '#mail-form',
    data: {
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
        $.post('/api/v1/' + this.domain + '/send', {
          password: this.password,
          from: this.mail.from,
          to: this.mail.to,
          subject: this.mail.subject,
          text: this.mail.text
        }, function () {
          console.log(arguments);
        });
      }
    }
  });

  /* eslint-enable no-console */
})(window.$, window.Vue, window.marked);
