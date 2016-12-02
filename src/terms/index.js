'use strict';
const tagger = require('./tagger');
const fromString = require('./fromString');

class Terms {
  constructor(arr, lexicon, originalText, termsFull) {
    this.terms = arr;
    this.lexicon = lexicon
    this.parentText = originalText
    this.parentTerms = termsFull || this
    this.get = (n) => {
      return this.terms[n];
    };
  }
  get found() {
    return this.terms.length > 0
  }
  get length() {
    return this.terms.length;
  }
  get isA() {
      return 'Terms'
    }
  posTag() {
    tagger(this)
    return this
  }
  firstTerm() {
    return this.terms[0]
  }
  lastTerm() {
    return this.terms[this.terms.length - 1]
  }
  all() {
    return this.parentText || this
  }

  static fromString(str, lexicon, parent) {
    let termArr = fromString(str)
    let ts = new Terms(termArr, lexicon, null)
      //give each term a reference to this ts
    ts.terms.forEach((t) => {
      t.parentTerms = ts;
    });
    ts.posTag()
    return ts
  }
}
Terms = require('./match')(Terms);
Terms = require('./methods/case')(Terms);
Terms = require('./methods/split')(Terms);
Terms = require('./methods/insert')(Terms);
Terms = require('./methods/replace')(Terms);
Terms = require('./methods/tag')(Terms);
Terms = require('./methods/remove')(Terms);
Terms = require('./methods/render')(Terms);
Terms = require('./methods/misc')(Terms);
Terms = require('./methods/transform')(Terms);
module.exports = Terms;
