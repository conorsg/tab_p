// Refactored 2014
// Dependencies: qsScore, jQuery

var tabs = chrome.tabs.query(
  { currentWindow: true},
  function(e) { return e }
)

function query(input) {
  tabs.forEach(function(t) {
    t.titleScore = t.title.toLowerCase().score(input)
    t.urlScore = t.url.score(input)
    t.score = t.titleScore + (t.urlScore * 0.75) //url match not as important as title
  })

  tabs.sort(function(a,b) {
    return b.score - a.score
  })
}

function list() {

}

function init() {

}
