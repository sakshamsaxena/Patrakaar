#!/usr/bin/env node
// Modules to be used
var request = require('request');
var cheerio = require('cheerio');

// Get the concurrency and URL
var concurrency, url;
process.argv.forEach(function(val, index) {
	if(val == '-c' && process.argv[index+1]) {
		concurrency = process.argv[index+1];
	}

	if(val == '-u' && process.argv[index+1]) {
		url = process.argv[index+1];
	}
});

// Perform Checks on them
if(url) {
	console.log(`URL is ${url}`);
} else {
	console.log(`No URL entered. Exiting now.`);
	process.exit(1);
}

if(concurrency) {
	if(!isNaN(parseInt(concurrency))) {
		console.log(`Concurrency is ${concurrency}`);
	} else {
		console.log(`Wrong concurrency entered. Exiting now.`);
		process.exit(1);
	}
} else {
	console.log(`No concurrency entered. Exiting now.`);
	process.exit(1);
}

// Get initial list of URLs
var L = [];
var C = concurrency;
var U = url;
var trueCount = 0, next = C;
var map = {};
var $;
var successfulR = 0, failedR = 0;

console.log('Getting Initial List of URLs ...');
request(U, function(error, response, body) {
	if(error) {
		console.log(error);
		process.exit(1);
	}
	if(response.statusCode == 200) {
		// Got the HTML
		$ = cheerio.load(body);
		// Extract Unique Links only
		$("body a").each(function() {
			var key = $(this).attr("href");
			if(map[key] === undefined) {
				map[key] = 1;
			}
		});
		// Set our list up
		L = Object.keys(map);
		trueCount = L.length;
		console.log(trueCount);
		// Clear the map, save memory!
		map = {};
		console.log('Got it!');
		// Begin Crawling
		// TODO
		process.nextTick(function() {
			for (let i = 0; i < C; i++) {
				let link = L[i];
				console.log(`${i} : Launching init ${C} requests.`);
				launchRequest(link, i);
			}
		})
	} else {
		console.log(`Error : ${response.statusCode} received. Exiting now.`);
		process.exit(1);
	}
});

function launchRequest(u, ind) {
	console.log(`${ind} : Starting request`);
	request(u, function(err, resp, body) {
		if(!err && resp.statusCode == 200) {
			// TODO : Do what you want with this response
			console.log(`${ind} : Request Done. Doing something with body`);
			successfulR++;
		} else {
			console.log(`${ind} Request failed`);
			failedR++;
		}
		// Make next call
		if(next < trueCount) {
			let uri = L[next++];
			console.log(`${next} : Launching request.`);
			launchRequest(uri, next);
		} 
		if(next == trueCount && successfulR+failedR == trueCount) {
			console.log('All done!');
			console.log(`${successfulR} were successful and ${failedR} failed.`);
		}
	})
}