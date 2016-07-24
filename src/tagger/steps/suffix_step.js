'use strict';
const log = require('../paths').log;
const rules = require('./data/word_rules');
const path = 'tagger/suffix';

const suffix_step = function(s) {
  log.here(path);
  for (let i = 0; i < s.terms.length; i++) {
    let t = s.terms[i];
    //don't over-write any known tags
    if (Object.keys(s.terms[i].pos).length > 1) {
      continue;
    }
    for (let o = 0; o < rules.length; o++) {
      let r = rules[o];
      if (t.normal.match(r.reg)) {
        t.tag(r.pos, 'suffix-step- "' + r.str + '"');
      }
    }
  }
  return s;
};

module.exports = suffix_step;
