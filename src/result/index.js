'use strict';

//a result is an array of termLists
class Result {
  constructor(arr) {
    this.list = arr || [];
  }
  //getter/setters
  /** did it find anything? */
  get found() {
    return this.list.length > 0;
  }

}

const selectFns = require('./selection');
Result = selectFns(Result);

const inspectFns = require('./inspect');
Result = inspectFns(Result);

const renderFns = require('./render');
Result = renderFns(Result);

/** different presentation logic for this result*/
Result.prototype.render = require('./render');
/** fixup transforms**/
Result.prototype.normalize = require('./normalize');
/** **/
Result.prototype.ngram = require('./inspect/ngram');
/** **/
Result.prototype.topk = require('./inspect/topk');


module.exports = Result;

const Adjectives = require('./adjectives');
Result.prototype.adjectives = function() {
  return new Adjectives(this.list);
};

//apply methods
// require('./methods').addMethods(Result);
