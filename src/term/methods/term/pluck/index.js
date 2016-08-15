'use strict';
// methods for cherrypicking other terms related to this one
const term = {
  next(t) {
    let index = t.info('Index');
    return t.context.sentence._terms[index + 1];
  },
  before(t) {
    let index = t.info('Index');
    return t.context.sentence._terms[index - 1];
  }
};

module.exports = term;
