'use strict';
const p = require('../paths');
const lexicon = p.lexicon;
const log = p.log;
const path = 'tagger/lexicon';

const check_lexicon = (str, sentence) => {
  //check a user's custom lexicon
  let custom = sentence.context.lexicon || {};
  if (custom[str]) {
    return custom[str];
  }
  if (lexicon[str]) {
    return lexicon[str];
  }
  return null;
};

const lexicon_pass = function(s) {
  log.here(path);
  let found;
  //loop through each term
  for (let i = 0; i < s.terms.length; i++) {
    let t = s.terms[i];
    //basic term lookup
    found = check_lexicon(t.normal, s);
    if (found) {
      t.tagAs(found, 'lexicon-match');
      continue;
    }
    //support contractions (manually)
    let parts = t.term.contraction();
    if (parts && parts.start) {
      found = check_lexicon(parts.start.toLowerCase(), s);
      if (found) {
        t.tagAs(found, 'contraction-lexicon');
        continue;
      }
    }
    //support silent_term matches
    found = check_lexicon(t.silent_term, s);
    if (t.silent_term && found) {
      t.tagAs(found, 'silent_term-lexicon');
      continue;
    }
    //multiple-words / hyphenation
    let words = t.normal.split(/[ -]/);
    if (words.length > 1) {
      found = check_lexicon(words[words.length - 1], s);
      if (found) {
        t.tagAs(found, 'multiword-lexicon');
        continue;
      }
    }
  }
  return s;
};

module.exports = lexicon_pass;
