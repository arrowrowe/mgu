(function ($, Vue) {
  /* eslint-disable no-console */

  'use strict';

  new Vue({
    el: '#mail-form',
    data: {
      mail: {
        from: 'xbox@dongyue.io',
        to: 'arrowrowe@gmail.com',
        subject: 'Try MGU-Express',
        text: 'Hi there!\nMiehahahaha~'
      }
    },
    methods: {
      send: function () {
        console.log({
          from: this.mail.from,
          to: this.mail.to,
          subject: this.mail.subject,
          text: this.mail.text
        });
      }
    }
  });

  /* eslint-enable no-console */
})(window.$, window.Vue);
