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
    netflix: ["ar","at","au","be","br","ca","ch","cl","co","cz","de","dk","ec","ee","es","fi","fr","gb","gr","hu","id","ie","in","it","jp","kr","lt","lv","mx","my","nl","no","nz","pe","ph","pl","pt","ro","ru","se","sg","th","tr","us","ve","za"],
};
var userService;
var userType;
var userGenre = [];

const settings = {
	"async": true,
	"crossDomain": true,
	"url": `https://streaming-availability.p.rapidapi.com/search/basic?country=${userCountry}&service=${userService}&type=${userType}&genre=${userGenre}&page=1&output_language=en&language=en`,
	
    "method": "GET",
	"headers": {
		"X-RapidAPI-Key": apiKey.Charles,
		"X-RapidAPI-Host": "streaming-availability.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	//console.log(response);
	console.log(JSON.parse(response));

	var parsedResponse = JSON.parse(response);
	console.log(parsedResponse.results[0].age);

	//console.log(JSON.stringify(parsedResponse));​
});
//MOVIE TITLE
//POSTER
//TRAILER
//PLOT
//IMDB NUMBER TO GET THE OMDB STUFF
//GENRE
//














