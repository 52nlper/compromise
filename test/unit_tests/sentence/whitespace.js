'use strict';
let nlp = require('../../../src/index.js');

describe('preserve whitespace in sentence', function() {
  let tests = [
    'John Smith',
    'John   Smith',
    'John Smith  ',
    'John   Smith  ',
    ' John',
    ' John   Smith  ',
    //no joins
    'he is nice',
    'he   is nice',
    'he   is   nice',
    'he   is   nice  ',
    '  he   is   nice  ',
    //contractions
    `he isn't nice`,
    `he  isn't nice`,
    `he isn't  nice`,
    `he isn't     nice   `,
    `    he   isn't     nice   `,
    //multiples
    'it is ipso facto',
    'it is ipso facto  ',
    'it is   ipso facto  ',
    'it is   ipso    facto  ',
    '2nd of march, 2015'
  ];
  tests.forEach(function(a) {
    let s = nlp.sentence(a);
    it(a, function(done) {
      (s.text()).should.equal(a);
      done();
    });
  });
});

describe('preserve whitespace between sentences', function() {
  let tests = [
    'John Smith is nice.',
    '   John Smith is nice.',
    '   John Smith is nice.   ',
    'John Smith is nice. He lives in Spain.',
    'John Smith is nice.    He lives in Spain.',
    'John Smith is nice.    He lives in Spain.  ',
    '    John Smith is nice.    He lives in Spain.  ',
    'Dr. Smith is nice.  He lives in Spain.  ',
    '    Dr. Smith is nice.    He lives in Spain.  ',
    'Dr. Smith is nice?  He lives in Spain.  ',
    '    Dr. Smith is nice?    He lives in Spain?  ',
    '    Dr. Smith is nice?    He lives in UCLA?  He does? ',
    '    Dr. Smith is nice?    He lives in Spain?  He does?? ',
  ];
  tests.forEach(function(a) {
    let t = nlp.text(a);
    it(a, function(done) {
      (t.text()).should.equal(a);
      done();
    });
  });
});

describe('preserve whitespace with contractions', function() {
  let tests = [
    ['John\'s    nice.', 'John is    nice.'],
    ['John Smith\'s    nice.', 'John Smith is    nice.'],
    ['John isn\'t    nice.', 'John is not    nice.'],
    ['John didn\'t    go.', 'John did not    go.'],
    ['I wanna    go.', 'I want to    go.'],
    ['they\'ve    gone.', 'they have    gone.'],
  ];
  tests.forEach(function(a) {
    let t = nlp.text(a[0]);
    t.contractions.expand();
    it(a, function(done) {
      (t.text()).should.equal(a[1]);
      done();
    });
  });
});
