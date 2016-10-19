<div align="center">
  <strong>nlp_compromise</strong>
  <div>natural-language processing in the browser</div>

  <a href="https://www.codacy.com/app/spencerkelly86/nlp_compromise">
    <img src="https://api.codacy.com/project/badge/grade/82cc8ebd98b64ed199d7be6021488062" />
  </a>
  <a href="https://npmjs.org/package/nlp_compromise">
    <img src="https://img.shields.io/npm/v/nlp_compromise.svg?style=flat-square" />
  </a>
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square" />
  </a>
</div>

<div align="center">
  <sub>
    by
    <a href="https://github.com/spencermountain">Spencer Kelly</a> and
    <a href="https://github.com/nlp-compromise/nlp_compromise/graphs/contributors">
      contributors
    </a>
  </sub>
</div>

<div align="center">
  <code>npm install nlp_compromise</code>
</div>
<br/>
```javascript
var nlp = require('nlp_compromise')
nlp('I look just like buddy holly').toPast().text()
// "I looked just like buddy holly."
```
<div align="center">
  inspect and play with english text,
  <div>
    focus on being <a href="https://github.com/nlp-compromise/nlp_compromise/wiki/Justification">handy, and not overly-fancy</a>
  </div>
</div>

### Yup,
* a [140k js file](https://unpkg.com/nlp_compromise@latest/builds/nlp_compromise.min.js)
* **[86%](https://github.com/nlp-compromise/nlp_compromise/wiki/Accuracy)** on the **Penn treebank**
* [keypress speed](https://github.com/nlp-compromise/nlp_compromise/wiki/Performance), constant-time.
* caniuse, uhuh. **IE9+**
* [no dependencies](https://github.com/nlp-compromise/nlp_compromise/wiki/Getting-Started), training, configuration, or prolog

##grammar ftw
```javascript
r = nlp('john is really nice. sara quickly walks.')

//pluck-out some parts
r.remove('#Adverb')

//reach-in and transform parts
r.match('#Person').toTitleCase()

r.text()
// 'John is nice. Sara walks.'
```

##verb manipulation
```javascript
r = nlp('she sells seashells by the seashore.').toFuture().text()
//'she will sell seashells...'

//blast-out all conjugations
r.verbs().conjugate()
// [{
//   PastTense: 'sold',
//   Infinitive: 'sell',
//   Gerund: 'selling'
//   ...
// }]
```

##plural/singular
```javascript
r = nlp('a bottle of beer on the wall.')
r.match('bottle').toPlural()
r.text()
//'The bottles of beer on the wall.'
```

##negation
```javascript
r = nlp('london is calling')
r.toNegative()
//'london is not calling'
```

##value conversion
```javascript
r = nlp('fifth of december')

r.values().toNumber().text()
// '5 of december'

r.values().toCardinal().text()
// 'five of december'
```

##clever normalization
```javascript
r = nlp("björk's the guest-singer at seven thirty.").normalize().text()
//'Bjork is the guest singer at 7:30.'
```

##fun outputs
```javascript
r = nlp('Tony Hawk won').asHtml()
//<span>
//  <span class="Person Noun MalePerson">Tony Hawk</span>
//  <span>&nbsp;</span>
//  <span class="Verb PastTense">won</span>
//</span>
```
<h3 align="center">
  and yes, ofcourse, there's <a href="https://github.com/nlp-compromise/nlp_compromise/wiki/API">a lot more stuff</a>.
</h3>

##join
we're using semver, we're fun, and moving fast.
<div align="center">
  <a href="https://github.com/nlp-compromise/nlp_compromise/wiki/Contributing">:hammer_and_wrench: get involved :dancer:</a>
</div>

#See also
* **[naturalNode](https://github.com/NaturalNode/natural)** - decidedly fancier statistical nlp in javascript
* **[SuperScript](http://superscriptjs.com/)** - clever conversation engine in javascript
* **[NodeBox Linguistics](https://www.nodebox.net/code/index.php/Linguistics)** - conjugation, inflection, etc in javascript
* **[reText](https://github.com/wooorm/retext)** - very impressive [text utilities](https://github.com/wooorm/retext/blob/master/doc/plugins.md) in javascript
* **[jsPos](https://code.google.com/archive/p/jspos/)** - js-build of the time-tested Brill-tagger
* **[spaCy](https://spacy.io/)** - speedy, multilingual tagger in C/python

(don't forget legendary
[NLTK](http://www.nltk.org/),
[GATE](https://gate.ac.uk),
[Stanford Parser](http://nlp.stanford.edu/software/lex-parser.shtml),
and
[Illinois toolkit](http://cogcomp.cs.illinois.edu/page/software/)
)
