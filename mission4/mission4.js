var express = require('express')
var fs = require('fs')
var request = require('request')
var app = express()
var time = require('date-utils')
var spawn = require('child_process').spawn
var ls = spawn('python', ['temperature.py'])

app.get('/mission4', function (req, res) {

	setTimeout(function() {
		sendNWrite(res);}, 3000); 
})

app.listen(3000, function() {
	console.log("Temperature system start");
});

function sendNWrite(res) {
	ls.stdout.on('data', function(data) {
		res.end(data);
		setTimeout( function () {
			fs.appendFile("text.txt", new Date() + '\t' + data, function(err) {
				if(err) console.log("file write error");
			});
		}, 1000);	
	});
}
