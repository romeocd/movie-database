//initial references
var movieNameRef = document.getElementById("movie-name");
var searchBtn = document.getElementById("search-btn");
var result = document.getElementById("result");
var key = "b56525c";

//fetch data from api
var getMovie = () => {
    var movieName = movieNameRef.value;
    var url = `http://omdbapi.com/?t=${movieName}&apikey=${key}`;

    //if input field is empty
    if(movieName.length <=0) {
        result.innerHTML = `<h4 class ="msg">Enter A Movie Name </h4>`;
    } 

    //if input field is not empty
    else {
        fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
                //if movie exists in database
                if(data.response == 'True'){

            result.innerHTML = `
                <div class="info">
                    <img src=${data.Poster} class="poster">
                    <div>
                        <h2>${data.Title}</h2>
                        <div class="rating">
                            <img src="star-icon.svg">
                            <h4>${data.imdbRating}</h4>
                        </div>
                        <div class="details">
                            <span>${data.Rated}</span>
                            <span>${data.Year}</span>
                            <span>${data.Runtime}</span>
                        </div>

                        <div class="genre">
                            <div>${data.Genre.split(",").
                            join("<div></div>")}</div>
                        </div>
                    </div>
                </div>
                <h3>Plot:</h3>
                <p>${data.Plot}</p>
                <h3>Cast:</h3>
                <p>${data.Actors}</p>
            `;
            }

            //if movie does not exist in database
            else {
                result.innerHTML=`<h3 class='msg'>${data.Error}</h3>`;
            }
        })
        .catch(() => {
            result.innerHTML=`<h3 class="msg">Error Occured </h3>`;
        });
    }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);