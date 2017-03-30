var populateList = function(albums){
  var albumList = albums.albums.items;
  var ul = document.getElementById('search-results');
  while( ul.firstChild ){
    ul.removeChild( ul.firstChild );
  };
  albumList.forEach(function(album){
        var li = document.createElement('li');
        li.innerText = album.artists[0].name;
        console.log(album);
        // console.log(result);

        ul.appendChild(li);
    });
};

var getQuery = function(url){
  var input = document.querySelector('#search-query');
  var query = input.value;
   return url+ "q=" + query + "&type=album";
  // return query;
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  var query = getQuery(url);
  request.open("GET", query);
  request.onload = callback;
  request.send();
};

var requestComplete = function(){
  if(this.status != 200){
    return;
  }
  var jsonString = this.responseText;
  var searchResult = JSON.parse(jsonString);
  console.log(searchResult);
  populateList(searchResult);
};

var handleClick = function(){
  var url = "https://api.spotify.com/v1/search?";
  makeRequest(url, requestComplete);
};

var app = function(){
  var search = document.querySelector('button#search-btn');
  search.onclick = handleClick;
 
  // makeRequest(url, requestComplete);
};

window.onload = app;