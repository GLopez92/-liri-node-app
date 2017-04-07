// var spotify = require('spotify');
// var Twitter = require('twitter');


function liriAnswer(){
	this.fs = require('fs');
	this.twitter = require('twitter');
	this.spotify = require('spotify');
	this.request = require('request');
	this.command = ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'];

};


liriAnswer.portotype.omdbGet = function(movieName){

	var request = 'http://www.omdbapi.com/?t='+ movieName +'&plot=full';
	this.request(request, function (error, response, body) {
	  console.log('error:', error); // Print the error if one occurred 
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
	  console.log('body:', body); // Print the HTML for the Google homepage. 
	});

};



 
spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
    // Do something with 'data' 
});


liriAnswer.portotype.GetClient = function(key){

 
	var client = new Twitter({
	  consumer_key: key.twitterKeys.consumer_key,
	  consumer_secret: key.twitterKeys.consumer_secret,
	  access_token_key: key.twitterKeys.access_token_key,
	  access_token_secret: key.twitterKeys.access_token_secret
	});

	return client

}

liriAnswer.portotype.GetMyTweets = function(){

	var client = this.GetClient(require('./key.js'));

	var params = {screen_name: 'user'};
 
	var params = {screen_name: 'Guillermo Lopez'};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
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

helloLiri.GetTweets();

helloLiri.spotfyGet('Pink Flyod');

helloLiri.omdbGet('Fear and Loathing');
