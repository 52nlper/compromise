'use strict';
const log = require('../paths').log;

class Terms {
  constructor(arr, context) {
    this.terms = arr;
    this.context = context || {};
    this.get = (n) => {
      return this.terms[n];
    };
  // this.terms = this.arr;
  }
  term(n) {
    return this.terms[n];
  }
  get length() {
    return this.terms.length;
  }
  forEach(fn) {
    this.terms.forEach(fn);
    return this;
  }
  pretty() {
    let txt = this.terms.reduce((str, t) => {
      str += t.plaintext();
      return str;
    }, '');
    console.log(txt);
  }
}
//apply methods
module.exports = Terms;
