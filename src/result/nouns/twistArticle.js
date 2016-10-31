'use strict';

//articles that are sensitive to singular/plural
const pluralMap = {
  a: 'the',
  an: 'the',
  the: 'the',
  this: 'those',
};
const singularMap = {
  these: 'this',
  those: 'that',
};

//the article comes before this noun
const findArticle = function(ts, i) {
  //look backward a couple terms for the article
  for(let o = i; o >= 0; o -= 1) {
    let t = ts.terms[o];
    //smells like an article
    if (t && pluralMap[t.normal] || singularMap[t.normal]) {
      return t;
    }
    //a verb ends the search, i think.
    if (t.tag.Verb) {
      return null;
    }
    //don't go too far back..
    if (i - o > 4) {
      return null;
    }
  }
  return null;
};

const toPlural = (ts, i) => {
  let article = findArticle(ts, i);
  if (article && pluralMap[article.normal]) {
    article.text = pluralMap[article.normal];
  }
  return ts;
};

const toSingular = (ts, i) => {
  let article = findArticle(ts, i);
  if (article) {
    if (singularMap[article.normal]) {
      article.text = singularMap[article.normal];
    } else {
      article.text = article.noun.makeArticle(); // (a/an)
    }
  }
  return ts;
};

module.exports = {
  toPlural: toPlural,
  toSingular: toSingular,
};
