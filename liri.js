// var spotify = require('spotify');
var Twitter = require('twitter');


function liriAnswer(){
	this.fs = require('fs');
	this.twitter = require('twitter');
	this.spotify = require('spotify');
	this.request = require('request');
	this.commands = ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'];

};


liriAnswer.prototype.omdbGet = function(movieName){


	var request = 'http://www.omdbapi.com/?t='+ movieName +'&plot=full';

	this.request(request, function (error, response, body) {
		if(error){
		  console.log('error:', error); // Print the error if one occurred 
		}else{
		  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
		  var requestObject = JSON.parse(body);
		  console.log('body:', requestObject.Title, "," , requestObject.Rated); // Print the HTML for the Google homepage. 
		}
	});

};


liriAnswer.prototype.spotifyGet = function(){
 
	spotify.search({ type: 'track', query: 'Fearless' }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }else{
	    	console.log('data:' data);

	    }
	 
	    
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
	  	tweets.forEach(function(tweet,index){
	  		console.log('Tweets# ' + parseInt(index + 1) + ': ' + tweet.text)
	  	});
	  }

	 console.log("==================")

	});

};





var helloLiri = new liriAnswer();

helloLiri.getMyTweets();

helloLiri.spotifyGet('Pink Flyod');

helloLiri.omdbGet();
