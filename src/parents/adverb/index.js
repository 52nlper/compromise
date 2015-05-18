//wrapper for Adverb's methods
var Adverb = function(str, sentence, word_i) {
  var the = this
  the.word = str || '';

  if (typeof module !== "undefined" && module.exports) {
    to_adjective = require("./conjugate/to_adjective")
    parts_of_speech = require("../../data/parts_of_speech")
  }

  the.conjugate = function() {
    return {
      adjective: to_adjective(the.word)
    }
  }

  the.which = (function() {
    if (the.word.match(/..est$/)) {
      return parts_of_speech['RBS']
    }
    if (the.word.match(/..er$/)) {
      return parts_of_speech['RBR']
    }
    return parts_of_speech['RB']
  })()

  return the;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Adverb;
}

// console.log(new Adverb("suddenly").conjugate())
// console.log(adverbs.conjugate('powerfully'))
