
data= require("./helpers/data")

tagger = (->

  suggest_noun_phrase = (o, rule, results, options) ->
    top = results.length
    i = o + 1 # console.log(results[i].word)

    while i < top
      return results  if results[i].pos.parent is "noun"
      if results[i].pos.parent is "verb" and results[i].pos.tag isnt "RB"
        results[i].pos = data.parts_of_speech["NN"]
        results[i].rule = rule
        return results
      if results[i + 1]
        if results[i].pos.parent is "adj" or results[i].pos.tag is "RB"
          results[i].pos.parent = "adjective"
          results[i].rule = rule
      else #last word and still no noun
        results[i].pos = data.parts_of_speech["NN"]
        results[i].rule = rule
      i++
    results


  suggest_verb_phrase = (o, rule, results, options) ->
    top = results.length
    i = o + 1

    while i < top
      return results  if results[i].pos.parent is "verb"
      if results[i].pos.parent is "noun"
        results[i].pos = data.parts_of_speech["VB"]
        results[i].rule = rule
        return results
      if results[i + 1]
        if results[i].pos.parent is "adj" or results[i].pos.tag is "RB"
          results[i].pos.parent = "verb"
          results[i].rule = rule
      else #last word and still no verb
        results[i].pos = data.parts_of_speech["VB"]
        results[i].rule = rule
      i++
    results
  suggest_adjective_phrase = (o, rule, results, options) ->
    top = results.length
    i = o + 1

    while i < top
      return results  if results[i].pos.parent is "adjective"
      return results  if results[i].pos.tag is "DT" or results[i].pos.tag is "CP"
      if results[i].pos.parent is "noun" or results[i].pos.parent is "verb"
        results[i].pos = data.parts_of_speech["JJ"]
        results[i].rule = rule
        return results
      if results[i + 1]
        if results[i].pos.tag is "RB"
          results[i].pos.parent = "adjective"
          results[i].rule = rule
      else #last word and still no verb
        if options.strong
          results[i].pos = data.parts_of_speech["JJ"]
          results[i].rule = rule
      i++
    results

  #suggest a verb or adjective is coming
  suggest_adverb_phrase = (o, rule, results, options) ->
    top = results.length
    i = o + 1

    while i < top
      return results  if results[i].pos.parent is "adjective" or results[i].pos.parent is "verb"
      if results[i].pos.parent is "noun"
        results[i].pos = data.parts_of_speech["JJ"]
        results[i].rule = rule
        return results
      if results[i + 1]
        if results[i].pos.tag is "RB"
          results[i].pos.parent = "adjective"
          results[i].rule = rule
      else #last word and still no verb
        if options.strong
          results[i].pos = data.parts_of_speech["JJ"]
          results[i].rule = rule
      i++
    results
  tagger = (words, options) ->
    results = []
    for i of words
      word = words[i]
      results[i] =
        word: word
        pos: null
        clues: []

      patterns = [
        reg: /[a-z]\-[a-z]/
        pos: "JJ"
      ,
        reg: /^de\-[a-z]../
        pos: "VB"
      ,
        reg: /^un\-[a-z]../
        pos: "VB"
      ,
        reg: /^re\-[a-z]../
        pos: "VB"
      ,
        reg: /.*ould$/
        pos: "MD"
      ,
        reg: /..*ing$/
        pos: "VBG"
      ,
        reg: /..*ates$/
        pos: "VBZ"
      ,
        reg: /..*ses$/
        pos: "VBZ"
      ,
        reg: /..*ify$/
        pos: "VB"
      ,
        reg: /..*ize$/
        pos: "VB"
      ,
        reg: /..*ated$/
        pos: "VBN"
      ,
        reg: /..*'n$/
        pos: "VBG"
      ,
        reg: /...*ed$/
        pos: "VBD"
      ,
        reg: /.*ness$/
        pos: "NN"
      ,
        reg: /.*ment$/
        pos: "NN"
      ,
        reg: /.*full?$/
        pos: "JJ"
      ,
        reg: /.*ous$/
        pos: "JJ"
      ,
        reg: /.*ble$/
        pos: "JJ"
      ,
        reg: /.*ic$/
        pos: "JJ"
      ,
        reg: /..*ive$/
        pos: "JJ"
      ,
        reg: /..*ic$/
        pos: "JJ"
      ,
        reg: /..*est$/
        pos: "JJS"
      ,
        reg: /.*ical$/
        pos: "JJ"
      ,
        reg: /.*ial$/
        pos: "JJ"
      ,
        reg: /...*ish$/
        pos: "JJ"
      ,
        reg: /...*nal$/
        pos: "JJ"
      ,
        reg: /.*less$/
        pos: "JJ"
      ,
        reg: /.*ier$/
        pos: "JJR"
      ,
        reg: /.*ened$/
        pos: "JJ"
      ,
        reg: /.*some$/
        pos: "JJ"
      ,
        reg: /..*ant$/
        pos: "JJ"
      ,
        reg: /..*like$/
        pos: "JJ"
      ,
        reg: /..*ky$/
        pos: "JJ"
      ,
        reg: /..*ly$/
        pos: "RB"
      ,
        reg: /\./
        pos: "NN"
      ,
        reg: /^((?![aeiouy]).)*$/
        pos: "NN"
      ,
        reg: /^-?[0-9]+(.[0-9]+)?$/
        pos: "CD"
      ,
        reg: /'s$/
        pos: "NNO"
      ]
      for o of patterns
        if word.match(patterns[o].reg)
          results[i].pos = data.parts_of_speech[patterns[o].pos]
          results[i].rule = "regex"
      word = word.replace(/[\.,!:;]*$/, "")
      lex = data.lexicon[word.toLowerCase()]
      if lex
        results[i].pos = data.parts_of_speech[lex]
        results[i].rule = "lexicon"
      if i isnt 0 and word.match(/[A-Z]/)
        results[i].pos = data.parts_of_speech["NN"]
        results[i].rule = "capital"
      if parseFloat(word)
        results[i].pos = data.parts_of_speech["NN"]
        results[i].rule = "number"
      unless results[i].pos
        results[i].pos = data.parts_of_speech["NN"]
        results[i].rule = "unknown"
    for i of results
      i = parseInt(i)
      continue  unless results[i + 1]
      if results[i].pos.tag is "RB" and (not results[i - 1] or results[i - 1].pos.parent isnt "verb")
        results = suggest_adverb_phrase(i, "from_adverb", results,
          strong: false
        )
      if results[i].pos.tag is "PP"
        results = suggest_noun_phrase(i, "from_posessive", results,
          strong: true
        )
      if results[i].pos.tag is "VBZ" and results[i + 1].pos.parent isnt "verb"
        results = suggest_adjective_phrase(i, "vbz-adjective", results,
          strong: false
        )
      if results[i].pos.tag is "DT"
        results = suggest_noun_phrase(i, "from_determiner", results,
          strong: false
        )
      if results[i].pos.tag is "MD"
        results = suggest_verb_phrase(i, "from_would", results,
          strong: false
        )
    for i of results
      i = parseInt(i)
      continue  unless results[i + 1]
      if results[i].pos.parent is "noun" and results[i + 2] and results[i + 1].pos.tag is "JJ" and results[i + 2].pos.parent is "noun"
        unless options.big
          results[i + 1].pos = data.parts_of_speech["NN"]
          results[i + 1].rule = "noun_adjective_noun"
      if results[i].pos.tag is "JJ" and results[i + 1].pos.parent is "verb"
        results[i].pos = data.parts_of_speech["RB"]
        results[i].rule = "adjective_verb"
      if results[i].pos.tag is "JJ" and results[i + 1].pos.tag is "JJ"
        unless results[i].word.match(",")
          results[i].pos = data.parts_of_speech["RB"]
          results[i].rule = "twoadjectives"
      if results[i].pos.tag is "PRP"
        if results[i - 1] and results[i - 1].pos.parent is "adjective"
          results[i - 1].pos = data.parts_of_speech["VB"]
          results[i - 1].rule = "verb_myself"
        else if not results[i - 1] or not results[i - 1].pos.parent is "verb"
          results = suggest_verb_phrase(i, "from_pronoun", results,
            strong: false
          )
      if results[i].pos.tag is "CP" and results[i + 1].pos.tag is "IN"
        results[i + 1].pos = data.parts_of_speech["VB"]
        results[i + 1].rule = "preposition_verb"
      if results[i].pos.parent is "adjective" and results[i + 1].pos.tag is "CC" and results[i + 2] and results[i + 2].pos.parent is "noun"
        results[i + 2].pos = data.parts_of_speech["JJ"]
        results[i + 2].rule = "and_adjective"
    last = results.length - 1
    if results[last - 1]
      if results[last - 1].pos.tag is "CP" and results[last].pos.parent is "noun"
        results[last].pos = data.parts_of_speech["JJ"]
        results[last].rule = "end_copula"
      if results[last - 1].pos.parent is "noun" and (results[last].pos.parent is "adjective" or results[last].pos.tag is "RB")
        results[last].pos = data.parts_of_speech["NN"]
        results[last].rule = "ending_noun"
    results


  # export for AMD / RequireJS
  if typeof define isnt "undefined" and define.amd
    define [], ->
      tagger
  # export for Node.js
  else module.exports = tagger  if typeof module isnt "undefined" and module.exports
  tagger
)()