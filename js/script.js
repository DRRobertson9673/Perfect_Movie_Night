/* const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://streaming-availability.p.rapidapi.com/search/basic?country=&service=netflix&type=movie&genre=18&page=1&output_language=en&language=en",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "575a51e5c6msh160c5b4a8828611p1d6b16jsnadf9f71d5186",
		"X-RapidAPI-Host": "streaming-availability.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
}); */
var userCountry = {
	netflix: ["ar", "at", "au", "be", "br", "ca", "ch", "cl", "co", "cz", "de", "dk", "ec", "ee", "es", "fi", "fr", "gb", "gr", "hu", "id", "ie", "in", "it", "jp", "kr", "lt", "lv", "mx", "my", "nl", "no", "nz", "pe", "ph", "pl", "pt", "ro", "ru", "se", "sg", "th", "tr", "us", "ve", "za"],
};

var userCountry = "gb";
var userService = "";
var userType = "movie";
var userGenre = "";

// const settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": `https://streaming-availability.p.rapidapi.com/search/basic?country=${userCountry}&service=${userService}&type=${userType}&genre=${userGenre}&page=1&output_language=en&language=en`,

//     "method": "GET",
// 	"headers": {
// 		"X-RapidAPI-Key": apiKey.Charles,
// 		"X-RapidAPI-Host": "streaming-availability.p.rapidapi.com"
// 	}
// };

// $.ajax(settings).done(function (response) {
// 	//console.log(response);
// 	console.log(JSON.parse(response));

// 	var parsedResponse = JSON.parse(response);
// 	console.log(parsedResponse.results[0].age);

// 	//console.log(JSON.stringify(parsedResponse));​
// });
//MOVIE TITLE
//POSTER
//TRAILER
//PLOT
//IMDB NUMBER TO GET THE OMDB STUFF
//GENRE
//

/* 1. Listener for the service buttons - TESTED AND WORKS!!! NEXT STEP IS TO MAKE THEM DO WHAT WE WANT THEM TO.
--------------------------------------*/

$(document).on("click", ".btn", function (event) {
	event.preventDefault();
	userService = ($(this).attr("id")).toLowerCase();

	// console.log(userService);

	//  /* 2. Listener for type
	// ------------------------ */

	// $("#TVSwitch").on("change", function() {

	// 	if(this.checked) {
	// 		// Get id, and populte userType variable
	// 		userType = "series";
	// 	} 

	// 	if(!this.checked) {

	// 		userType = "movie";

	// 	}
	// 	console.log(userType);
	// });

	// /* 3. Listener for Genre
	// -------------------------*/

	// $(document).on("click", ".genre-class", function() {

	// 	userGenre = $(this).attr("data-genre");

	// 	console.log(userGenre);

	// })

	//console.log(userCountry, userGenre, userService, userType);

	// const settings = {
	// "async": true,
	// "crossDomain": true,
	// "url": `https://streaming-availability.p.rapidapi.com/search/basic?country=${userCountry}&service=${userService}&type=${userType}&genre=${userGenre}&page=1&output_language=en&language=en`,

	// "method": "GET",
	// "headers": {
	// 	"X-RapidAPI-Key": "85cea767d7msh61dfa0edc659024p1cafe1jsnc76b9a205a8d",//apiKey.Charles,
	// 	"X-RapidAPI-Host": "streaming-availability.p.rapidapi.com"
	// 	}
	// };

	// $.ajax(settings).done(function (response) {
	// //console.log(response);
	// console.log(JSON.parse(response));

	// //var parsedResponse = JSON.parse(response);

	// //console.log(JSON.stringify(parsedResponse));​
	// });

});

// This is the code t

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
		for (let i = 0; i < 8; i++) {

			var imdbID = parsedResponse.results[i].imdbID
			var getPoster = parsedResponse.results[i].posterURLs.original

			$("#poster-group").append(`
				<div class="col mb-1 p-1">
					<div data-value="` + imdbID + `" class="card rounded-0 border-0">
						<img src="` + getPoster + `" class="card-img-top rounded-0" data-toggle="modal" data-target="#movieDatawModal" alt="Movie Poster">
					</div>
				</div>`)

			clicker()
		}
	})
})



// Create and append different modals which will be populated with information relating to each element within the response.results array. This should precede the posters, as they will contain data-target values that relate to the modals

// Modal HTML content

/*$("#modal-group").append(`
<div id="movieDatawModal${i}" class="modal" tabindex="-1">
<div class="modal-dialog modal-lg">
  <div class="modal-content">
	<div class="modal-header border-0">
	  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		<span aria-hidden="true">&times;</span>
	  </button>
	</div>
	<div class="modal-body">
		<img src="https://image.tmdb.org/t/p/w185/9TbjIF1p5a3EJXUFzX63Coa2JRM.jpg" class="movieDataPoster" alt="...">
		description
	</div>
  </div>
</div>
</div>`)*/

// Search result poster HTML content


// 	<div class="col mb-1 p-1">
//         <div class="card rounded-0 border-0">
//             <img src="https://image.tmdb.org/t/p/w185/9TbjIF1p5a3EJXUFzX63Coa2JRM.jpg" class="card-img-top rounded-0" data-toggle="modal" data-target="#movieDatawModal${i}" alt="...">
//         </div>
//     </div>`); // This is for test purposes only. Conditional will eventually be i < response.results.length, and image source will be response.results[i].posterURLs[185], after the response has been parsed



// })

// EUREKA! It all seems to work. I have coded it within the loop so that, as each poster is created, its own specific modal will also be created and appended. That makes it easier for us to dynamically populate each modal directly from the search response data.

// Next step is incorporating the information from the response in line with making API calls, designing and properly populating the modal, and then the watchlist/local storage aspect.










// code to make page scroll up when platform button is clicked
$(".platformBtn").click(function () {
	$('html, body').animate({ scrollTop: $("#pleaseSelect").offset().top }, 500);
});

// code to switch colour of user choice series or movie and set the variable when the clicker is toggled
$('#TVSwitch').change(
	function () {
		if ($(this).is(':checked')) {
			userType = "series";
			$("#seriesLabel").addClass("mediaSelectorSelected").removeClass("mediaSelector");
			$("#moviesLabel").addClass("mediaSelector").removeClass("mediaSelectorSelected");
		} else {
			userType = "movie";
			$("#seriesLabel").addClass("mediaSelector").removeClass("mediaSelectorSelected");
			$("#moviesLabel").addClass("mediaSelectorSelected").removeClass("mediaSelector");

		}
	});

// code to set the variable when an option is selected from the drop down genre menu
$("#genreSelect").change(function () {
	userGenre = $(this).children("option:selected").val();
});

// code to make an api call to OMDB using imdbID to get movie/show details

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
