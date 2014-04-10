var parts_of_speech = (function() {

    var main = {

        //verbs
        "VB": {
            "description": "verb, base form",
            "example": "eat",
            "parent": "verb",
            "tag": "VB"
        },
        "VBD": {
            "description": "verb, past tense",
            "example": "ate",
            "parent": "verb",
            "tense": "past",
            "tag": "VBD"
        },
        "VBN": {
            "description": "verb, past participle",
            "example": "eaten",
            "parent": "verb",
            "tense": "past",
            "tag": "VBN"
        },
        "VBP": {
            "description": "Verb, infinitive",
            "example": "eat",
            "parent": "verb",
            "tense": "present",
            "tag": "VBP"
        },
        "VBZ": {
            "description": "Verb, present",
            "example": "eats, swims",
            "tense": "present",
            "parent": "verb",
            "tag": "VBZ"
        },
        "CP": {
            "description": "copula",
            "example": "is, was, were",
            "parent": "verb",
            "tag": "CP"
        },
        "VBG": {
            "description": "verb, gerund",
            "example": "eating,winning",
            "parent": "verb",
            "tag": "VBG"
        },


        //adjectives
        "JJ": {
            "description": "Adjective",
            "example": "big, nice",
            "parent": "adjective",
            "tag": "JJ"
        },
        "JJR": {
            "description": "Adj., comparative",
            "example": "bigger, cooler",
            "parent": "adjective",
            "tag": "JJR"
        },
        "JJS": {
            "description": "Adj., superlative",
            "example": "biggest, fattest",
            "parent": "adjective",
            "tag": "JJS"
        },


        //adverbs
        "RB": {
            "description": "Adverb",
            "example": "quickly, softly",
            "parent": "glue",
            "tag": "RB"
        },
        "RBR": {
            "description": "Adverb, comparative",
            "example": "faster, cooler",
            "parent": "adjective",
            "tag": "RBR"
        },
        "RBS": {
            "description": "Adverb, superlative",
            "example": "fastest (driving), coolest (looking)",
            "parent": "adjective",
            "tag": "RBS"
        },


        //nouns
        "NN": {
            "description": "Noun, sing. or mass",
            "example": "dog, rain",
            "parent": "noun",
            "tag": "NN"
        },
        "NNP": {
            "description": "Proper noun, sing.",
            "example": "Edinburgh, skateboard",
            "parent": "noun",
            "tag": "NNP"
        },
        "NNPS": {
            "description": "Proper noun, plural",
            "example": "Smiths",
            "parent": "noun",
            "tag": "NNPS"
        },
        "NNS": {
            "description": "Noun, plural",
            "example": "dogs, foxes",
            "parent": "noun",
            "tag": "NNS"
        },
        "NNO": {
            "description": "Noun, possessive",
            "example": "spencer's, sam's",
            "parent": "noun",
            "tag": "NNO"
        },
        "NG": {
            "description": "noun, gerund",
            "example": "eating,winning - but used grammatically as a noun",
            "parent": "noun",
            "tag": "VBG"
        },


        //glue
        "PP": {
            "description": "Possessive pronoun",
            "example": "my,one's",
            "parent": "glue",
            "tag": "PP"
        },
        "FW": {
            "description": "foreign word",
            "example": "mon dieu, voila",
            "parent": "glue",
            "tag": "FW"
        },
        "CD": {
            "description": "Cardinal number",
            "example": "one,two",
            "parent": "glue", //may want to change this
            "tag": "CD"
        },

        "IN": {
            "description": "Preposition",
            "example": "of,in,by",
            "parent": "glue",
            "tag": "IN"
        },
        "MD": {
            "description": "Modal",
            "example": "can,should",
            "parent": "glue",
            "tag": "MD"
        },
        "CC": {
            "description": "Coord Conjuncn",
            "example": "and,but,or",
            "parent": "glue",
            "tag": "CC"
        },
        "PRP": {
            "description": "Personal pronoun",
            "example": "I,you,she",
            "parent": "glue",
            "tag": "PRP"
        },
        "DT": {
            "description": "Determiner",
            "example": "the,some",
            "parent": "glue",
            "tag": "DT"
        },
        "UH": {
            "description": "Interjection",
            "example": "oh, oops",
            "parent": "glue",
            "tag": "UH"
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = main;
    }

    return main
})()