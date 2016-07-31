'use strict';
//set a term as a particular Part-of-speech
const log = require('../log');
const info = require('./info');
const is_methods = require('./is');
const transforms = require('./transforms');
const tagset = require('../tagset');
const fns = require('../fns');
const path = 'tagger';

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

const set_tag = function(term, tag, reason) {
  log.tag(term, tag, reason, path);
  //reset term, if necessary
  if (canBe(term, tag) === false) {
    term.pos = {};
    term.transforms = {};
    term.infos = {};
    term.is_methods = {};
  }
  if (!tagset[tag]) {
    console.warn('unknown tag ' + tag + ' - ' + reason);
    return;
  }
  let tags = tagset[tag].is;
  for (let i = 0; i < tags.length; i++) {
    term.pos[tags[i]] = true;
    term.transforms = Object.assign({}, term.transforms, transforms[tags[i]])
    term.infos = Object.assign({}, term.infos, info[tags[i]])
    term.is_methods = Object.assign({}, term.is_methods, is_methods[tags[i]])
  }
  return;
};

module.exports = {
  set_tag: set_tag,
  canBe: canBe
};
