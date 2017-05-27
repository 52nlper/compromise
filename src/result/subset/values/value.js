'use strict';
const paths = require('../../paths');
const Terms = paths.Terms;
const parse = require('./parse');
const fmt = require('./format');

const unpackRange = function(ts) {
  if (ts.has('#NumberRange')) {
    ts.terms.forEach((t) => {
      if (t.silent_term && !t._text) {
        t.text = t.silent_term;
      }
    });
  }
  return ts;
};

const isPercent = function(val, unit) {
  //pre-tagged
  if (val.has('#Percent') || unit.has('#Percent')) {
    return true;
  }
  // 'five percent'
  if (unit.out('normal') === 'percent') {
    return true;
  }
  //'5%'
  if (val.out('normal').match(/%$/) !== null) {
    return true;
  }
  return false;
};

//set the text as the same num format
const setNumber = function(ts, num) {
  if (ts.has('#Ordinal')) {
    if (ts.has('#TextValue')) { //ordinal text
      let str = fmt.textOrdinal(num);
      ts.val.replaceWith(str, true);
    } else { //ordinal number
      let str = fmt.ordinal(num);
      ts.val.replaceWith(str, true);
    }
  } else if (ts.has('#TextValue')) { //cardinal text
    let str = fmt.text(num);
    ts.val.replaceWith(str, true);
  } else if (ts.has('#NiceNumber')) {
    let str = fmt.nice(num);
    ts.val.replaceWith(str, true);
  } else { //cardinal number
    let str = fmt.cardinal(num);
    ts.val.replaceWith(str, true);
  }
  return ts;
};

const Value = function(arr, lexicon, refText, refTerms) {
  Terms.call(this, arr, lexicon, refText, refTerms);
  this.val = this.match('#Value+').list[0];
  this.val = unpackRange(this.val);
  this.unit = this.match('#Unit+');
  if (this.unit.found) {
    this.unit = this.unit.list[0];
  }
};


//Terms inheritence
Value.prototype = Object.create(Terms.prototype);

const methods = {
  data: function() {
    let num = parse(this.val);
    return {
      number: num,
      nice: fmt.nice(num),
      ordinal: fmt.ordinal(num),
      niceOrdinal: fmt.niceOrdinal(num),
      text: fmt.text(num),
      textOrdinal: fmt.textOrdinal(num),
      unit: this.unit.out('normal')
    };
  },
  number: function() {
    return parse(this.val);
  },
  // /** five -> '5' */
  toNumber: function() {
    let num = parse(this.val);
    if (num !== null) {
      let str = '';
      if (this.val.has('#Ordinal')) {
        str = fmt.ordinal(num);
      } else {
        str = '' + num;
        //convert 'five percent' -> '5%'
        if (isPercent(this.val, this.unit)) {
          str = str + '%';
          this.unit.delete();
        }
      }
      if (this.unit.found) {
        str = str + this.unit.out('text');
      }
      this.replaceWith(str, true).tag('NumericValue');
      //make sure unit gets the right tag..
      if (this.unit.found) {
        this.match(this.unit.out('normal')).tag('Unit');
      }
    }
    return this;
  },
  // /**5 -> 'five' */
  toText: function() {
    let num = parse(this.val);
    if (num !== null) {
      let str = '';
      if (this.val.has('#Ordinal')) {
        str = fmt.textOrdinal(num);
      } else {
        str = fmt.text(num);
        //add percent
        if (isPercent(this.val, this.unit)) {
          str = str + ' percent';
        }
      }
      if (this.unit.found) {
        str = str + this.unit.out('text');
      }
      this.replaceWith(str, true).tag('TextValue');
      //make sure unit gets the right tag..
      if (this.unit.found) {
        this.match(this.unit.out('normal')).tag('Unit');
      }
    }
    return this;
  },
  //
  // /**5th -> 5 */
  toCardinal: function() {
    let num = parse(this.val);
    if (num !== null) {
      let str = '';
      if (this.val.has('#TextValue')) {
        str = fmt.text(num);
      } else {
        str = num;
      }
      if (this.unit.found) {
        str = str + this.unit.out('text');
      }
      this.replaceWith(str, true).tag('Cardinal');
      //make sure unit gets the right tag..
      if (this.unit.found) {
        this.match(this.unit.out('normal')).tag('Unit');
      }
    }
    return this;
  },
  //
  // /**5 -> 5th */
  toOrdinal: function() {
    let num = parse(this.val);
    if (num !== null) {
      let str = '';
      if (this.val.has('#TextValue')) {
        str = fmt.textOrdinal(num);
      } else {
        str = fmt.ordinal(num);
      }
      if (this.unit.found) {
        str = str + this.unit.out('text');
      }
      this.replaceWith(str, true).tag('Ordinal');
      //make sure unit gets the right tag..
      if (this.unit.found) {
        this.match(this.unit.out('normal')).tag('Unit');
      }
    }
    return this;
  },
  //
  // /**5900 -> 5,900 */
  toNice: function() {
    let num = parse(this.val);
    if (num !== null) {
      let str = '';
      if (this.val.has('#Ordinal')) {
        str = fmt.niceOrdinal(num);
      } else {
        str = fmt.nice(num);
      }
      if (this.unit.found) {
        str = str + this.unit.out('text');
      }
      this.replaceWith(str, true).tag('NumericValue');
      //make sure unit gets the right tag..
      if (this.unit.found) {
        this.match(this.unit.out('normal')).tag('Unit');
      }
    }
    return this;
  },
  /** seven + 2 = nine */
  add: function(n) {
    if (!n) {
      return this;
    }
    let num = parse(this.val) || 0;
    num += n; //add it
    return setNumber(this, num);
  },
  /** seven - 2 = five */
  subtract: function(n) {
    if (!n) {
      return this;
    }
    let num = parse(this.val) || 0;
    num -= n; //subtract it
    return setNumber(this, num);
  },
  /**seven -> 'eight' */
  increment: function() {
    return this.add(1);
  },
  /**seven -> 'six' */
  decrement: function() {
    return this.subtract(1);
  }
};


Object.keys(methods).forEach((k) => {
  Value.prototype[k] = methods[k];
});
module.exports = Value;
