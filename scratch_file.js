'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// nlp.verbose('tagger');

//bug 1. - support greedy +
// var arr = nlp('would have not had been walking').match('#Auxillary+ #Verb').check();

//bug 2. - gerund as nouns
// nlp('i like running').sentences().toNegative().check();


var m = nlp('everyone is nice');
console.log(m.terms().not(['everyone']).data());
