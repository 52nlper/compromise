'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// require('./src/log').enable();

//bug 1.
// const m = nlp('what is 10 and 10?');
// m.values().toNumber();
// m.check();

var r = nlp(`he is cool. john was cool. He is really nice.`);
var arr = r.out('startgram', 2);
console.log(arr);
// r.verbs().out('text');
// r.verbs().out('array');
// r.verbs().out('html');
// r.verbs().out('json');
// r.verbs().out('pretty');
// r.verbs().out('debug');

// r.verbs().out('ngram');
// r.verbs().out('bigram');
// r.verbs().out('trigram');
// r.verbs().out('startgram');
// r.verbs().out('endgram');

// r.verbs().out('frequency');

// r.check();
// console.log(r.plaintext());
