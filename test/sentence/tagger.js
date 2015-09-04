"use strict";
let mocha = require("mocha");
let should = require("should");
let nlp = require("../../src/index.js");

describe("pos tag", function() {

  it("Basic", function(done) {
    let tests=[
      ["John is pretty", ["noun","verb","adjective"]],
      // ["John Smith was good", ["noun","verb","adjective"]],
    ]
    tests.forEach(function(a) {
      let tags = nlp(a[0]).parents()[0];
      tags.should.deepEqual(a[1]);
    });

    done();
  });

});
