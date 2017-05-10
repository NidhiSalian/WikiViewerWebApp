function displaySearchResults(searchqry) {
  var searchQry = searchqry;
  var searchUrl = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts&pilimit=max&exintro&explaintext&exsentences=2&exlimit=max&gsrsearch=" + searchQry + "&callback=?";
  
  
  $.ajax({
        type: "GET",
        url: searchUrl,
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
          var searchResults = data.query.pages;
          for(var pageId in searchResults) {
            if (!searchResults.hasOwnProperty(pageId)) continue;
            var obj = searchResults[pageId];         
              $("#resultsList").append('<a href="http://en.wikipedia.org/?curid=' + obj.pageid + '" class="list-group-item">' + '<h4>' + obj.title + '</h4>' + obj.extract + '</a>');
          };
        },
        error: function (errorMessage) {
        }
    });
};



$(document).ready(function(){
 
  $("input").on("keydown",function search(e) {
      if(e.keyCode == 13) {
        displaySearchResults($(this).val());
      }
  });
  
  $("button").on("click", function(){
     displaySearchResults($("input").val());
  });
  
  
  $( "a" ).click(function( event ) {
  event.preventDefault();
});

  });