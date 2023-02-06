
var countryList = {
	netflix: ["ar", "at", "au", "be", "br", "ca", "ch", "cl", "co", "cz", "de", "dk", "ec", "ee", "es", "fi", "fr", "gb", "gr", "hu", "id", "ie", "in", "it", "jp", "kr", "lt", "lv", "mx", "my", "nl", "no", "nz", "pe", "ph", "pl", "pt", "ro", "ru", "se", "sg", "th", "tr", "us", "ve", "za"],
};

var userCountry = "gb";
var userService = "";
var userType = "movie";
var userGenre = "";


// Click Event Listener for the streaming service buttons

$(document).on("click", ".btn", function (event) {

	event.preventDefault();

	userService = ($(this).attr("id")).toLowerCase();
	
	// NOTE THAT "FOUR" DOESN'T WORK. I SUSPECT IT IS "4", BUT THEN WE CANNOT USE THE ID AS A SELECTOR BECAUSE IDs CANNOT CONTAIN JUST NUMBERS.

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

	// It is mandatory to choose a service. Therefore if the user does not choose a service, a message will appear telling the user to pick a service

	if(!userService) {

		$("#feedback").attr("class", "visible feedback").text("Please choose a streaming service");

		setTimeout(function() {

			$("#feedback").attr("class", "hide");

			$("#feedback").empty();

			location.reload();

		}, 750);	
		
	} else {

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

			for (let i = 0; i < parsedResponse.length; i++) {

				var imdbID = parsedResponse.results[i].imdbID
				var getPoster = parsedResponse.results[i].posterURLs.original

				$("#poster-group").append(`
					<div class="col mb-1 p-1">
						<div data-value="${imdbID}" class="card rounded-0 border-0">
							<img src="${getPoster}" class="card-img-top rounded-0" data-toggle="modal" data-target="#movieDatawModal" alt="Movie Poster">
						</div>
					</div>`)

				clicker()
			}
		})
	}	
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

