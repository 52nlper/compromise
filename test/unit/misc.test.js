var test = require('tape');
var nlp = require('./lib/nlp');

var garbage = [
  '',
  '  ',
  null,
  '\n\n', [], {},
];
test('garbage:', function (t) {
  garbage.forEach(function (g, i) {
    var num = nlp(g).list.length;
    var msg = (typeof g) + ' text input #' + i;
    t.equal(num, 0, msg);
  });
  t.end();
});

test('misc:', function (t) {
  var str = '2 million five hundred thousand and fifty nine is bigger than 2882';
  var m = nlp(str);
  m.values().toNumber();
  t.equal(m.out('normal'), '2500059 is bigger than 2882', str);

  str = '2 million five hundred thousand and fifty nine is bigger than 2882';
  m = nlp(str);
  m.values().toNiceNumber();
  t.equal(m.out('text'), '2,500,059 is bigger than 2,882', str);

  str = 'doug is 5 years old';
  m = nlp(str);
  m.values().toTextValue();
  t.equal(m.out('normal'), 'doug is five years old', str);

  // str = 'men go';
  // m = nlp(str).sentences().toPast().nouns().toSingular();
  // t.equal(m.out('normal'), 'a man went', str);
  t.end();
});
