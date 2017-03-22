'use strict';
const Text = require('../../index');

class Urls extends Text {
  static find(r, n) {
    r = r.match('#Url');
    if (typeof n === 'number') {
      r = r.get(n);
    }
    return r;
  }
}

module.exports = Urls;
