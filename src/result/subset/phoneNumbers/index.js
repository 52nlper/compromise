'use strict';
const Text = require('../../index');

class PhoneNumbers extends Text {
  parse() {
    return this.mapTerms((t) => {
      return {
        text: t.text
      };
    });
  }
  static find(r) {
    r = r.splitAfter('#Comma');
    return r.match('#PhoneNumber+');
  }
}

module.exports = PhoneNumbers;
