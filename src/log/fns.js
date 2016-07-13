'use strict';
const color = require('./color')

exports.rightPad = function(str, width, char) {
  char = char || ' ';
  str = str.toString();
  while (str.length < width) str += char;
  return str;
};
exports.leftPad = function(str, width, char) {
  char = char || ' ';
  str = str.toString();
  while (str.length < width) str += char;
  return str;
};

exports.findIndent = function(path) {
  let indent = path.split('/').length - 1
  indent = exports.rightPad('', indent, '   ')
  return indent
}

exports.makePath = (path, indent) => {
  //make path heading:
  if (path) {
    path += ':'
  }
  path = indent + path
  path = color.yellow(path)
  return path
}