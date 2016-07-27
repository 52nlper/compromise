'use strict';

const info = {

  /** the punctuation at the end of this term*/
  endpunctuation: (t) => {
    let m = t.text.match(/[a-z]([,:;\/.(\.\.\.)\!\?]+)$/);
    if (m) {
      const allowed = {
        ',': 'comma',
        ':': 'colon',
        ';': 'semicolon',
        '.': 'period',
        '...': 'elipses',
        '!': 'exclamation',
        '?': 'question'
      };
      if (allowed[m[1]]) {
        return allowed[m[1]];
      }
    }
    return null;
  },

  /** interpret a term's hyphenation */
  hyphenation: (t) => {
    let m = t.text.match(/^([a-z]+)-([a-z]+)$/);
    if (m && m[1] && m[2]) {
      return {
        start: m[1],
        end: m[2]
      };
    }
    return null;
  },

  /** interpret a terms' contraction */
  contraction: (t) => {
    const allowed = {
      'll': true,
      't': true,
      's': true,
      'd': true,
      'm': true
    };
    let parts = t.text.match(/^([a-z]+)'([a-z][a-z]?)$/);
    if (parts && parts[1] && allowed[parts[2]]) {
      //handle n't
      if (parts[2] === 't' && parts[1].match(/[a-z]n$/)) {
        parts[1] = parts[1].replace(/n$/, '');
        parts[2] = 'n\'t'; //dunno..
      }
      return {
        start: parts[1],
        end: parts[2]
      };
    }
    // "flanders' house"
    parts = t.text.match(/^([a-z]+s)'$/);
    if (parts) {
      return {
        start: parts[1],
        end: ''
      };
    }
    return null;
  },

  /** does it appear to be an acronym, like FBI or M.L.B. */
  isacronym: (t) => {
    //like N.D.A
    if (t.text.match(/([A-Z]\.)+[A-Z]?$/i)) {
      return true;
    }
    //like 'F.'
    if (t.text.match(/^[A-Z]\.$/i)) {
      return true;
    }
    //like NDA
    if (t.text.match(/[A-Z]{3}$/i)) {
      return true;
    }
    return false;
  },

  /** check if the term ends with a comma */
  hascomma: (t) => {
    if (t.info('endPunctuation') === 'comma') {
      return true;
    }
    return false;
  },

  /** where in the sentence is it? zero-based. */
  index: (t) => {
    let terms = t.context.sentence.terms
    for (let i = 0; i < terms.length; i++) {
      if (terms[i] === t) {
        return i
      }
    }
    return null
  },

  /** get a list of words to the left of this one, in reversed order */
  before: (t) => {
    let terms = t.context.sentence.terms
    let i = t.info('index')
    return terms.slice(0, i)
  },

  /** get a list of words to the right of this one */
  after: (t) => {
    let terms = t.context.sentence.terms
    let i = t.info('index')
    return terms.slice(i, terms.length - 1)
  }

};

module.exports = info;
