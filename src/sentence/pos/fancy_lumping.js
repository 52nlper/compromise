//fancy combining/chunking of terms
'use strict';
const pos = require('./parts_of_speech');

const shouldLumpThree = function(a, b, c) {
  if (!a || !b || !c) {
    return false;
  }
  const lump_rules = [
    {
      condition: (a.pos.Noun && b.text === '&' && c.pos.Noun), //John & Joe's
      result: 'Person',
    },
    {
      condition: (a.pos.Noun && b.text === 'N' && c.pos.Noun), //John N Joe's
      result: 'Person',
    },
    {
      condition: (a.pos.Date && b.normal === 'the' && c.pos.Value), //June the 5th
      result: 'Date',
    },
    {
      condition: (a.pos.Value && b.pos.Preposition && c.pos.Date), //June the 5th
      result: 'Date',
    },
    {
      condition: (a.is_capital() && b.normal === 'of' && c.is_capital()), //President of Mexico
      result: 'Noun',
    },
    {
      condition: (a.text.match(/^["']/) && !b.text.match(/["']/) && c.text.match(/["']$/)), //three-word quote
      result: 'Noun',
    },
    {
      condition: (a.normal === 'will' && b.normal === 'have' && b.pos.Verb), //will have walk
      result: 'FutureTense',
    },
  ];
  for(let i = 0; i < lump_rules.length; i++) {
    if (lump_rules[i].condition) {
      return lump_rules[i].result;
    }
  }
  return false;
};

const shouldLumpTwo = function(a, b) {
  if (!a || !b) {
    return false;
  }
  //don't chunk non-word things with word-things
  if (a.is_word() === false || b.is_word() === false) {
    return false;
  }
  const lump_rules = [
    {
      condition: (a.pos.Person && b.pos.Honourific || a.pos.Honourific && b.pos.Person), //"John sr."
      result: 'Person',
    },
    {
      condition: (a.pos.Honourific && b.is_capital()), //'Dr. John
      result: 'Person',
    },
    {
      condition: (a.pos.Person && b.is_capital()), //'Person, Capital -> Person'
      result: 'Person',
    },
    {
      condition: (a.pos.Date && b.pos.Value), //June 4
      result: 'Date',
    },
    {
      condition: (a.pos.Value && b.pos.Date), //4 June
      result: 'Date',
    },
    {
      condition: (a.pos.Noun && b.pos.Actor), //Aircraft designer
      result: 'Actor',
    },
    {
      condition: (a.pos.Value && b.pos.Noun), //5 books
      result: 'Value',
    },
    {
      condition: (a.is_capital() && b.pos['Organization'] || b.is_capital() && a.pos['Organization']), //Canada Inc
      result: 'Organization',
    },
    {
      condition: (a.text.match(/^["']/) && b.text.match(/["']$/)), //two-word quote
      result: 'Noun',
    },
    {
      condition: (a.normal === 'will' && b.pos.Verb), //will walk (perfect)
      result: 'PerfectTense',
    },
    {
      condition: (a.normal.match(/^will ha(ve|d)$/) && b.pos.Verb), //will have walked (pluperfect)
      result: 'PluperfectTense',
    },
  ];
  for(let i = 0; i < lump_rules.length; i++) {
    if (lump_rules[i].condition) {
      return lump_rules[i].result;
    }
  }
  return false;
};


const fancy_lumping = function(terms) {
  for(let i = 1; i < terms.length; i++) {
    let a = terms[i - 1];
    let b = terms[i];
    let c = terms[i + 1];

    // rules for lumping two terms
    let tag = shouldLumpTwo(a, b);
    if (tag) {
      let Cl = pos.classMapping[tag] || pos.Term;
      terms[i] = new Cl(a.text + ' ' + b.text, tag);
      terms[i].reason = 'lumpedtwo(' + terms[i].reason + ')';
      terms[i - 1] = null;
      continue;
    }

    // rules for lumpting three terms
    if (c) {
      tag = shouldLumpThree(a, b, c);
      if (tag) {
        let Cl = pos.classMapping[tag] || pos.Term;
        terms[i - 1] = new Cl([a.text, b.text, c.text].join(' '), tag);
        terms[i - 1].reason = 'lumpedThree(' + terms[i].reason + ')';
        terms[i] = null;
        terms[i + 1] = null;
        continue;
      }
    }

  }
  //remove killed terms
  terms = terms.filter(function(t) {
    return t !== null;
  });
  return terms;
};


module.exports = fancy_lumping;
