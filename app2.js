// Refactored 2014
// Dependencies: qsScore, jQuery
var tabs;

chrome.tabs.query(
  { currentWindow: true},
  function(e) { tabs = e }
);

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

function list(tabs) {
  tabs.forEach(function(t) {
    $('ul').append( '<li><img src="'+t.favIconUrl+'" /><a href="#">'+t.title+'</a></li>' )
    $('a').eq(tabs.indexOf(t)).click(function(e) {
      chrome.tabs.update(t.id, updateProperties = { active: true })
    })
  })
}

function init() {

}
