'use strict';
const Term = require('../term/term.js');
const fns = require('../fns.js');
const tagger = require('./pos/tagger.js');
const pos = require('./pos/parts_of_speech.js');
const passive_voice = require('./passive_voice.js');

//a sentence is an array of Term objects, along with their various methods
class Sentence {

  constructor(str) {
    this.str = str || '';
    const terms = str.split(' ');
    this.terms = terms.map(function(s) {
      return new Term(s);
    });
    this.terms = tagger(this);
  }

  //Sentence methods:

  //insert a new word at this point
  addBefore(i, str) {
    let t = new Term(str);
    this.terms.splice(i, 0, t);
  }
  addAfter(i, str) {
    let t = new Term(str);
    this.terms.splice(i + 1, 0, t);
  }

  //the ending punctuation
  terminator() {
    const allowed = ['.', '?', '!'];
    const punct = this.str.slice(-1) || '';
    if (allowed.indexOf(punct) !== -1) {
      return punct;
    }
    return '.';
  }

  //part-of-speech assign each term
  tag() {
    this.terms = tagger(this);
    return this.terms;
  }

  //is it a question/statement
  sentence_type() {
    const char = this.terminator();
    const types = {
      '?': 'interrogative',
      '!': 'exclamative',
      '.': 'declarative',
    };
    return types[char] || 'declarative';
  }

  // A was verbed by B - B verbed A
  is_passive() {
    return passive_voice(this);
  }
  // john walks quickly -> john walked quickly
  to_past() {
    this.terms.forEach(function(t) {
      if (t instanceof pos.Verb) {
        t.to_past();
      }
    });
    return this;
  }
  // john walked quickly -> john walks quickly
  to_present() {
    this.terms.forEach(function(t) {
      if (t instanceof pos.Verb) {
        t.to_present();
      }
    });
    return this;
  }
  // john walked quickly -> john will walk quickly
  to_future() {
    this.terms.forEach(function(t) {
      if (t instanceof pos.Verb) {
        t.to_future();
      }
    });
    return this;
  }

  //convert "he'd go" to "he would go"
  //the hard part is already done, just flip them
  render_contractions() {
    this.terms.forEach(function(t) {
      if (t.implicit) {
        t.changeTo(t.implicit);
        t.implicit = '';
      }
    });
    return this;
  }

  //map over Term methods
  text() {
    return fns.pluck(this.terms, 'text').join(' ');
  }
  //like text but for cleaner text
  normalized() {
    return fns.pluck(this.terms, 'normal').join(' ');
  }
  //return only the POS tags
  tags() {
    return fns.pluck(this.terms, 'tag');
  }
  syllables() {
    return this.terms.reduce(function(arr, t) {
      arr = arr.concat(t.syllables());
      return arr;
    }, []);
  }
  //mining for specific things
  people() {
    return this.terms.filter(function(t) {
      return t.pos['Person'];
    });
  }
  places() {
    return this.terms.filter(function(t) {
      return t.pos['Place'];
    });
  }
  dates() {
    return this.terms.filter(function(t) {
      return t.pos['Date'];
    });
  }
  organisations() {
    return this.terms.filter(function(t) {
      return t.pos['Organisation'];
    });
  }
  values() {
    return this.terms.filter(function(t) {
      return t.pos['Value'];
    });
  }
}

Sentence.fn = Sentence.prototype;

module.exports = Sentence;
