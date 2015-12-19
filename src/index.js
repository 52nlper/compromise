'use strict';
const models = {
  Term : require('./term/term.js'),
  Text : require('./text/text.js'),
  Sentence : require('./sentence/sentence.js'),
  Verb : require('./term/verb/verb.js'),
  Adjective : require('./term/adjective/adjective.js'),
  Adverb : require('./term/adverb/adverb.js'),
  Noun : require('./term/noun/noun.js'),
  Value : require('./term/noun/value/value.js'),
  Person : require('./term/noun/person/person.js'),
  Place : require('./term/noun/place/place.js'),
  Date : require('./term/noun/date/date.js'),
  Organisation : require('./term/noun/organisation/organisation.js'),
  Lexicon : require('./lexicon.js'),
};

function NLP(context) {

  context = context || {};
  Object.keys(context).forEach(function(k) {
    if (k === 'Lexicon') {
      Object.keys(context[k]).forEach(function(word) {
        Lexicon[word] = context[k][word];
      });
    } else if (models[k]) {
      Object.keys(context[k]).forEach(function(method) {
        models[k].fn[method] = context[k][method];
      });
    }
  });

  this.term = function(s) {
    return new models.Term(s);
  };
  this.noun = function(s) {
    return new models.Noun(s);
  };
  this.verb = function(s) {
    return new models.Verb(s);
  };
  this.adjective = function(s) {
    return new models.Adjective(s);
  };
  this.adverb = function(s) {
    return new models.Adverb(s);
  };

  this.value = function(s) {
    return new models.Value(s);
  };
  this.person = function(s) {
    return new models.Person(s);
  };
  this.place = function(s) {
    return new models.Place(s);
  };
  this.date = function(s) {
    return new models.Date(s);
  };
  this.organisation = function(s) {
    return new models.Organisation(s);
  };

  this.text = function(s) {
    return new models.Text(s);
  };
  this.sentence = function(s) {
    return new models.Sentence(s);
  };
}

//export to window or webworker
if (typeof window === 'object' || typeof DedicatedWorkerGlobalScope === 'function') {
  self.nlp_compromise = NLP;
}
//export to commonjs
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NLP;
}
//export to amd
if (typeof define === 'function' && define.amd) {
  define(NLP);
}

// let nlp = new NLP();
// let word = nlp.verb('speak');
// console.log(word.conjugate());
