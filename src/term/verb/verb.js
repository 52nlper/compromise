'use strict';
const Term = require('../term.js');
const conjugate = require('./conjugate/conjugate.js');
const predict_form = require('./conjugate/predict_form.js');
const negate = require('./negate.js');

const verbTags = {
  infinitive: 'Verb',
  present: 'PresentTense',
  past: 'PastTense',
  gerund: 'Gerund',
  actor: 'Actor',
  future: 'FutureTense',
  pluperfect: 'PluperfectTense',
  perfect: 'PerfectTense',

  PerfectTense: 'PerfectTense',
  PluperfectTense: 'PluperfectTense',
  FutureTense: 'FutureTense',
  PastTense: 'PastTense',
};

class Verb extends Term {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos['Verb'] = true;
    this.conjugations = {}; //cached conjugations
    //if we've been told which
    if (tag && verbTags[tag]) {
      this.pos[tag] = true;
      this.conjugations[tag] = this.normal;
    } else {
      this.form();
    }
  }

  //which current conjugation form it is
  form() {
    //if we haven't been told
    if (!this.tag) {
      this.tag = predict_form(this.normal);
    }
    return this.tag;
  }

  //retrieve a specific form
  conjugation() {
    //check cached conjugations
    this.conjugations = this.conjugate();
    let keys = Object.keys(this.conjugations);
    for(let i = 0; i < keys.length; i++) {
      if (this.conjugations[keys[i]] === this.normal) {
        return keys[i];
      }
    }
    return predict(this.normal);
  }

  conjugate() {
    this.conjugations = conjugate(this.normal);
    return this.conjugations;
  }
  to_past() {
    let tense = 'past';
    if (!this.conjugations[tense]) {
      this.conjugate(this.normal);
    }
    this.tag = verbTags[tense];
    this.changeTo(this.conjugations[tense]);
    return this.conjugations[tense];
  }
  to_present() {
    let tense = 'present';
    if (!this.conjugations[tense]) {
      this.conjugate(this.normal);
    }
    this.tag = verbTags[tense];
    this.changeTo(this.conjugations[tense]);
    return this.conjugations[tense];
  }
  to_future() {
    let tense = 'future';
    if (!this.conjugations[tense]) {
      this.conjugate(this.normal);
    }
    this.tag = verbTags[tense];
    this.changeTo(this.conjugations[tense]);
    return this.conjugations[tense];
  }


  //is this verb negative already?
  isNegative() {
    const str = this.normal;
    if (str.match(/(n't|\bnot\b)/)) {
      return true;
    }
    return false;
  }

  negate() {
    if (this.isNegative()) {
      return this.text;
    }
    this.changeTo(negate(this));
    return this.text;

  }

}

// let v = new Verb("walk", "asdf")
// console.log(v.form())

module.exports = Verb;
