'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// const Term = require('./src/term');
// const corpus = require('nlp-corpus');
// const nlp = require('./builds/nlp_compromise');

// require('./src/logger').enable();
const context = {
  lexicon: {
    'donkey kong': 'Person',
    march: 'Person'
  }
};
// let txt = corpus.parsed.weezer().sweatersong;

// var m = nlp('the cat is nice').replace('cat', 'stinky dog');
// var str = '984767';
// var m = nlp(str).splitAfter('#Comma')
// var m = nlp(str).values().toTextValue()
var m = nlp('2nd of march', context).values().toTextValue()
  //.append('really')
  // var m = nlp(str).match('#Comma')
m.check()
  // console.log(m)
