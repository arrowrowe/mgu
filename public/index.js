(function ($, Vue, marked) {
  /* eslint-disable no-console */

  'use strict';

  Vue.filter('marked', marked);

  new Vue({
    el: '#mail-form',
    data: {
      domain: 'dongyue.io',
      mail: {
        from: 'xbox@dongyue.io',
        to: 'arrowrowe@gmail.com',
        subject: 'Try MGU-Express',
        text: 'Hi there!\nMiehahahaha~'
      }
    },
    methods: {
      send: function () {
        $.post('/api/v1/' + this.domain + '/send', {
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
