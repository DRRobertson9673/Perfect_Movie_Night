
var countryList = {
	netflix: ["ar", "at", "au", "be", "br", "ca", "ch", "cl", "co", "cz", "de", "dk", "ec", "ee", "es", "fi", "fr", "gb", "gr", "hu", "id", "ie", "in", "it", "jp", "kr", "lt", "lv", "mx", "my", "nl", "no", "nz", "pe", "ph", "pl", "pt", "ro", "ru", "se", "sg", "th", "tr", "us", "ve", "za"],
};

var userCountry = "gb";
var userService = "";
var userType = "movie";
var userGenre = "";


// Click Event Listener for the streaming service buttons
$(document).on("click", ".platformBtn", function (event) {
	event.preventDefault();
	userService = ($(this).attr("id")).toLowerCase();
});


// Click Event Listener to make page scroll up when a service platform button is clicked
$(".platformBtn").click(function () {
	$('html, body').animate({ scrollTop: $("#pleaseSelect").offset().top }, 500);
});


// Change Event Listener to set userType value with user preference when the clicker is toggled, and to switch colour of text based on user choice of series or movie
$('#TVSwitch').change(
	function () {
		if ($(this).is(':checked')) {
			userType = "series";
			$("#seriesLabel").addClass("mediaSelectorSelected").removeClass("mediaSelector");
			$("#moviesLabel").addClass("mediaSelector").removeClass("mediaSelectorSelected");
		} else {
			userType = "movie";
			$("#seriesLabel").addClass("mediaSelector").removeClass4("mediaSelectorSelected");
			$("#moviesLabel").addClass("mediaSelectorSelected").removeClass("mediaSelector");
		}
	}
);


// Change Event Listener to set the userGenre value when an option is selected from the drop down genre menu
$("#genreSelect").change(function () {
	userGenre = $(this).children("option:selected").val();
});

// Event listener for the "Search" button after user chooses preferences
$("#go-button").on("click", function () {

	$("#poster-group").empty();
	
	const settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://streaming-availability.p.rapidapi.com/search/basic?country=gb&service=" + userService + "&type=" + userType + userGenre + "&output_language=en&language=en",
		"method": "GET",
		"headers": {
			"X-RapidAPI-Key": "75d2fd589bmsh1543238bae58bf5p1a98fcjsne79d00e604bd",
			"X-RapidAPI-Host": "streaming-availability.p.rapidapi.com"
		}
	};
	

	$.ajax(settings).done(function (response) {
		let parsedResponse = JSON.parse(response);
		var imdbID;
		var getPoster;

		for (let i = 0; i < parsedResponse.results.length; i++) {
			imdbID = parsedResponse.results[i].imdbID
			getPoster = parsedResponse.results[i].posterURLs[342]
			$("#poster-group").append(`
				<div class="col mb-1 p-1">
					<div data-value="` + imdbID + `" class="card rounded-0 border-0">
						<img src="` + getPoster + `" class="card-img-top rounded-0" data-toggle="modal" data-target="#movieDataModal" alt="Movie Poster">
					</div>
				</div>`)
			
		}
		clicker();


	})
})


// Function to make an api call to OMDB using imdbID to get movie/show details
function clicker() {

	$(".card").click(function () {
		var movie = this.dataset.value;
		var queryURL = "https://www.omdbapi.com/?i=" + movie + "&apikey=trilogy";
		$.ajax({
			url: queryURL,
			method: "GET"
		}).then(function (response) {
			var poster = response.Poster
			var title = response.Title
			var genre = response.Genre
			var director = response.Director
			var cast = response.Actors
			var plot = response.Plot
			$('.movieDataPoster').attr("src", poster)
			$('.title').text(title)
			$('.genre').text(genre)
			$('.director').text('Director: ' + director)
			$('.cast').text('Cast: ' + cast)
			$('.plot').text(plot)

			// Declare a variable and define an object. This  will store requisite data which allows us obtain movie/tv show information from OMDB as we need to, without having to make multiple calls to Rapid API

			var newMovieObject = {

				imdbID: movie,
				poster: poster
			}


			$("#watchlist-button").on("click", function(event) {

				event.preventDefault();	

				var localWatchlist = localStorage.getItem("user-watchlist");

				var parsedWatchlist;

				if(!localWatchlist) {

					parsedWatchlist = [];

				} else {

					parsedWatchlist = JSON.parse(localWatchlist);

				}

				parsedWatchlist.push(newMovieObject);

				//TO DO: SORT ARRAY IN ASCENDING ALPHABETICAL ORDER

				console.log(parsedWatchlist);

				localStorage.setItem("user-watchlist", JSON.stringify(parsedWatchlist));
			})
		});		
	});
}

/*Populating the Watchlist
---------------------------*/

// First get the watchlist array from local storage, then convert to array/object form

var localWatchlist = localStorage.getItem("user-watchlist");

console.log(localWatchlist); // FINE

var parsedUserWatchlist = JSON.parse(localWatchlist);

console.log(parsedUserWatchlist); // FINE

// Then loop through the array of objects. We only want it to run if there is data in local storage

if(localWatchlist !== null) {

	$("#watchlist-poster-group").empty(); 

	for (let i = 0; i < parsedUserWatchlist.length; i++) {

		console.log(parsedUserWatchlist[i].imdbID);
		console.log(parsedUserWatchlist[i].poster);

		$("#watchlist-poster-group").append(`
				<div class="col mb-1 p-1">
					<div data-value="${parsedUserWatchlist[i].imdbID}" data-index="${i}" class="watchlist-card rounded-0 border-0">
						<img src="${parsedUserWatchlist[i].poster}" class="card-img-top rounded-0" data-toggle="modal" data-target="#watchlistMovieDataModal" alt="Movie Poster">
					</div>
				</div>`
		);		
	}

	// Render the Movie/TV Show Posters on the Watchlist

	$(".watchlist-card").click(function () {
		var movie = this.dataset.value;
		var index = this.dataset.index; // We assign a data-index attribute which matches the index of its corresponding imdb ID in the watchlist array. This will make it easier to target it later for removal.

		var queryURL = "https://www.omdbapi.com/?i=" + movie + "&apikey=trilogy";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).then(function (response) {
			var poster = response.Poster
			var title = response.Title
			var genre = response.Genre
			var director = response.Director
			var cast = response.Actors
			var plot = response.Plot

			$('.watchlistMovieDataPoster').attr("src", poster)
			$('.watchlist-title').text(title)
			$('.watchlist-genre').text(genre)
			$('.watchlist-director').text('Director: ' + director)
			$('.watchlist-cast').text('Cast: ' + cast)
			$('.watchlist-plot').text(plot)	
		});

		// To Remove a Movie/Show from Watchlist

		$("#watchlist-remove").on("click", function() {

			parsedUserWatchlist.splice(index, 1);

			localStorage.setItem("user-watchlist", JSON.stringify(parsedUserWatchlist));

			location.reload();
		})
	});
}


/* Add to-, Remove from-, and Clear Watchlist Functionality
------------------------------------------------------------*/

$("#back-search").on("click", function() {

	window.location.href = "index.html";
});


// code to clear modal contents when it is hidden to prevent previous content showing briefly on load

$(".close").on("click", function(event) {
	var poster = ""
	var title = ""
	var genre = ""
	var director = ""
	var cast = ""
	var plot = ""
	$('.movieDataPoster').attr("src", poster)
	$('.title').text(title)
	$('.genre').text(genre)
	$('.director').text('Director: ' + director)
	$('.cast').text('Cast: ' + cast)
	$('.plot').text(plot)
});

$(".watchlist-close").on("click", function(event) {
	var poster = "";
	var title = "";
	var genre = "";
	var director = "";
	var cast = "";
	var plot = "";

	$('.watchlistMovieDataPoster').attr("src", poster);
	$('.watchlist-title').text(title);
	$('.watchlist-genre').text(genre);
	$('.watchlist-director').text('Director: ' + director);
	$('.watchlist-cast').text('Cast: ' + cast);
	$('.watchlist-plot').text(plot);	
  });