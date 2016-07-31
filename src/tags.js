'use strict';
//the POS tags we use, according to their dependencies
const tree = {
  Noun: {
    Singular: {
      Pronoun: true,
      Person: {
        MalePerson: true,
        FemalePerson: true
      },
      Place: {
        Country: true,
        City: true
      },
      Organization: true,
      Value: {
        Currency: true,
        Ordinal: true,
        Cardinal: true,
        TextValue: true,
        NumberValue: true
      },
      Date: true
    },
    Plural: true,
    Actor: true,
    Unit: true,
    Demonym: true
  },
  Verb: {
    PresentTense: {
      Infinitive: true,
      Gerund: true
    },
    PastTense: true,
    PerfectTense: true,
    Pluperfect: true,
    FuturePerfect: true,
    Copula: true,
    Modal: true,
    Auxillary: true,
    PhrasalVerb: true,
    Negative: true
  },
  Adjective: {
    Comparative: true,
    Superlative: true
  },
  Adverb: true,
  Glue: {
    Determiner: true,
    Conjunction: true,
    Preposition: true
  },
  Condition: true,
  Possessive: true,
  QuestionWord: true,
  Expression: true
};

//make tags
let tags = {};
//recursively add them, with is
const add_tags = (obj, is) => {
  Object.keys(obj).forEach((k) => {
    tags[k] = is;
    if (obj[k] !== true) {
      add_tags(obj[k], is.concat([k])); //recursive
    }
  });
};
add_tags(tree, []);


//make plurals
const irregulars = {
  Person: 'people',
  MalePerson: 'males',
  FemalePerson: 'females',
  City: 'cities',
  Currency: 'currencies',
  Country: 'countries'
}
let plurals = Object.keys(tags).reduce((h, tag) => {
  if (irregulars[tag]) {
    h[irregulars[tag]] = tag
  } else {
    let plural = tag.charAt(0).toLowerCase() + tag.substr(1) + 's'
    h[plural] = tag
  }
  return h
}, {})


module.exports = {
  tags: tags,
  plurals: plurals
}
