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
// var userCountry = {
//     netflix: ["ar","at","au","be","br","ca","ch","cl","co","cz","de","dk","ec","ee","es","fi","fr","gb","gr","hu","id","ie","in","it","jp","kr","lt","lv","mx","my","nl","no","nz","pe","ph","pl","pt","ro","ru","se","sg","th","tr","us","ve","za"],
// };
var userCountry;
var userService;
var userType;
var userGenre;

var countryList = ["us", "gb"];
var serviceList = ["apple", "disney", "hbo", "hulu", "mubi", "netflix", "paramount", "peacock", "prime", "showtime", "starz"];
// Netflix, Amazon Prime Video, Disney+, HBO Max, Hulu, Peacock, Paramount+, Starz, Showtime, Apple TV+, Mubi, Stan, Now, Crave, All 4, BBC iPlayer, BritBox, Hotstar, Zee5 and Curiosity Stream
var typeList = ["movie", "series"];
var genreList = {
	1:"Biography",
	2:"Film Noir",
	3:"Game Show",
	4:"Musical",
	5:"Sport",
	6:"Short",
	7:"Adult",
	12:"Adventure",
	14:"Fantasy",
	16:"Animation",
	18:"Drama",
	27:"Horror",
	28:"Action",
	35:"Comedy",
	36:"History",
	37:"Western",
	53:"Thriller",
	80:"Crime",
	99:"Documentary",
	878:"Science Fiction",
	9648:"Mystery",
	10402:"Music",
	10749:"Romance",
	10751:"Family",
	10752:"War",
	10763:"News",
	10764:"Reality",
	10767:"Talk Show"
}

// To access information for each button, we can use $("..").attr("id") to pull out the user preference just from the id.
// The only time we definitely need the dataset attribute is for the genre, as we cannot store/manipulate numbers directly within ids

var netflixButton = $("#netflix");
var disneyButton = $("#disney");
var primeButton = $("#prime");
var appleButton = $("#apple");
var hboButton = $("#hbo");
var huluButton = $("#hulu");
var mubiButton = $("#mubi");
var paramountButton = $("#paramount");
var showtimeButton = $("#showtime");
var starzButton = $("#starz");

/* 1. Listener for the service buttons - TESTED AND WORKS!!! NEXT STEP IS TO MAKE THEM DO WHAT WE WANT THEM TO.
--------------------------------------*/

$(document).on("click", ".btn", function(event) {
	event.preventDefault();
	userService = $(this).attr("id"); 

	console.log(userService); 

	// Are we likely to have scope issues? In that case, is it possible to extract the user preference data for each of the criteria and put it in a user preference object/array 
});

/* 2. Listener for the toggle switch for Type
-------------------------------------------*/

// $(document).on("change", ".switch", function() {
// 	if(this.checked) {
// 		// Get id, and populte userType variable
// 		userType = $(this).attr("id");
// 	}
// 	console.log(userType);
// 	console.log("my cat");
// } )

$(document).on("change", ".toggle-switch", function() {
	if(this.checked) {
		// Get id, and populte userType variable
		userType = $(this).attr("id");
	} 

	if(!this.checked) {

		return;

	}
	console.log(userType);
	//console.log("my cat");
	//console.log(this.checked);
});

// Sort of works. A good solution might be to make it so that when one toggle switch is enabled, then the other is disabled IF we want to do one at a time. 

const switches = $(".toggle-switch");
for(const s of switches) $(s).on("change", check);

// Function to disable other toggle switches when one is on

function check(e) {
  //count the number of checked switches:
  let n = 0;
  for(const s of switches) {
    if(s.checked) n++;
  }
  // if there is more than one checked (including the one you just clicked), uncheck it:
  if(n > 1) e.target.checked = false;
}



// We need extra functionality for the country

// We need extra functionality for the genre. Then we can put data-genre numbers on the HTML, in accordance with the list, and then extract/access them to populate the URL 



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

// 	// On receiving response, populate page with posters from movies/shows in the search results

// 	for (var i = 0; i < parsedResponse.length; i++) {

// 		$(".poster-group").append(`
// 		<div class="col mb-1 p-1">
// 			<div class="card rounded-0 border-0">
// 				<img src="${parsedResponse.results[i].posterURLs["185"]}" class="card-img-top rounded-0" alt="...">
// 			</div>
// 		</div>`);
// 		//Probably need to allow for the movie title, the brand for the service and the "add to watchlist" button/icon
// 	}
// });

/******************************
ALTERNATIVE POPULATION CODE IDEA EXAMPLE - Create an array of HTML code and join afterwards

var fruits = ['kiwi', 'apple', 'orange', 'banana', 'grapefruit']

let HTML = [];

fruits.forEach(function(fruit) {
    
    var newHTML = `<li class="vit-C">${fruit}</li>`
    HTML.push(newHTML)

})
console.log('pre join', HTML)
HTML= HTML.join('');
console.log('post join', HTML)
listEl.innerHTML = HTML;
*******************************
 */

// When any poster is clicked, it should trigger the modal which will have the trailer, poster, plot and other bits of movie info like age rating, IMDB ratings, cast members, etc




//MOVIE TITLE
//POSTER
//TRAILER
//PLOT
//IMDB NUMBER TO GET THE OMDB STUFF
//GENRE
//

/* STEPS TO ACHIEVING MINIMUM VIABLE PRODUCT 
---------------------------------------------
USER SHOULD BE ABLE TO NARROW DOWN CHOICES OF WHAT TO WATCH BASED ON SUPPLYING THEIR PREFERENCES IN FOUR REGARDS:
- COUNTRY (MANDATORY - WE CAN LIMIT THE CHOICE TO JUST TWO COUNTRIES FOR NOW)
- TYPE (MANDATORY - FILM/MOVIE AND TV/SERIES)
- SERVICE (MANDATORY - CHOOSE TEN OUT OF ELEVEN AVAILABLE)
- GENRE (OPTIONAL - HOWEVER, MOST LIKELY NECESSARY)

If the user does not pick one of the compulsory 3, how do we create an error prompt without using prompts?

1. ASSIGN DATASET ATTRIBUTES TO DIFFERENT COMPONENTS WHICH USERS WILL USE TO REGISTER PREFERENCES

2. STORE USER OPTIONS AND PREFERENCES IN VARIABLES BY ACCESSING DATASET ATTRIBUTES DURING CLICK EVENTS, AND USE THEM TO CONSTRUCT THE QUERY URL

3. MAKE API CALL USING QUERY URL AND PARSE JSON RESPONSE

4. DERIVE REQUISITE DATA FROM THE RESPONSE VIA LOOP, AND USE IT TO POPULATE THE SEARCH RESULT CARDS. THESE CAN BE POPULATED DYNAMICALLY BY USING HTML TEMPLATE WITHIN THE CODE

5. CLICK EVENT LISTENER TO TAKE USER FROM SEARCH RESULT CARD TO MODAL WITH TRAILER, MOVIE INFO, POSTER AND PLOT

6. CLICK EVENT LISTENER TO ENABLE USER TO ADD TO WATCHLIST FROM THE SEARCH RESULTS AND THE MODAL

7. OON WATCHLIST WEBPAGE, CALL DATA IN LOCAL STORAGE AND USE IT TO DYNAMICALLY POPULATE THE PAGE. IF NOTHING IN LOCAL STORAGE, THEN PROVIDE MESSAGE. GIVE PROVISION FOR THE USER TO DELETE
*/










$(".btn").click(function() {
	$('html, body').animate({scrollTop: $("#pleaseSelect").offset().top}, 500);
  });





