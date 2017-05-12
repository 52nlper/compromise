'use strict';
const irregulars = require('../../../data').irregular_plurals;
const rules = require('./methods/data/indicators');
const prep = /([a-z]*) (of|in|by|for) [a-z]/;
const hasPlural = require('./hasPlural');


const knownPlural = {
  i: false,
  he: false,
  she: false,
  we: true,
  they: true,
};

//is it potentially plural?
const noPlural = [
  'Place',
  'Value',
  'Person',
  'Month',
  'WeekDay',
  'RelativeDay',
  'Holiday',
];
//first, try to guess based on existing tags
const couldEvenBePlural = function(t) {
  if (hasPlural(t) === false) {
    return false;
  }
  for (let i = 0; i < noPlural.length; i++) {
    if (t.tags[noPlural[i]]) {
      return false;
    }
  }
  return true;
};

const isPlural = function (t) {
  let str = t.normal;

  //whitelist a few easy ones
  if (knownPlural[str] !== undefined) {
    return knownPlural[str];
  }
  //inspect the existing tags to see if a plural is valid
  if (couldEvenBePlural(t) === false) {
    return false;
  }
  //handle 'mayors of chicago'
  const preposition = str.match(prep);
  if (preposition !== null) {
    str = preposition[1];
  }
  // if it's a known irregular case
  if (irregulars.toSingle[str]) {
    return true;
  }
  if (irregulars.toPlural[str]) {
    return false;
  }
  //check the suffix-type rules for indications
  for (let i = 0; i < rules.plural_indicators.length; i++) {
    if (rules.plural_indicators[i].test(str) === true) {
      return true;
    }
  }
  for (let i = 0; i < rules.singular_indicators.length; i++) {
    if (rules.singular_indicators[i].test(str) === true) {
      return false;
    }
  }
  // a fallback 'looks check plural' rule..
  if (/s$/.test(str) === true && /ss$/.test(str) === false && str.length > 3) { //needs some lovin'
    return true;
  }
  return false;
};

module.exports = isPlural;
// console.log(is_plural('octopus') === false)
