var test = require('tape');
var nlp = require('../lib/nlp');

test('basic is contractions', function(t) {
  let r = nlp(`he is cool.`);
  r.contractions().expand();
  t.equal(r.plaintext(), `he is cool.`, 'expanded-expand');

  r = nlp(`he's cool.`);
  r.contractions().expand();
  t.equal(r.plaintext(), `he is cool.`, 'contracted-expand');

  r = nlp(`he is cool.`);
  r.contractions().contract();
  t.equal(r.plaintext(), `he's cool.`, 'expanded-contract');

  r = nlp(`he's cool.`);
  r.contractions().contract();
  t.equal(r.plaintext(), `he's cool.`, 'contracted-contract');

  t.end();
});

test('negative contractions', function(t) {
  let r = nlp(`please do not eat the marshmellow`);
  r.contractions().expand();
  t.equal(r.plaintext(), `please do not eat the marshmellow`, 'expanded-expand');

  r = nlp(`please don't eat the marshmellow`);
  r.contractions().expand();
  t.equal(r.plaintext(), `please do not eat the marshmellow`, 'contracted-expand');

  r = nlp(`please do not eat the marshmellow`);
  r.contractions().contract();
  t.equal(r.plaintext(), `please don't eat the marshmellow`, 'expanded-contract');

  r = nlp(`please don't eat the marshmellow`);
  r.contractions().contract();
  t.equal(r.plaintext(), `please don't eat the marshmellow`, 'contracted-contract');

  t.end();
});
