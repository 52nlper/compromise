'use strict';
const Text = require('../../index');

class Adverbs extends Text {
  data() {
    return this.mapTerms((t) => {
      return {
        adjectiveForm: t.adverb.adjectiveForm(),
      };
    });
  }
  static find(r){
    return r.match('#Adverb+');
  }
}

module.exports = Adverbs;
