// Refactored 2014
// Dependencies: qsScore, jQuery
(function ($, win, doc) {
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
    // navigate through tab list with arrow keys
    $(win).keydown(function(e){
      start = $('.selected');
      start.removeClass('selected');
      if(e.which === 40) {
        if(start.next().length === 0) {
          $('li:first-child').addClass('selected');
          $('.selected a').focus();
        }else{
          start.next().addClass('selected');
          $('.selected a').focus();
        }
      }
      else if(e.which === 38) {
        if(start.prev().length === 0){
          $('li:last-child').addClass('selected');
          $('.selected a').focus();
        }else{
          start.prev().addClass('selected');
          $('.selected a').focus();
        }
      }
    });

    $('#target').submit(function(e) {
      e.preventDefault();

      var input = $('input[type="text"]').val();
      $('ul').empty();

      if (input == '') {
        $('ul').append('<li class ="empty">Please enter a search term</li>');
      }
      else {
        query(input);
        list(tabs);
        $('li:first-child').addClass('selected');
        $('.selected a').focus();
      }
    });
  }

  $(doc).ready(function() { init(); });
})(jQuery, window, document);
