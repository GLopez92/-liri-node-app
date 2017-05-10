var spotify = require('spotify');
var Twitter = require('twitter');
var fs = require('fs');

// var action = process.argv[2];
// var value = process.argv.slice(3);
// // We will then create a switch-case statement (if-then would also work).
// // The switch-case will direct which function gets run.


function liriAnswer(){
	this.fs = require('fs');
	this.twitter = require('twitter');
	this.spotify = require('spotify');
	this.request = require('request');
	this.commands = ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'];

	
};


liriAnswer.prototype.omdbGet = function(movieName){

	// var movieName = "";

	// this could be another place where you could define a default value so that you guarantee the search will return something
	// movieName = movieName || 'The default movie name to search for' <--- that's a very common practice for setting defaults.

	var request = 'http://www.omdbapi.com/?t='+ movieName +'&plot=full';

	this.request(request, function (error, response, body) {
		if(error){
		  console.log('error:', error); // Print the error if one occurred 
		}else{
			// console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
			// nice job just parsing the body once and using that parsed object for the console.logs
			var requestObject = JSON.parse(body);
			console.log('Movie Title: ', requestObject.Title );
			console.log('Movie imdbRating: ', requestObject.imdbRating);
			console.log('Movie Year: ', requestObject.Year);
			console.log('Movie Country: ', requestObject.Country);
			console.log('Movie Language: ', requestObject.Language);
			console.log('Movie Plot: ', requestObject.Plot);
			console.log('Movie Actors: ', requestObject.Actors);
			// by putting the console.log after `requestObject.Ratings[0] &&` you can ensure that there is a truth-y value for `requestObject.Ratings[0]` which ensures that you can attempt to access a property on it like `Value` or `Source` without errors being thrown
			requestObject.Ratings[0] && console.log('Movie RottenTotmatesRating: ', requestObject.Ratings[0].Source, requestObject.Ratings[0].Value);
			console.log('Movie Url: ', requestObject.Website); 
		}
	});

};



liriAnswer.prototype.spotifyGet = function(input){
	// so your're already requiring in the spotify library up in your `liriAnswer` function.
	// I'd suggest just doing it there and then accessing it as `this.spotify`
	var spotify = require('spotify');

	var params = {
		type: 'track',
		query: input,
		limit: 1
	};
 
	spotify.search(params, function(err, data) { 
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }else{

	    	// console.log(data);
	    	var track = data.tracks.items;

			// console.log(data.tracks.items[0]);
			console.log('      Artist: ' + track['0'].artists['0'].name);
			console.log('The song\'s Name: ' + track['0'].name);
			console.log('   Spotify Link: ' + track['0'].preview_url);
			console.log('          Album: ' + track['0'].album.name + '\n');

	    }
	 
	    
	});
};

liriAnswer.prototype.liriRead = function(){

		var fileName = "random.txt";

		fs.readFile(fileName, "utf8", function(err, data){
			if(err){
				console.log(err);
				return
			}
		var newParams = data.split(",");
		console.log(newParams);

		liriAnswer(newParams[0], newParams[1].split(" "));
		
		});
		

};

liriAnswer.prototype.getClient = function(key){

 	// since you've already named your twitter keys the same as what the Twitter client expects
 	// you can simply pass those in instead of redundantly naming them.
	var client = new Twitter(key.twitterKeys)

	return client

}

liriAnswer.prototype.getMyTweets = function(){

	var client = this.getClient(require('./keys.js'));

	var params = {screen_name: 'user'};
 
	var params = {screen_name: 'Guillermo Lopez'};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (error) {
	    console.log("tweets down:" + error);
	  }else{
	  	for(var i = tweets.length - 1; i >= 0; i--){
		  		// parseInt was unnecessary here. Since all you want to do is add the numbers together and display 
		  		// that as a part of the string, you can simply put the addition operation in parentheses so
		  		// it gets run before the string concatenation occurs.
		  		console.log('Tweets# ' + (i + 1) + ': ' + tweets[i].text)
		  			}
	  }

	 console.log("======================")

	});

};

liriAnswer.prototype.liriCommands = function(){

	var inquirer = require('inquirer');
	var self = this;
	var searchText = process.argv[2];

	// console.log("self is >>>>", self);

	inquirer.prompt([
		{
			type: 'list',
			name: 'liri',
			message: 'Hello, Guillermo!',
			choices: this.commands
		},
		// if you were to add another prompt here, then you could also get a movie to search from for the user
		// {
		// 	type: 'input',
		// 	name: 'search',
		// 	message: 'What would you like to search for?'
		// }
			

	]).then(function (action) {

	switch (action.liri) {
		  case "my-tweets":
		    self.getMyTweets();
		    break;
		  case "spotify-this-song":
		    self.spotifyGet(searchText || 'pink floyd learning to fly'); // using the `||` operator allows you to specificy a default value if the value to the left of it is false-y (eg. `false`, `null`, `undefined`, or even an empty string)
		    break;
		  case "movie-this":
		    self.omdbGet(searchText || 'fear and loathing');
		    break;
		  case "do-what-it-says":
		    self.liriRead();
		    break;
		}
	});
};


// Your code is definitely coming along quite a bit and with a few minor tweaks, this would've been working as expected.
// Seems like you got it pretty much all working then might have decided to try and add in the inquirer package. I definitely
// think the inquirer package adds a lot in terms of usability, but since it wasn't quite hooked up it made it slightly more
// difficult to use.

// Another thing - removing commented out console.log statements and method calls will go a long way in cleaning up your code.

// Overall, I'm stoked on the progress you've made so keeo up the great work! 🙌





var helloLiri = new liriAnswer();


// helloLiri.liriRead();

helloLiri.liriCommands();

// helloLiri.getMyTweets();

// helloLiri.spotifyGet('pink floyd learning to fly');

// helloLiri.omdbGet("fear and loathing");
