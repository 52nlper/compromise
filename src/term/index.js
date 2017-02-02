'use strict';
const fns = require('./paths').fns;
const build_whitespace = require('./whitespace');

const bindMethods = (o, str, self) => {
  self[str] = {};
  Object.keys(o).forEach((fn) => {
    self[str][fn] = o[fn].bind(self);
  });
};

class Term {
  constructor(str) {
    this._text = fns.ensureString(str);
    this.tag = {};
    //seperate whitespace from the text
    let parsed = build_whitespace(this._text);
    this.whitespace = parsed.whitespace;
    this._text = parsed.text;
    this.parent = null;
    this.silent_term = '';
    //has this term been modified
    this.dirty = false;

    // bindMethods(require('./adjective'), 'adjective', this);
    bindMethods(require('./adverb'), 'adverb', this);
    bindMethods(require('./month'), 'month', this);
    bindMethods(require('./noun'), 'noun', this);
    bindMethods(require('./pronoun'), 'pronoun', this);
    bindMethods(require('./verb'), 'verb', this);
    bindMethods(require('./weekday'), 'weekday', this);

    this.normalize();
  }

  set text(str) {
    str = str || '';
    this._text = str.trim();
    this.dirty = true;
    if (this._text !== str) {
      this.whitespace = build_whitespace(str);
    }
    this.normalize();
  }

  get text() {
    return this._text;
  }
  get isA() {
    return 'Term';
  }

  /** where in the sentence is it? zero-based. */
  index() {
    let ts = this.parentTerms;
    if (!ts) {
      return null;
    }
    return ts.terms.indexOf(this);
  }

  /** make a copy with no references to the original  */
  clone() {
    let term = new Term(this._text, null);
    term.tag = fns.copy(this.tag);
    term.whitespace = fns.copy(this.whitespace);
    term.silent_term = this.silent_term;
    return term;
  }
}
Term = require('./methods/normalize')(Term);
Term = require('./methods/isA')(Term);
Term = require('./methods/out')(Term);
Term = require('./methods/tag')(Term);
Term = require('./methods/case')(Term);
Term = require('./methods/punctuation')(Term);

module.exports = Term;
