'use strict';
const out = require('./methods/out');
//a Text is an array of termLists
class Text {
  constructor(arr, lexicon, reference) {
    this.list = arr || [];
    this.reference = reference;
  }
  //getter/setters
  /** did it find anything? */
  get found() {
    return this.list.length > 0;
  }
  /** how many Texts are there?*/
  get length() {
    return this.list.length;
  }
  get isA() {
    return 'Text';
  }
  get parent() {
    return this.reference || this;
  }
  set parent(r) {
    this.reference = r;
    return this;
  }
  all() {
    return this.parent;
  }
  index() {
    return this.list.map((ts) => ts.index());
  }
  out(msg) {
    return out(this, msg);
  }

  get whitespace() {
    return {
      before: (str) => {
        this.list.forEach((ts) => {
          ts.whitespace.before(str);
        });
        return this;
      },
      after: (str) => {
        this.list.forEach((ts) => {
          ts.whitespace.after(str);
        });
        return this;
      }
    };
  }
}

module.exports = Text;
Text = require('./methods/array')(Text);
Text = require('./methods/termFns')(Text);
Text = require('./methods/tag')(Text);
Text = require('./methods/sort')(Text);
Text = require('./methods/case')(Text);
Text = require('./methods/match/match')(Text);
Text = require('./methods/render/render')(Text);
Text = require('./methods/delete')(Text);
Text = require('./methods/replace')(Text);
Text = require('./methods/split')(Text);
Text = require('./methods/hyphens')(Text);
Text = require('./methods/insert')(Text);
// Text.prototype.topk = require('./methods/render/topk');
// Text.prototype.ngram = require('./methods/render/ngram');
Text.prototype.normalize = require('./methods/normalize');
// Text.prototype.out =

const subset = {
  acronyms: require('./subset/acronyms'),
  contractions: require('./subset/contractions'),
  sentences: require('./subset/sentences'),
  questions: require('./subset/sentences/questions'),
  statements: require('./subset/sentences/statements'),
  things: require('./subset/things'),
  terms: require('./subset/terms'),
  clauses: require('./subset/clauses'),

  adjectives: require('./subset/adjectives'),
  adverbs: require('./subset/adverbs'),
  dates: require('./subset/dates'),
  hashTags: require('./subset/hashTags'),
  organizations: require('./subset/organizations'),
  people: require('./subset/people'),
  phoneNumbers: require('./subset/phoneNumbers'),
  places: require('./subset/places'),
  nouns: require('./subset/nouns'),
  urls: require('./subset/urls'),
  values: require('./subset/values'),
  verbs: require('./subset/verbs'),
};
//term subsets
Object.keys(subset).forEach((k) => {
  Text.prototype[k] = function () {
    let sub = subset[k];
    let m = sub.find(this);
    return new subset[k](m.list, this.lexicon, this.parent);
  };
});
