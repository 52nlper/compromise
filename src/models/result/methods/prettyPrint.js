'use strict';
const chalk = require('chalk');

const prettyPrint = (Result) => {

  const methods = {

    check : function() {
      this.list.forEach((ts, i) => {
        console.log('--');
        ts.check();
      });
      return this;
    },

    plaintext : function() {
      return this.list.reduce((str, ts) => {
        str += ts.plaintext();
        return str;
      }, '');
    },

    normal: function() {
      return this.list.reduce((str, ts) => {
        str += ts.normal();
        return str;
      }, '');
    },

    phrases: function() {
      this.list.forEach((ts) => {
        let str = '';
        ts.terms.forEach((t) => {
          let text = t.plaintext();
          if (t.tag.NounPhrase) {
            str += chalk.cyan(text);
            return;
          }
          if (t.tag.VerbPhrase) {
            str += chalk.red(text);
            return;
          }
          str += text;
        });
        console.log(str + '\n');
      });
    },
  };
  Object.keys(methods).forEach((k) => {
    Result.prototype[k] = methods[k];
  });
  return Result;
};

module.exports = prettyPrint;
