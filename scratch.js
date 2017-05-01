'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
// const corpus = require('nlp-corpus');
// let text = corpus.sotu.parsed()[0];
// const fresh = require('./test/unit/lib/freshPrince.js');

// console.log(nlp('I\'m going to the shops').sentences().toPastTense().out());



console.log(nlp('All my life I\'ve had one dream, to accomplish my many goals.').nouns().isPlural())

console.log(nlp('it\'s his 7th birthday').values().isEqual(7).out('array'))
