'use strict';
//use this file for messing around.
//... it is not included in the build
// console.log('\n\n\n\n');

const nlp = require('./src/index');
const tags = require('./src/tagset');
const log = require('./src/log');
const Term = require('./src/term/term');

log.disable();

// nlp('  john f.   kennedy  ').render('pretty');
// nlp('6 am').render('pretty');
// nlp('3$8').render('pretty');
// console.log(nlp('five hundredth').info('terms')[0].is('textOrdinal'));
// console.log(nlp('five hundred').info('terms')[0].is('textCardinal'));
// console.log(nlp('500').info('terms')[0].is('numberCardinal'));
console.log(nlp('five hundred and 7 point 2 nine').info('terms')[0].info('number'));
// let r = nlp('He will walk. Is John cool? It said so.')
// r.render('pretty')
// console.log(r.if('Noun').is('Person'))
// console.log(r.if('Verb').to('Normal').render('text'))
// console.log(r.render('text'))
// console.log(t.info('after').map((t) => t.normal));
// nlp('the united kingdom is really nice.').render('pretty');
// nlp('he said i\'m very nice').render('pretty');
// nlp('i dunno about').to('titleCase').render('pretty');
// console.log(nlp('hello. <script>alert(\'hji\')</script> so<br/> yeah').render('html'));
// console.log(t.is('Singular'));

// console.log(nlp('apples').sentences[0].terms[0].info('Conjugations'));
