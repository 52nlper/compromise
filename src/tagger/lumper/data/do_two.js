'use strict';
//rules that combine two words
module.exports = [
  {
    condition: (a, b) => (a.pos.Person && b.pos.Honourific || a.pos.Honourific && b.pos.Person), //"John sr."
    result: 'Person',
    reason: 'person-words'
  },
  {
    //6 am
    condition: (a, b) => ((a.pos.Value || a.pos.Date) && (b.normal === 'am' || b.normal === 'pm')),
    result: 'Date',
    reason: 'date-am/pm'
  },
  {
    //'Dr. John'
    condition: (a, b) => (a.pos.Honourific && b.is('TitleCase')),
    result: 'Person',
    reason: 'person-honourific'
  },
  {
    // "john lkjsdf's"
    condition: (a, b) => (a.pos.Person && b.pos.Possessive),
    result: 'Person',
    reason: 'person-possessive'
  },
  {
    //"John Abcd" - needs to be careful
    condition: (a, b) => (a.pos.Person && !a.pos.Pronoun && !a.pos.Possessive && !a.info('hasComma') && b.is('TitleCase') && !a.is('Acronym') && !b.pos.Verb), //'Person, Capital -> Person'
    result: 'Person',
    reason: 'person-titleCase'
  },
  // {
  //   //June 4
  //   condition: (a, b) => (a.pos.Date && b.pos.Value),
  //   result: 'Date',
  //   reason: 'date-value'
  // },
  // {
  //   //4 June
  //   condition: (a, b) => (a.pos.Value && b.pos.Date),
  //   result: 'Date',
  //   reason: 'value-date'
  // },
  {
    //last wednesday
    condition: (a, b) => ((a.normal === 'last' || a.normal === 'next' || a.normal === 'this') && b.pos.Date),
    result: 'Date',
    reason: 'relative-date'
  },
  {
    //Aircraft designer
    condition: (a, b) => (a.pos.Noun && b.pos.Actor),
    result: 'Actor',
    reason: 'thing-doer'
  },
  {
    //Canada Inc
    condition: (a, b) => (a.is('TitleCase') && a.pos.Noun && b.pos['Organization'] || b.is('TitleCase') && a.pos['Organization']),
    result: 'Organization',
    reason: 'organization-org'
  },
  {
    //two-word quote
    condition: (a, b) => (a.text.match(/^["']/) && b.text.match(/["']$/)),
    result: 'Quotation',
    reason: 'two-word-quote'
  },
  {
    //timezones
    condition: (a, b) => (b.normal.match(/(standard|daylight|summer) time/) && (a.pos['Adjective'] || a.pos['Place'])),
    result: 'Date',
    reason: 'timezone'
  },
  {
    //canadian dollar, Brazilian pesos
    condition: (a, b) => (a.pos.Demonym && b.pos.Currency),
    result: 'Currency',
    reason: 'demonym-currency'
  },
  {
    //7 ft
    condition: (a, b) => ((a.pos.Value && b.pos.Abbreviation) || (a.pos.Abbreviation && b.pos.Value)),
    result: 'Value',
    reason: 'value-abbreviation'
  },
  {
    //NASA Flordia
    condition: (a, b) => ((a.pos.Noun && b.pos.Abbreviation) || (a.pos.Abbreviation && b.pos.Noun)),
    result: 'Noun',
    reason: 'noun-abbreviation'
  },
  // {
  //   //both dates
  //   condition: (a, b) => (a.pos.Date && b.pos.Date),
  //   result: 'Date',
  //   reason: 'two-dates'
  // },
  // {
  //   //dates and values
  //   condition: (a, b) => (a.pos.Date && b.pos.Value),
  //   result: 'Date',
  //   reason: 'date-value'
  // },
  {
    //both values, not ordinals, not '5 20'
    condition: (a, b) => (a.pos.Value && b.pos.Value && !a.pos.Ordinal && !b.pos.Ordinal && !(a.pos.Cardinal && b.pos.Cardinal)),
    result: 'Value',
    reason: 'two-values'
  },
  {
    //both places
    condition: (a, b) => (a.pos.Place && b.pos.Place),
    result: 'Place',
    reason: 'two-places'
  }

];
