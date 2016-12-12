'use strict';
const Text = require('../../index');
const contract = require('./contract');

class Contractions extends Text {
  parse() {
    return this.terms().map((t) => {
      return {
        text: t.text
      };
    });
  }
  expand() {
    this.list.forEach((ts) => {
      ts.terms.forEach((t) => {
        if (t.silent_term) {
          if (!t.text) {
            t.whitespace.before = ' ';
          }
          t.text = t.silent_term;
          t.unTag('Contraction', 'expanded');
        }
      });
    });
    return this.all();
  }
  contract() {
    return contract(this.all());
  }
  static find(r) {
    return r.match('#Contraction+');
  }
}

module.exports = Contractions;
