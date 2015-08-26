'use strict'
let Term = require("./term.js")
let fns = require("./fns.js")

class Sentence {
  constructor(str) {
    this.text = str || "";
    let terms = str.split(" ")
    this.terms = terms.map(function(s, i) {
      let info = {
        index: i
      }
      return new Term(s, info)
    })
  }

  //the ending-punctuation used
  terminator() {
    let allowed = {
      ".": true,
      "!": true,
      "?": true
    }
    let char = this.text.slice(-1) || "";
    if (allowed[char]) {
      return char
    }
    return "."
  }
  //
  sentence_type() {
    let char = this.terminator()
    let types = {
      "?": "interrogative",
      "!": "exclamative",
      ".": "declarative",
    }
    return types[char] || "declarative";
  }

  //map over term methods
  text() {
    return this.str
  }
  normalized() {
    return fns.pluck(this.terms, 'normal').join(" ")
  }
  text() {
    return fns.pluck(this.terms, 'text').join(" ")
  }
}

var s = new Sentence("Hii Dr. Nick!")
console.log(s)

module.exports = Sentence
