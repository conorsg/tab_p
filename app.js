// Search your open tabs
// Made by Conor Gaffney, 2012

(function ($, win, doc) {

  var tabsData = [];

  //returns array of tabs objects
  function getTabs() {
    chrome.tabs.getAllInWindow(function(tabList) {
        window.tabs = tabList;
        tabList.score = '';
        tabsData = tabList;
    });
  }

  //runs search term against tab properties using qs_score.js (http://code.google.com/p/rails-oceania/source/browse/lachiecox/qs_score/trunk/qs_score.js)
  function runQuery(input) {
    
    for (var i = 0; i < tabsData.length; i++) {
      titleQuery = tabsData[i].title.toLowerCase().score(input);
      urlQuery = tabsData[i].url.score(input);

      //weight title match over url match and set each tab's score
      tabsData[i].score = titleQuery; 
    }

    tabsData.sort(function(a,b){
      return b.score - a.score;
    });
  }

  //writes ordered list of tabs
  function writeList(tabsData){
    for (var i = 0; i < tabsData.length; i++) {
      $('ul').append('<li><a href="#">'+tabsData[i].title+'</a></li>');
      ( function () {
        var x = i;
        $('a').eq(x).click(function(e) {
          openTab(x);
        });
      }) ();    
    }
  }

  function openTab(i) {
    //opens [i] tab search result
    chrome.tabs.update(tabsData[i].id, updateProperties = {active:true});
  }

  // navigate through tab list with arrow keys
  $(doc).ready(function() {
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
  });    

  //let's do this
  getTabs();

  $(doc).ready(function() {
    $('#target').submit(function(e) {
     
      e.preventDefault();
      var input = $('input[type="text"]').val();
      $('ul').empty();

      if (input === '') {
        $('ul').append('<li class ="empty">Please enter a search term</li>');
      } 
      else {
        runQuery(input);
        writeList(tabsData);
        $('li:first-child').addClass('selected');
        $('.selected a').focus();
      }
    });
  });

})(jQuery, window, document);