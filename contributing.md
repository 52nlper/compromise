#WElcome, good person

I am very welcoming to all pull requests, and feature requests in all forms.
NLP is a solvable problem in scale, and all forms of input are gracious and lovely. I am also friendly and approachable. There is lots of work to be done.

* code is in ```/src```
* text is broken into 'Section' -> 'Sentence' -> 'Token', each with their relevant methods
* the various parts-of-speech have a 'parent form' of [noun, verb, adverb, adjective, or value], each with their relevant methods (in ```/src/parents```)
* unit tests are in ```/tests/unit_test.js``` and can be run with 'npm test'
* 'grunt' command joins all various scripts into a client-side js file

check out ```./known_issues.md``` or the unit tests that have been ... commented out.

# release build script:
casual versioning/publishing with semvar:

```bash
npm test #ensure unit tests pass
node ./tests/pos_test/pos_test.js  #make sure changes to pos results are sane

grunt  #build client-side scripts
node ./tests/pos_test/bump_latest.js  #set current pos results as reference data
npm publish #push npm version
#bump bower
git tag -a v0.4.0 -m "tag bower release"
git push origin master --tags
```

#file size
of minimized clientside build:
* April 2015 - 109kb
* May 2015 - 103kb

have a nice day
