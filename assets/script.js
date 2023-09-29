var movieNameRef = document.getElementbyID("movie-name");
var searchBtn = document.getElementById("search-btn");
var result = document.getElementbyID("result");

var getMovie = () => {
    var movieName = movieNameRef.value;
    var url = `http://omdbapi.com/?t=${movieName}&apikey=${key}`;
}