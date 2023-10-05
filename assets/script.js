//initial references
var movieNameRef = document.getElementById("movie-name");
var searchBtn = document.getElementById("search-btn");
var result = document.getElementById("result");
var key = "b56525c";

//fetch data from api
var getMovie = function () {
    var movieName = movieNameRef.value.trim(); // Trim whitespace

    // Check for empty input
    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Enter a Movie Name</h3>`;
        return; // Exit the function early
    }

    var apiUrl = `https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${key}`;

    fetch(apiUrl)
        .then((resp) => resp.json())
        .then((data) => {
            if (data.Response === 'True') {
                displayMovieInfo(data);
            } else {
                result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            result.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
        });
};

function displayMovieInfo(data) {
    result.innerHTML = `
        <div class="info">
            <img src=${data.Poster} class="poster">
            <div>
                <h2>${data.Title}</h2>
                <div class="rating">
                    <h4>${data.imdbRating}</h4>
                </div>
                <div class="details">
                    <span>${data.Rated}</span>
                    <span>${data.Year}</span>
                    <span>${data.Runtime}</span>
                </div>
                <div class="genre">
                    <div>${data.Genre.split(",").join("</div><div>")}</div>
                </div>
            </div>
        </div>
        <h3 class="plot">Plot:</h3>
        <p>${data.Plot}</p>
        <h3 class="cast">Cast:</h3>
        <p>${data.Actors}</p>
    `;
}


searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);