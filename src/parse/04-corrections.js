'use strict';
//
const corrections = function(result) {
  //Determiner-signals
  //the wait to vote
  result.match('the #Verb #Preposition .').match('#Verb').tag('Noun', 'correction-determiner1');
  //the swim
  result.match('the #Verb').match('#Verb').tag('#Noun', 'correction-determiner2');
  //the nice swim
  result.match('the #Adjective #Verb').match('#Verb').tag('#Noun', 'correction-determiner3');
  //the truly nice swim
  result.match('the #Adverb #Adjective #Verb').match('#Verb').tag('#Noun', 'correction-determiner4');
  //peter the great
  result.match('#Person the #Adjective').tag('Person', 'correction-determiner5');
  //book the flight
  result.match('#Noun the #Noun').term(0).tag('Verb', 'correction-determiner6');


  //he quickly foo
  result.match('#Noun #Adverb #Noun').term(2).tag('Verb', 'correction');

  //is eager to go
  result.match('#Copula #Adjective to #Verb').match('#Adjective to').tag('Verb', 'correction');

  //different views than
  result.match('#Verb than').term(0).tag('Noun', 'correction');

  //her polling
  // result.match('#Possessive #Verb').term(1).tag('Noun', 'correction-possessive');

  //folks like her
  result.match('#Plural like #Noun').term(1).tag('Preposition', 'correction');

  //ambiguous 'may' and 'march'
  result.match('(may|march) #Determiner').term(0).tag('Month', 'correction-may');
  result.match('(may|march) #Value').term(0).tag('Month', 'correction-may');
  result.match('(may|march) #Date').term(0).tag('Month', 'correction-may');
  result.match('#Date (may|march)').term(1).tag('Month', 'correction-may');
  result.match('(next|this|last) (may|march)').term(1).tag('Month', 'correction-may');
  //time
  result.match('#Value #Time').tag('Time', 'value-time');
  result.match('(by|before|after|at|@|about) #Time').term(1).tag('Time', 'preposition-time');
  //may the 5th
  result.match('#Date the #Ordinal').term(1).tag('Date', 'correction-date');
  //'a/an' can mean 1
  result.match('(a|an) (#Duration|#Value)').term(0).tag('Value');
  //all values are either ordinal or cardinal
  result.match('#Value').match('!#Ordinal').tag('#Cardinal');
  return result;
};

module.exports = corrections;
