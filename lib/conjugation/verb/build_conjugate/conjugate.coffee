rules= require("./rules").rules

o= {
    "infinitive": "convolute",
    "present": "convolutes",
    "gerund": "convoluting",
    "past": "convoluted"
  }

w= "convoluted"
w= "overthrew"
w= "overthrowing"
# w= "overcompensating"
w= "convolutes"
w= "relays"
w= "relays"
w= "present"
w= "angulate"
w= "regularize"

for r in rules
  if w.match(r.reg)
    obj= Object.keys(r.repl).reduce((h, k)->
      h[k]=w.replace(r.reg, r.repl[k])
      h
    ,{})
    console.log obj
    break
