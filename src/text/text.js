'use strict';
//a Text() is a list of sentences, which are a list of Terms
const fns = require('../fns');
// const debug = require('../debug');
const logger = require('../logger');
let log = function() {}
const Sentence = require('../sentence/sentence');
const split_sentences = require('./split_sentences');
const get = require('./get/get');
const transform = require('./transform/transform');
const render = require('./render/render');

class Text {
  constructor(str, context) {
    this.input = fns.ensureString(str);
    this.context = fns.ensureObject(context);
    // log = logger(this.context.debug, 'text')
    this.sentences = split_sentences(this.input);
    this.sentences = this.sentences.map((s) => {
      let c = fns.copy(context);
      c.parent = this; //give it our ref
      return new Sentence(s, c);
    });
    log(this)
  }

  //change the text, return this
  to(method) {
    if (fns.isFunction(method)) {
      return method(this);
    }
    //is it known?
    if (transform[method]) {
      log('====' + method + '====')
      return transform[method](this);
    }
    return this;
  }

  //get, analyze, return boolean
  is(method) {
    if (fns.isFunction(method)) {
      return method(this);
    }
    return false;
  }

  //get some data back
  get(method) {
    if (fns.isFunction(method)) {
      return method(this);
    }
    //is it known?
    if (get[method]) {
      return get[method](this);
    }
    return null;
  }

  //return it as something
  as(method) {
    if (fns.isFunction(method)) {
      return method(this);
    }
    //is it known?
    if (render[method]) {
      return render[method](this);
    }
    return '';
  }
}
module.exports = Text;
