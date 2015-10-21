'use strict';
const Term = require('../term.js');
const conjugate = require('./conjugate/conjugate.js');
const predict_form = require('./conjugate/predict_form.js');

const allowed_forms = {
  infinitive: 1,
  present: 1,
  past: 1,
  gerund: 1,
  doer: 1,
  future: 1
};

class Verb extends Term {
  constructor(str, form) {
    super(str);
    this.parent = 'verb';
    this.conjugations = {}; //cached conjugations
    //if we've been told which
    if (form && allowed_forms[form]) {
      this._form = form;
      this.conjugations[form] = this.normal;
    } else {
      this.form();
    }
  }

  //which current conjugation form it is
  form() {
    //if we haven't been told
    if (!this._form) {
      this._form = predict_form(this.normal);
    }
    //else, predict it
    return this._form;
  }

  //retrieve a specific form
  conjugation(type) {
    type = type || 'infinitive';
    //check cached conjugations
    if (this.conjugations[type] === undefined) {
      this.conjugate();
    }
  }

  //is this verb negative already?
  isNegative() {
    const str = this.normal;
    if (str.match(/n't$/)) {
      return true;
    }
    if (str.match(/ not$/)) {
      return true;
    }
    return false;
  }

  conjugate() {
    this.conjugations = conjugate(this.normal);
    return this.conjugations;
  }
  to_past() {
    if (!this.conjugations['past']) {
      this.conjugate(this.normal);
    }
    this._form = 'past';
    this.text = this.conjugations['past'];
    this.normalize();
    return this.conjugations['past'];
  }
  to_present() {
    if (this.conjugations['present']) {
      return this.conjugations['present'];
    }
    this.conjugations = conjugate(this.normal);
  }
  to_future() {
    this.conjugations = conjugate(this.normal);
    return this.conjugations['future'];
  }
}

// let v = new Verb("walk", "asdf")
// console.log(v.form())

module.exports = Verb;
