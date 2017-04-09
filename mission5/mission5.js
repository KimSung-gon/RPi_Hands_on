var express = require('express')
var request = require('request')
var app = express()
var spawn = require('child_process').spawn
var ls = spawn('python', ['temperature.py'])
var mysql = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
    user     : 'sensor',
	password : '12342323',
    port     : 3306,
	database : 'data'
	})

connection.connect( function(err) {
	if(err) {
		console.error('mysql connection error');
		console.error(err);
		throw err;
	}
});

app.get('/mission5', function (req, res) {

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
			connection.query('INSERT INTO sensors (name) values (?)',data , function(err) {
				if (err)
					throw err;
				
				else
					console.log('temperature :' + data + 'inset success');
			});
	    }, 1000);
    });
}

//connection.end();
