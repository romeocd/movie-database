//initial references
var movieNameRef = document.getElementById("movie-name");
var searchBtn = document.getElementById("search-btn");
var result = document.getElementById("result");
var key = "b56525c";

var movieNameInput = document.getElementById('movie-name');

//fetch data from omdb api
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




var trendingBtn = document.getElementById("trending-btn");

const url = 'https://movies-tv-shows-database.p.rapidapi.com/?page=1';
const options = {
	method: 'GET',
	headers: {
		Type: 'get-trending-movies',
		'X-RapidAPI-Key': '21bae2644cmsh8bd4b10695cbaaap1a58d9jsncc0ed5c6c26d',
		'X-RapidAPI-Host': 'movies-tv-shows-database.p.rapidapi.com'
	}
};

var getTrending = function () {
    fetch(url, options)
        .then((resp) => resp.json())
        .then((data) => {
            
            // Check if there are movie results
            if (Array.isArray(data.movie_results)) {
                // Create an HTML table to display titles and release dates
                const table = document.createElement('table');
                table.classList.add('trending-table');

                // Create table header
                const tableHeader = document.createElement('thead');
                tableHeader.innerHTML = `
                    <tr>
                        <th>Title</th>
                        <th>Release Date</th>
                    </tr>
                `;
                table.appendChild(tableHeader);

                // Create table body
                const tableBody = document.createElement('tbody');

                // Populate the table with movie titles and release dates
                data.movie_results.forEach((movie) => {
                    const row = document.createElement('tr');
                    const titleCell = document.createElement('td');
                    const releaseDateCell = document.createElement('td');

                    titleCell.textContent = movie.title;
                    releaseDateCell.textContent = movie.year;

                    row.appendChild(titleCell);
                    row.appendChild(releaseDateCell);
                    tableBody.appendChild(row);
                });

                table.appendChild(tableBody);

                // Clear any previous content and append the table to the result section
                result.innerHTML = '';
                result.appendChild(table);
            } else {
                result.innerHTML = `<h3 class='msg'>No trending movies found.</h3>`;
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            result.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
        });
};

trendingBtn.addEventListener("click", getTrending);