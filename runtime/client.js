const express = require('express');
const path = require("path");
const BCP = require('../config');
const Webserver = require('tn-webserver');
var http = require('http');
var proxy = require('http-proxy');

function StartTPServer() {
	console.log("Running Texture Pack Server");
	var app = express();
	app.use('/', express.static(BCP.CONFIG.dir.www));
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, './index.html'))
	});
	http.get(BCP.CONFIG.urls.versionInfo, function (response) {
		var body = '';
		response.on('data',function(chunk){
			body+=chunk;
		});
		response.on('end',function() {
			var data = JSON.parse(body);
			var version = data.name;
			
		})
	})

	app.use('/socket.io',function (req, res, next) {
		res.redirect("https://boxcritters.herokuapp.com/socket.io" + req.url);
	});
	app.use(function (req, res, next) {
		res.redirect("http://boxcritters.com" + req.url);
	});
	Webserver(app, {}, BCP.CONFIG.ports.tp);
}

console.clear();
StartTPServer();
