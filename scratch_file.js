'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// const corpus = require('nlp-corpus');
// const nlp = require('./builds/nlp_compromise');

// require('./src/logger').enable();
// const context = {
//   lexicon: {
//     'donkey kong': 'Person'
//   }
// };
// let r = nlp(corpus.parsed.sotu().obama_2012);
// r.phrases();

// console.log(require('nlp-corpus').text);
// var corpus = require('nlp-corpus').text.friends();

// let r = nlp('Air France is cool');
// let r = nlp('guinea-bissau');

// let r = nlp(`june 5th-7th at 3pm`);
let r = nlp('i\'d buy apples');
r.nouns().toSingular();
// r.verbs().toPast();
// r.normalize();
// r.check();
console.log(r.normal());
