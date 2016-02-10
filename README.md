### Natural Language Processing in the browser
[![CodacyBadge](https://api.codacy.com/project/badge/grade/82cc8ebd98b64ed199d7be6021488062)](https://www.codacy.com/app/spencerkelly86/nlp_compromise)
[![npm version](https://badge.fury.io/js/nlp_compromise.svg)](https://www.npmjs.com/package/nlp_compromise)
[![downloads](https://img.shields.io/npm/dm/nlp_compromise.svg)](https://www.npmjs.com/package/nlp_compromise)

```javascript
nlp.text("She sells seashells").negate()
// She doesn't sell seashells
```

**nlp_compromise** aims to be the reasonable way to use language in software.

### Yup,
* smaller than jQuery *(100k)*
* 86% on the [Penn treebank](http://www.cis.upenn.edu/~treebank/)
* keypress speed, constant-time
* caniuse, yessir. IE9+
* no dependencies, training, or configuration.

It's a [use-focused, satisfactory](https://github.com/nlp-compromise/nlp_compromise/blob/master/docs/justification.md) javascript library for understanding, changing, and making written english.
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**[- Check it out - ](http://rawgit.com/nlp-compromise/website/master/demo/index.html)**

<h6>&nbsp;&nbsp;&nbsp;:boom: Welcome to <a href="https://github.com/nlp-compromise/nlp_compromise/blob/master/docs/changelog.md">v3.0!</a>&nbsp;&nbsp; Please <a href="https://github.com/nlp-compromise/nlp_compromise/issues">file an issue</a> if you find something :boom:</h6>

## Off you go:
> `npm install nlp_compromise`

> `<script src="http://rawgit.com/nlp-compromise/nlp_compromise/master/builds/nlp-compromise.es5.min.js"></script>
`

```javascript
let nlp = require("nlp_compromise"); // or nlp = window.nlp_compromise

nlp.text('She sells seashells').to_past()
// She sold seashells

nlp.verb("speak").conjugate();
// { past: 'spoke',
//   infinitive: 'speak',
//   gerund: 'speaking',
//   actor: 'speaker',
//   present: 'speaks',
//   future: 'will speak',
//   perfect: 'have spoken',
//   pluperfect: 'had spoken',
//   future_perfect: 'will have spoken'
// }

nlp.noun("dinosaur").pluralize();
// "dinosaurs"

nlp.person("Tony Hawk").article();
// "he"

nlp.text("Tony Danza did a kickflip").people();
// "Tony Danza"

nlp.value("five hundred and sixty").number;
// 560

```

we've also got a modest, though ambitious [plugin ecosystem](https://github.com/nlp-compromise/nlp_compromise/blob/master/docs/plugins.md):
```javascript
nlp.plugin(require("nlp-locale"))
nlp.term("favourite").toAmerican()
// favorite

nlp.plugin(require("nlp-syllables"));
var t2 = nlp.term('houston texas');
t2.syllables()
//[ [ 'hous', 'ton' ], [ 'tex', 'as' ] ]

nlp.plugin(require("nlp-ngram"));
var t4 = nlp.text(`Tony Hawk played Tony Hawk's pro skater`);
t4.ngram({min_count: 2});
// [ { word: 'tony hawk', count: 2, size: 1 } ]
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[try it out](https://tonicdev.com/nlp-compromise/nlpcompromise)

### [View the Full API Documentation](https://github.com/nlp-compromise/nlp_compromise/blob/master/docs/api.md)

## Development
[![Issue Stats](http://issuestats.com/github/nlp-compromise/nlp_compromise/badge/pr)](http://issuestats.com/github/nlp-compromise/nlp_compromise)
[![Issue Stats](http://issuestats.com/github/nlp-compromise/nlp_compromise/badge/issue)](http://issuestats.com/github/nlp-compromise/nlp_compromise)

*nlp_compromise is a wicked-problem solved with many hands. Contributions in all forms are respected.*

Join our slack group [![slack](https://img.shields.io/badge/slack-superscriptjs-brightgreen.svg)](http://superscriptjs.slack.com/messages/nlp_compromise/)
or our infrequent [announcement email-list](http://eepurl.com/bL9YRv)
* [Contributing](https://github.com/nlp-compromise/nlp_compromise/blob/master/contributing.md)

* [Changelog](https://github.com/nlp-compromise/nlp_compromise/blob/master/docs/changelog.md)


[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

