//the lexicon is a big hash of words to pos tags
//it's built by conjugating and inflecting a small seed of terms
'use strict';
const fns = require('./fns.js');
const verb_conjugate = require('./term/verb/conjugate/conjugate.js');
const grand_mapping = require('./sentence/pos/pos.js').tag_mapping;

const lexicon = {};

const addObj = function(obj) {
  const keys = Object.keys(obj);
  const l = keys.length;
  for (let i = 0; i < l; i++) {
    lexicon[keys[i]] = obj[keys[i]];
  }
};

const addArr = function(arr, tag) {
  const l = arr.length;
  for (let i = 0; i < l; i++) {
    lexicon[arr[i]] = tag;
  }
};

//conjugate all verbs.
let verb_forms = {
  infinitive: 'Infinitive',
  past: 'PastTense',
  gerund: 'Gerund',
  present: 'PresentTense',
  actor: 'Actor',
  participle: 'Participle',
};
const verbs = require('./data/verbs.js');
for (let i = 0; i < verbs.length; i++) {
  const c = verb_conjugate(verbs[i]);
  Object.keys(c).forEach(function(k) {
    if (k && verb_forms[k]) {
      lexicon[c[k]] = verb_forms[k];
    }
  });
}
//irregular verbs
require('./data/verb_irregulars.js').forEach(function(o) {
  Object.keys(o).forEach(function(k) {
    if (k && verb_forms[k]) {
      lexicon[o[k]] = verb_forms[k];
    }
  });
});

let orgs = require('./data/organisations.js');
addArr(orgs.organisations, 'Noun');
addArr(orgs.suffixes, 'Noun');

let places = require('./data/places.js');
addArr(places.countries, 'Place');
addArr(places.cities, 'Place');

addArr(require('./data/adjectives.js'), 'Adjective');
addObj(require('./data/convertables.js'));

addArr(require('./data/abbreviations.js').abbreviations, 'Abbreviation');
addArr(require('./data/demonyms.js'), 'Adjective');
addArr(require('./data/honourifics.js'), 'Honourific');
addArr(require('./data/uncountables.js'), 'Noun');
addArr(require('./data/dates.js'), 'Date');
addArr(require('./data/numbers.js'), 'Value');
//a little fancy
addArr(Object.keys(require('./data/firstnames.js')), 'Person');
//add irregular nouns
const irregNouns = require('./data/irregular_nouns.js');
addArr(fns.pluck(irregNouns, 0), 'Noun');
addArr(fns.pluck(irregNouns, 1), 'Plural');

addObj(require('./data/misc.js'));
addObj(require('./data/multiples.js'));
addObj(require('./data/phrasal_verbs.js'));

//just in case
delete lexicon[false];
delete lexicon[true];
delete lexicon[undefined];
delete lexicon[null];
delete lexicon[''];

//use 'Noun', not 'NN'
Object.keys(lexicon).forEach(function(k) {
  if (!grand_mapping[lexicon[k]]) {
    // console.log(lexicon[k]);
  }
  lexicon[k] = grand_mapping[lexicon[k]] || lexicon[k];
});


// console.log(Object.keys(lexicon).length)
// console.log(lexicon)

// console.log(lexicon['once again'] === 'RB');
// console.log(lexicon['seven'] === 'Value');
// console.log(lexicon['sleep'] === 'VBP');
// console.log(lexicon['slept'] === 'VBD');
// console.log(lexicon['sleeping'] === 'VBG');
// console.log(lexicon['canadian'] === 'JJ');
// console.log(lexicon['july'] === 'Value');
// console.log(lexicon[null] === undefined);
// console.log(lexicon['dr'] === 'NNAB');
// console.log(lexicon['sounds'] === 'VBZ');
// console.log(lexicon['look after'] === 'VBP');
// console.log(lexicon['tony'] === 'Noun');
// console.log(lexicon['loaf'] === 'Noun');
// console.log(lexicon['loaves'] === 'NNS');
// console.log(lexicon['he'] === 'PRP');
// console.log(lexicon['canada'] === 'Noun');
// console.log(lexicon['short']);

module.exports = lexicon;
