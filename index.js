console.log("bot is starting");
//importing twitter api
var Twit = require('twit');
//importing necessary stuff
var config = require('./config');
var reader = require('./reader.js');
//creating variable
var T = new Twit(config);
//tweeting it the first time, otherwise it would take 20 secs for the first tweet
tweetIt();
//tweeting every 20 secs
setInterval(tweetIt, 1000*20)

function tweetIt() {
	//generating new lineup everytime
	var content = reader();
	var r = Math.floor(Math.random() * 100);

	var tweet = {
		status: content
	}
	//posting tweet
	T.post('statuses/update', tweet, tweeted);

	function tweeted(err, data, response) {
		if(err) {
			console.log(err);
		}
		else {
			console.log("It worked!");
		}
	}
}