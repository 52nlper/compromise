'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// require('./src/log').enable();

//bug 1.
// const m = nlp('what is 10 and 10?');
// m.values().toNumber();
// m.check();

//bug 2

// const m = nlp(`he is nice and musn't walk. The dog should've ate his dinner because it is cold. Ben's cool.`);
// const m = nlp(`blah he's cool. Ben's cool. Zoo's cool. Caddies's cool.`);
// let r = m.contractions();
let r = nlp('five hundred times i said eat 7 berries. he is 7th years old');
r.nouns(); //.check();
// console.log(r.values().plaintext());
r.values().data();
// console.log(m.plaintext());
