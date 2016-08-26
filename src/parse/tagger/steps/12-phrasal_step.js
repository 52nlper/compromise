'use strict';
const log = require('../paths').log;
const phrasals = require('./data/phrasal_verbs');
const path = 'tagger/phrasal';

//words that could be particles
const particles = {
  'away': true,
  'back': true,
  'in': true,
  'out': true,
  'on': true,
  'off': true,
  'over': true,
  'under': true,
  'together': true,
  'apart': true,
  'up': true,
  'down': true
};

//phrasal verbs are compound verbs like 'beef up'
const phrasals_step = function(ts) {
  log.here(path);
  for(let i = 1; i < ts.length; i++) {
    let t = ts.get(i);
    //is it a particle, like 'up'
    if (particles[t.normal]) {
      //look backwards
      let last = ts.get(i - 1);
      if (last.tag.Verb) {
        console.log(last.info('conjugations'));
      }
    }

  }
  return ts;
};

module.exports = phrasals_step;
