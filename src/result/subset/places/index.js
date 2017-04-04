'use strict';
const Text = require('../../index');
const Place = require('./place');

class Places extends Text {
  static find(r, n) {
    r = r.splitAfter('#Comma');
    r = r.match('#Place+');
    if (typeof n === 'number') {
      r = r.get(n);
    }
    r.list = r.list.map((ts) => {
      return new Place(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    return r;
  }
}

module.exports = Places;
