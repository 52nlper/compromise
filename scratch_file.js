'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// nlp.verbose('tagger');

//bug 1. - support greedy +
// var arr = nlp('would have not had been walking').match('#Auxillary+ #Verb').check();

console.log('------');
// var m = nlp('he\'d be nice');
// m.contractions().expand();
// m.verbs().toNegative().check();




//insertBefore
//insertAfter

//replace


var r = nlp('i didn\'t want to frighten away');
// r = r.values().toTextValue();
// console.log(numV.toNiceNumber().out('text'));
console.log(r.verbs().toNegative().out());
// r.match('walked').insertBefore('not').
