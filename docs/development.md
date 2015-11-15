#WElcome, good person

I am very welcoming to all pull requests, and feature requests in all forms.
NLP is a solvable problem in scale, and all forms of input are gracious and lovely. I am also friendly and approachable. There is lots of work to be done.

* code is in ```/src```
* unit tests are in ```./tests``` and can be run with 'npm test'
* 'grunt build' command joins all various scripts into a client-side js file

# Building
needs an Es6 env, like `nvm use iojs-v2.3.0`
```
npm install
grunt build
grunt watch
```

`grunt demo`
and visit http://localhost:8888/demos/

# Releasing
casual versioning/publishing with semvar:

```bash
npm test #ensure unit tests pass

grunt build #build client-side scripts

npm publish #push npm version
#bump bower
git tag -a v2.x.x -m "tag bower release"
git push origin master --tags
```

#TODO:
* co-reference resolution (he/she/its). ```pronoun.reference(), noun.references()```
* caching by sentence, so unchanged-sentences aren't re-parsed on keystroke
* somehow integrate the bigger, looser tests with the unit tests, to better catch regressions
* more advanced negation, sentence.is_negative() - or sentence.make_positive() .. or sentence.is_contrary(s2)?
* speedup work, some kind of speed-profile (where are the slowest parts?) Throw a novel or two in and see what bottlenecks. Some knowledge of parse speed of library in browser.
* ```sentence.pluralize() sentence.singularize() sentence.is_plural()``` ?
* ```sentence.britishize() sentence.americanize() sentence.is_british()``` ?
* some kind of thorough memory-leak test. Setting values to JSON objects is pass-by-reference. With lexicon, various verb lists, there is bound to be some pointers being set, which would appear with concurrency-testing.
* some kind of more specific auto-documentation for each public method. Something better than a readme. Basic human-explanations of ideas + assumptions.
* some smaller and more specific subset builds from grunt.
* perfect 'have walked' & pluperfect 'had walked' & future perfect 'will have walked' support
* habitual aspect support 'used to walk'


#file size
of minimized, es5 clientside build:
* April 2015 - 109kb
* May 1st - 103kb
* May 8th - 79kb
* May 10th - 88kb
* May 18th - 99kb

#speed
benchmarked unit tests on backend + frontend
* May 2015  520ms front, 315ms back

have a nice day

