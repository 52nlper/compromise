'use strict';
const fns = require('./fns')
const color = require('./color')
const pretty_print = require('./pretty_print')

//dummy function
let dummy = {
  here: function() {},
  change: function() {},
  show: function() {},
}

const shouldPrint = (path) => {
  let arg = process.argv[2]
  let toPrint = arg.replace(/^--debug=?/, '') || '*'
  if (toPrint === '*' || toPrint == '') {
    return true
  }
  if (path.indexOf(toPrint) === 0) {
    return true
  }
  return false
}

const serverOutput = {
  here: function(path) {
    if (shouldPrint(path)) {
      let indent = fns.findIndent(path) || ''
      console.log(fns.makePath(path, indent))
    }
  },
  change: function(input, path) {
    if (shouldPrint(path)) {
      let indent = fns.findIndent(path) || ''
      console.log(indent + '   ' + color.red(input))
    }
  },
  show: function(input, path) {
    if (shouldPrint(path)) {
      pretty_print(input, path)
    }
  }
}

//figure out if it should print anything, first
const log = (() => {
  if (!process || !process.argv || !process.argv[2]) {
    return dummy
  }
  let arg = process.argv[2]
  if (!arg.match(/^--debug/)) {
    return dummy
  }
  return serverOutput
})()

module.exports = log
