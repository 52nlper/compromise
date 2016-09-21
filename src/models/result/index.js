'use strict';
const inspect = require('./inspect');
const render = require('./render');
const normalize = require('./normalize');
const methods = require('./methods');

//a result is an array of termLists
class Result {
  constructor(arr) {
    this.list = arr || [];
  }
  /** did it find anything? */
  get found() {
    return this.list.length > 0;
  }
}

//add methods to prototype
Object.keys(methods).forEach((k) => {
  Result = methods[k](Result);
});
/** return ad-hoc data about this result*/
Result.prototype.inspect = inspect;
/** different presentation logic for this result*/
Result.prototype.render = render;
/** fixup transforms*/
Result.prototype.normalize = normalize;

module.exports = Result;

//apply methods
// require('./methods').addMethods(Result);
