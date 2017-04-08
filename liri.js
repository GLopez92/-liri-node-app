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

	var request = 'http://www.omdbapi.com/?t='+ movieName +'&plot=full';

	this.request(request, function (error, response, body) {
		if(error){
		  console.log('error:', error); // Print the error if one occurred 
		}else{
			// console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
			// console.log(body); 
			var requestObject = JSON.parse(body);
			console.log('Movie Title: ', requestObject.Title );
			console.log('Movie imdbRating: ', requestObject.imdbRating);
			console.log('Movie Year: ', requestObject.Year);
			console.log('Movie Country: ', requestObject.Country);
			console.log('Movie Language: ', requestObject.Language);
			console.log('Movie Plot: ', requestObject.Plot);
			console.log('Movie Actors: ', requestObject.Actors);
			console.log('Movie RottenTotmatesRating: ', requestObject.Ratings[1].Source, requestObject.Ratings[1].Value);
			console.log('Movie Url: ', requestObject.Website); 
		}
	});

};



liriAnswer.prototype.spotifyGet = function(input){

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

 	
	var client = new Twitter({
	  consumer_key: key.twitterKeys.consumer_key,
	  consumer_secret: key.twitterKeys.consumer_secret,
	  access_token_key: key.twitterKeys.access_token_key,
	  access_token_secret: key.twitterKeys.access_token_secret
	});

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
		  		
		  		console.log('Tweets# ' + parseInt(i + 1) + ': ' + tweets[i].text)
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
		}
			

	]).then(function (action) {

	switch (action.liri) {
		  case "my-tweets":
		    self.getMyTweets();
		    break;
		  case "spotify-this-song":
		    self.spotifyGet(searchText);
		    break;
		  case "movie-this":
		    self.omdbGet(searchText);
		    break;
		  case "do-what-it-says":
		    self.liriRead();
		    break;
		}
	});
};








var helloLiri = new liriAnswer();


// helloLiri.liriRead();

helloLiri.liriCommands();

// helloLiri.getMyTweets();

// helloLiri.spotifyGet('pink floyd learning to fly');

// helloLiri.omdbGet("fear and loathing");
