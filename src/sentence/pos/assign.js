'use strict';
const pos = require('./parts_of_speech');
const fns = require('../../fns');

//set the part-of-speech of a particular term
const assign = function (t, tag, reason) {
  let P = pos.classMapping[tag] || pos.Term;
  let implicit = t.implicit;
  t = new P(t.text, tag);
  t.reason = reason;
  t.implicit = implicit;
  return t;
};
module.exports = assign;
