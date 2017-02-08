'use strict';
const Terms = require('../../paths').Terms;
const conjugate = require('./methods/conjugate');
const toAdjective = require('./methods/toAdjective');
const interpret = require('./interpret');
const toNegative = require('./toNegative');

class Verb extends Terms {
  constructor(arr, lexicon, refText, refTerms) {
    super(arr, lexicon, refText, refTerms);
    this.negative = this.match('#Negative');
    this.adverbs = this.match('#Adverb');
    let aux = this.clone().not('(#Adverb|#Negative)');
    this.verb = aux.match('#Verb').last().list[0].terms[0];
    this.auxillary = aux.match('#Auxillary+');
  }
  data(debug) {
    return {
      text: this.out('text'),
      normal: this.out('normal'),
      parts: {
        negative: this.negative.out('normal'),
        auxillary: this.auxillary.out('normal'),
        verb: this.verb.out('normal'),
        adverbs: this.adverbs.out('normal'),
      },
      interpret: interpret(this, debug),
      conjugations: this.conjugate()
    };
  }

  conjugate(debug) {
    return conjugate(this, debug);
  }

  /** negation **/
  isNegative() {
    return this.match('#Negative').list.length === 1;
  }
  isPerfect() {
    return this.auxillary.match('(have|had)').found;
  }
  toNegative() {
    if (this.isNegative()) {
      return this;
    }
    return toNegative(this);
  }
  toPositive() {
    return this.remove('#Negative');
  }

  /** conjugation **/
  toPastTense() {
    let obj = this.conjugate();
    return this.replaceWith(obj.PastTense);
  }
  toPresentTense() {
    let obj = this.conjugate();
    return this.replaceWith(obj.Infinitive);
  }
  toFutureTense() {
    let obj = this.conjugate();
    return this.replaceWith(obj.FutureTense);
  }
  toInfinitive() {
    let obj = this.conjugate();
    //NOT GOOD. please fix
    this.terms[this.terms.length - 1].text = obj.Infinitive;
    return this;
  }

  asAdjective() {
    return toAdjective(this.verb.out('normal'));
  }

}
module.exports = Verb;
