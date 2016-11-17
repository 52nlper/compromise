'use strict';
//
const syntax = require('./lib/syntax');
const log = require('./lib/paths').log;
const startHere = require('./lib/startHere');

const matchMethods = (Terms) => {
  const methods = {

    /**match all */
    match: function (str) {
      let matches = [];
      let regs = syntax(str);
      for (let t = 0; t < this.terms.length; t++) {
        //don't loop through if '^'
        if (regs[0] && regs[0].starting && t > 0) {
          break;
        }
        let m = startHere(this, t, regs);
        if (m) {
          matches.push(m);
          //ok, don't try to match these again.
          let skip = m.length - 1;
          t += skip; //this could use some work
        }
      }
      matches = matches.map((a) => {
        return new Terms(a)
      })
      return matches;
    },

    /**return first match */
    matchOne: function (str) {
      let regs = syntax(str);
      for (let i = 0; i < this.terms.length; i++) {
        //don't loop through if '^'
        if (regs[0] && regs[0].starting && t > 0) {
          return null
        }
        let m = startHere(this, t, regs);
        if (m) {
          return m
        }
      }
      return null
    },

    /**return first match */
    has: function (str) {
      return !!this.matchOne(str)
    }

  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = matchMethods;
