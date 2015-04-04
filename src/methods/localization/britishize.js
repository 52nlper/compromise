//built with patterns+exceptions from https://en.wikipedia.org/wiki/British_spelling
// some patterns are only safe to do in one direction

var britishize = (function() {

  var main = function(str) {
    var patterns = [
      // ise -> ize
      {
        reg: /([^aeiou][iy])z(e|ed|es|ing)?$/,
        repl: '$1s$2',
        exceptions: []
      },
      // our -> or
      // {
      //   reg: /(..)our(ly|y|ite)?$/,
      //   repl: '$1or$2',
      //   exceptions: []
      // },
      // re -> er
      // {
      //   reg: /([^cdnv])re(s)?$/,
      //   repl: '$1er$2',
      //   exceptions: []
      // },
      // xion -> tion
      // {
      //   reg: /([aeiou])xion([ed])?$/,
      //   repl: '$1tion$2',
      //   exceptions: []
      // },
      //logue -> log
      // {
      //   reg: /logue$/,
      //   repl: 'log',
      //   exceptions: []
      // },
      // ae -> e
      // {
      //   reg: /([o|a])e/,
      //   repl: 'e',
      //   exceptions: []
      // },
      //eing -> ing
      // {
      //   reg: /e(ing|able)$/,
      //   repl: '$1',
      //   exceptions: []
      // },
      // illful -> ilful
      {
        reg: /([aeiou]+[^aeiou]+[aeiou]+)l(ful|ment|est|ing|or|er|ed)$/, //must be second-syllable
        repl: '$1ll$2',
        exceptions: []
      },
    ]

    for (var i = 0; i < patterns.length; i++) {
      if (str.match(patterns[i].reg)) {
        //check for exceptions
        for (var o in patterns[i].exceptions) {
          if (str.match(patterns[i].exceptions[o])) {
            return str
          }
        }
        return str.replace(patterns[i].reg, patterns[i].repl)
      }
    }
    return str
  }

  if (typeof module !== "undefined" && module.exports) {
    exports.britishize = main;
  }
  return main
})()

//////////////
var americanize = (function() {

  var main = function(str) {
    var patterns = [
      // ise -> ize
      {
        reg: /([^aeiou][iy])s(e|ed|es|ing)?$/,
        repl: '$1z$2',
        exceptions: []
      },
      // our -> or
      {
        reg: /(..)our(ly|y|ite)?$/,
        repl: '$1or$2',
        exceptions: []
      },
      // re -> er
      {
        reg: /([^cdnv])re(s)?$/,
        repl: '$1er$2',
        exceptions: []
      },
      // xion -> tion
      {
        reg: /([aeiou])xion([ed])?$/,
        repl: '$1tion$2',
        exceptions: []
      },
      //logue -> log
      {
        reg: /logue$/,
        repl: 'log',
        exceptions: []
      },
      // ae -> e
      {
        reg: /([o|a])e/,
        repl: 'e',
        exceptions: []
      },
      //eing -> ing
      {
        reg: /e(ing|able)$/,
        repl: '$1',
        exceptions: []
      },
      // illful -> ilful
      {
        reg: /([aeiou]+[^aeiou]+[aeiou]+)ll(ful|ment|est|ing|or|er|ed)$/, //must be second-syllable
        repl: '$1l$2',
        exceptions: []
      }
    ]

    for (var i = 0; i < patterns.length; i++) {
      if (str.match(patterns[i].reg)) {
        //check for exceptions
        for (var o in patterns[i].exceptions) {
          if (str.match(patterns[i].exceptions[o])) {
            return str
          }
        }
        return str.replace(patterns[i].reg, patterns[i].repl)
      }
    }

    return str
  }

  if (typeof module !== "undefined" && module.exports) {
    exports.americanize = main;
  }
  return main
})()

// console.log(americanize("synthesise")=="synthesize")
// console.log(americanize("synthesised")=="synthesized")
