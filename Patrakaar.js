// Modules to be used
var request = require('request');
var $ = require('cheerio');

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

if(url) {
	console.log(`URL entered is ${url}`);
} else {
	console.log(`No URL entered`);
	process.exit(1);
}

if(concurrency) {
	console.log(`Concurrency entered is ${concurrency}`);
} else {
	console.log(`No concurrency entered`);
	process.exit(1);
}