'use strict';
const tagger = require('./tagger');
const build = require('./build');

class Terms {
  constructor(arr, lexicon, refText, refTerms) {
    this.terms = arr;
    this.lexicon = lexicon;
    this.refText = refText;
    this.refTerms = refTerms;
    this.get = (n) => {
      return this.terms[n];
    };
  }
  get found() {
    return this.terms.length > 0;
  }
  get length() {
    return this.terms.length;
  }
  get isA() {
    return 'Terms';
  }
  set dirty(dirt) {
    this.terms.forEach((t) => {
      t.dirty = dirt;
    });
  }
  posTag() {
    tagger(this);
    return this;
  }
  firstTerm() {
    return this.terms[0];
  }
  lastTerm() {
    return this.terms[this.terms.length - 1];
  }
  get parent() {
    return this.refText || this;
  }
  set parent(r) {
    this.refText = r;
    return this;
  }
  get parentTerms() {
    return this.refTerms || this;
  }
  set parentTerms(r) {
    this.refTerms = r;
    return this;
  }
  all() {
    return this.parent;
  }
  get whitespace() {
    return {
      before: (str) => {
        this.firstTerm().whitespace.before = str;
        return this;
      },
      after: (str) => {
        this.lastTerm().whitespace.after = str;
        return this;
      },
    };
  }

  static fromString(str, lexicon, parent) {
    let termArr = build(str);
    let ts = new Terms(termArr, lexicon, null);
    //give each term a reference to this ts
    ts.terms.forEach((t) => {
      t.parentTerms = ts;
    });
    ts.posTag();
    return ts;
  }
}
Terms = require('./match')(Terms);
Terms = require('./methods/case')(Terms);
Terms = require('./methods/split')(Terms);
Terms = require('./methods/insert')(Terms);
Terms = require('./methods/replace')(Terms);
Terms = require('./methods/tag')(Terms);
Terms = require('./methods/delete')(Terms);
Terms = require('./methods/render')(Terms);
Terms = require('./methods/misc')(Terms);
Terms = require('./methods/transform')(Terms);
module.exports = Terms;
