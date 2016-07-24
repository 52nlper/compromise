'use strict';
//set a term as a particular Part-of-speech
const info = require('./info');
const transforms = require('./transforms');
const tagset = require('../tagset');
const fns = require('../fns');

//check if the term is compatible with a pos tag.
const canBe = (term, tag) => {
  //already compatible..
  if (term.pos[tag]) {
    return true;
  }
  //unknown tag..
  if (!tagset[tag]) {
    //huh? sure, go for it.
    return true;
  }
  //consult tagset's incompatible tags
  let not = Object.keys(tagset[tag].not);
  for (let i = 0; i < not.length; i++) {
    if (term.pos[not[i]]) {
      return false;
    }
  }
  return true;
};

const set_tag = function(term, tag) {
  //reset term, if necessary
  if (canBe(term, tag) === false) {
    term.pos = {};
    term.transforms = {};
    term.infos = {};
  }
  let tags = tagset[tag].is;
  for (let i = 0; i < tags.length; i++) {
    term.pos[tags[i]] = true;
    fns.extend(term.transforms, transforms[tags[i]]);
    fns.extend(term.infos, info[tags[i]]);
  }
  return;
};

module.exports = set_tag;
