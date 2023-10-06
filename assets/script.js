//initial references
var movieNameRef = document.getElementById("movie-name");
var searchBtn = document.getElementById("search-btn");
var result = document.getElementById("result");
var key = "b56525c";
var movieName;

var movieNameInput = document.getElementById('movie-name');

//fetch data from api
var getMovie = function () {
     movieName = movieNameRef.value.trim(); // Trim whitespace

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

// Function to run the getMovie function when Enter key is pressed
function runGetMovieOnEnter(event) {
    if (event.key === 'Enter') {
        getMovie();
    }
}


searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
// Add an event listener to the input field to listen for Enter key press
movieNameInput.addEventListener('keydown', runGetMovieOnEnter);

// code for rotten tomatoes api
document.getElementById('searchReviewsButton').addEventListener('click', function () {
    // Rotten api key
    const apiKey = 'https://rotten-tomatoes-api.ue.r.appspot.com';

    // Define the URL for the Rotten Tomatoes API
    const apiUrl = `https://rotten-tomatoes-api.ue.r.appspot.com/movie/${movieName}`;

    // Make a GET request to the Rotten Tomatoes API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Handle the API response data here
            // For example, you can display the reviews in a div
            const reviewsContainer = document.getElementById('reviewsContainer');
            reviewsContainer.innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        }); 
}); 