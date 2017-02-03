'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// nlp.verbose('tagger');

//bug 1. - support greedy +
// var arr = nlp('would have not had been walking').match('#Auxillary+ #Verb').check();

//bug 2. - gerund as nouns
// nlp('i like running').sentences().toNegative().check();

var m = nlp('he eats the alligator. it will be good.');
// var neg = m.clone().sentences().toNegative();
var past = m.clone().sentences(1).toPastTense();
// var pres = m.clone().sentences().toPresentTense();
// var adv = m.clone().verbs().insertBefore('really');
console.log(m.out());
console.log(past.out());
