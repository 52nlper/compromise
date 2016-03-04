'use strict';
// parse a search lookup term find the regex-like syntax in this term
const fns = require('../../fns.js');
// flags:
// {
//   pos: true,
//   optional: true,
//   alias: true,
//   leading: true,
//   trailing: true,
//   any_one: true,
//   any_many: true,
// }


const parse_term = function(term, i) {
  term = term || '';
  term = term.trim();
  let signals = {};
  //pos flag
  if (fns.startsWith(term, '[') && fns.endsWith(term, ']')) {
    term = term.replace(/\]$/, '');
    term = term.replace(/^\[/, '');
    signals.pos = true;
  }
  //optional flag
  if (fns.endsWith(term, '?')) {
    term = term.replace(/\?$/, '');
    signals.optional = true;
  }
  //alias flag
  if (fns.startsWith(term, '~') && fns.endsWith(term, '~')) {
    term = term.replace(/^\~/, '');
    term = term.replace(/\~$/, '');
    signals.alias = true;
  }
  //leading ^ flag
  if (fns.startsWith(term, '^')) {
    term = term.substr(1, term.length);
    signals.leading = true;
  }
  //trailing $ flag means ending
  if (fns.endsWith(term, '$')) {
    term = term.replace(/\$$/, '');
    signals.trailing = true;
  }
  //a period means anything
  if (term === '.') {
    signals.any_one = true;
  }
  //a * means anything
  if (term === '*') {
    signals.any_many = true;
  }
  return {
    term,
    signals,
    i
  };
};
console.log(parse_term('~fun~?'));


//turn a match string into an array of objects
const parse_all = function(str) {
  str = str || '';
  str = str.replace(/ +/, ' ');
  str = str.trim();
  return str.split(' ').map(parse_term);
};

module.exports = parse_all;
