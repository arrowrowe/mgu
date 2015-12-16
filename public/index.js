(function ($, Vue, marked) {
  /* eslint-disable no-console */

  'use strict';

  Vue.filter('marked', marked);

  new Vue({
    el: '#mail-form',
    data: {
      busy: false,
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
          text: this.mail.text
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
