'use strict';
const Noun = require('../noun');
const to_number = require('./to_number');
const to_text = require('./to_text');
const units = require('./units');
const nums = require('../../../data/numbers');

class Value extends Noun {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos['Value'] = true;
    this.number = null;
    this.unit = null;
    this.unit_name = null;
    this.measurement = null;
    if (this.is_ordinal()) {
      this.pos['Ordinal'] = true;
    }
    this.parse();
  }

  is_ordinal() { //todo: make this clever.
    //1st
    if (this.normal.match(/^[0-9]+(rd|st|nd|th)$/)) {
      return true;
    }
    //..second
    if (this.normal.match(/[ -](first|second|third|fourth|fifth|sixth|seventh|eighth|ninth)$/)) {
      return true;
    }
    //..teenth
    if (this.normal.match(/\b(eleventh|twelfth|thirteenth|fourteenth|fifteenth|sixteenth|seventeenth|eighteenth|ninteenth)$/)) {
      return true;
    }
    //..tenth
    if (this.normal.match(/\b(tenth|twentieth|thirtieth|fourtieth|fiftieth|sixtieth|seventieth|eightieth|nintieth|hundreth|thousandth|millionth|billionth)$/)) {
      return true;
    }
    return false;
  }

  root() {
    let str = this.number;
    if (this.unit) {
      str += ' ' + this.unit;
    }
    return str;
  }

  is_unit(s) {
    if (units[s]) {
      return true;
    }
    s = s.toLowerCase();
    if (nums.prefixes[s]) {
      return true;
    }
    //try singular version
    s = s.replace(/s$/); //ew
    if (units[s]) {
      return true;
    }

    return false;
  }

  parse() {
    let words = this.text.toLowerCase().split(' ');
    let number_words = {
      minus: true,
      point: true
    };
    let numbers = '';
    for(let i = 0; i < words.length; i++) {
      let w = words[i];
      if (nums.ones[w] || nums.teens[w] || nums.tens[w] || nums.multiples[w] || number_words[w] || w.match(/[0-9]/)) {
        numbers += ' ' + w;
      } else if (this.is_unit(w)) { //optional units come after the number
        this.unit = w;
        if (units[w]) {
          this.measurement = units[w].category;
          this.unit_name = units[w].name;
        }
      }
    }
    numbers = numbers.trim();
    this.number = to_number(numbers);
  }

  textual() {
    return to_text(this.number);
  }

}
Value.fn = Value.prototype;
module.exports = Value;

// console.log(new Value(3));
