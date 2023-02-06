
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
			"X-RapidAPI-Key": "85cea767d7msh61dfa0edc659024p1cafe1jsnc76b9a205a8d",
			"X-RapidAPI-Host": "streaming-availability.p.rapidapi.com"
		}
	};
	$.ajax(settings).done(function (response) {
		let parsedResponse = JSON.parse(response);
		for (let i = 0; i < parsedResponse.results.length; i++) {
			var imdbID = parsedResponse.results[i].imdbID
			var getPoster = parsedResponse.results[i].posterURLs[342]
			$("#poster-group").append(`
				<div class="col mb-1 p-1">
					<div data-value="` + imdbID + `" class="card rounded-0 border-0">
						<img src="` + getPoster + `" class="card-img-top rounded-0" data-toggle="modal" data-target="#movieDataModal" alt="Movie Poster">
					</div>
				</div>`)
			clicker()
		}
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
	});
});
}

/* Add to-, Remove from-, and Clear Watchlist Functionality
------------------------------------------------------------*/

$("#back-search").on("click", function() {

	window.location.href = "index.html";
});

// There are four events we will be looking at:

//1. Clicking to add a movie or TV show to watchlist (if there is time, maybe create two different arrays for TV and Movies, and render them separately on the page);
//2. Clicking to view watchlist
//3. Clicking to remove a movie poster from the watchlist
//4. Clicking to clear the watchlist


/*1. Add Movie to Watchlist
---------------------------*/

// If the user chooses to click "Add to Watchlist" or "+" on a particular poster, we want two things to happen: 
//1. That button turns to a tick (or something that indicates it is in the watchlist, without using a prompt)
//2. All the information required to render that particular poster and its associated modal to be extracted from the response, put into an object, and then for that object to be pushed into an array (userWatchlist). 

// The idea, every time the watchlist is loaded, is to take this userWatchlist array and use it to populate the watchlist page by rendering the respective posters and their attached modals (THIS WILL COME IN THE SECOND EVENT LATER)

$("#watchlist-button").on("click", function(event) {

	event.preventDefault();

	console.log(title, genre);

// // Start by calling whatever is in local storage

// 	var localWatchlist = localStorage.getItem("user-watchlist"); 

// // Also define a couple of variables

// 	var parsedWatchlist = JSON.parse(localWatchlist);

// 	var userWatchlist;

// // If there is nothing in local storage, then we set userWatchlist to an empty array.

// 	if(!parsedWatchlist) {

// 		userWatchlist = [];
// 	} else {

// // If there is something, though, then we want to parse whatever is in local storage, and set userWatchlist array to that.

// 		userWatchlist = parsedWatchlist;

	});

// // Now, whenever the search results come up on the main page, we want to have the posters dynamically render from the response, along with an "add to watchlist" button which has a dataset attribute - call it data-index, for example. We want to set this to the index position of the movie within the response array. (This data-index = response.results[i] will come in handy when trying to extract the info required to populate the object used to render the watchlist posters and modals)

// // We will first put the bits of information needed for the posters and the modals in variables eg:

// 	var movieDatasetAttribute = $("#search-poster").attr("data-index");

// 	var movieTitle = response.results[movieDatasetAttribute].title;
// 	var moviePoster = response.results[movieDatasetAttribute].posterURLs[185];

// etc etc

// // And then create an object with them

// 	var newMovieObject = {
// 		title: movieTitle,
// 		poster: moviePoster,
// etc etc
// 	}

// // Next, push this new object into the userWatchlist array

// 	userWatchlist.push(newMovieObject);

// // THEN we want the userWatchlist array to be sorted in ascending alphabetical order based on the movie title
// // https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value/70319634?noredirect=1#comment124367399_70319634
// // https://www.scaler.com/topics/javascript-sort-an-array-of-objects/

// // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// (NB: We can either sort the array here before the watchlist is rendered, OR add the movie as a dataset/id and sort the div elements after they've been rendered.)

// // Once it is sorted, then it should be stringified and set in local storage. 

// 	localStorage.setItem("user-watchlist", JSON.stringify(userWatchlist));

// // Now, we have all the information required to render the user's preferred movie/show stored in local storage.

// /*2. Viewing the Watchlist
// --------------------------*/

// // Whenever the user clicks "My Watchlist", then it should direct the user to the watchlist page.

// $(".watchlist").on("click", function() {

// 	window.location.href = "watchlist.html";

// // We then call the information in local storage whenever the page is loaded and use this to populate the watchlist webpage

// //(I think I might put this into a function "renderWatchlistPosters()", and then call the function at the end of the code base so that it triggers whenever the application runs. THEN the watchlist click will simply take the user to the watchlist BUT the watchlist will always be populated without being triggered by the click event.)
	
// 	var watchlistRenders = $("#xxx")

// 	$(watchlistRenders).empty();

// 	var localWatchlist = localStorage.getItem("user-watchlist");

// 	var parsedWatchlist = JSON.parse(localWatchlist);

// 	if(localWatchlist !== null) {

// 		for (var i = 0; i < parsedWatchlist.length; i++) {

// 			$(watchlistRenders).append(`WRITE IN HTML CODE TEMPLATE WITH parsedWatchlist[i] REFERENCES IN THE DATASET ATTRIBUTE, AND DIRECTLY REFERENCE THE PARSED OBJECT. IF THE OBJECT WAS NOT SORTED BEFORE, ADD MOVIE AS ID, AND WRITE AND CALL A FUNCTION TO SORT AT THIS STAGE BASED ON THIS IN ALPHABETICAL ORDER`);

// 		} else {
// 			$("<p>").text("Nothing added to your watchlist yet")
// });


// /*3. Remove from Watchlist
// --------------------------*/

// $("#remove-watchlist").on("click", function() {

// 	var listIndex = $(this).attr("data-index");

// 	var localWatchlist = localStorage.getItem("user-watchlist");

// 	var parsedWatchlist = JSON.parse(localWatchlist);

// 	userWatchlist = parsedWatchlist

// 	var deletedWatchlistMovie = userWatchlist.splice(listIndex, 1);

// 	localStorage.setItem("user-watchlist, JSON.stringify(userWatchlist));	

// 	renderWatchlistPosters();
// });


// /*4. Clear the Watchlist
// ------------------------*/

// $("#clear-watchlist").on("click", function() {

// 	localStorage.clear();

// 	// Then either:
// 	$(watchlistRenders).empty();

// 	// OR simply refresh the page
// 	location.reload();

// });

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
  })