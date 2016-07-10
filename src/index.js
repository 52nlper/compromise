'use strict';
const Text = require('./text/Text')

const nlp = function(str, context) {
  return new Text(str, context)
};

module.exports = nlp;


// console.log(nlp('john is cool. he swims').sentences[0].return('text'))
// console.log(nlp('john is cool. he swims').return('text'))
// nlp('john is cool').is('Question');
//
// import futureTense from 'someLibrary';
// nlp('john is cool').to(futureTense).as('normal');
//
// import hulkMode from 'hulkify';
// nlp('john is cool').to(hulkMode).as('html');
//
// nlp('john is cool').get(wordCount);
// nlp('john is cool').get(ngrams);
// nlp('john is cool').get('Nouns');

// nlp('winning').to('infinitive').as('normal');
// nlp('sunblock').to('plural').as('text');
// nlp('5 horses').get('plural').as('json');

// nlp('vacuum').to('Noun').get('article');
// 'a'