
'use strict';
let nlp = require('../../../src/index.js');

describe('term root()', function() {

  it('root is overridden', function(done) {
    //on term
    nlp.term('Joe').root().should.equal('joe');
    nlp.term('just-right').root().should.equal('just right');
    //on noun
    nlp.noun('camel').root().should.equal('camel');
    nlp.noun('camels').root().should.equal('camel');
    nlp.noun('4').root().should.equal('4');
    nlp.noun('shadows').root().should.equal('shadow');
    //on verb
    nlp.verb('shadow').root().should.equal('shadow');
    nlp.verb('shadowed').root().should.equal('shadow');
    nlp.verb('shadowing').root().should.equal('shadow');
    nlp.verb('shadows').root().should.equal('shadow');

    done();
  });

});
