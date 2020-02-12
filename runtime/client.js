const express = require('express');
const path = require("path");
const BCP = require('../config');
const Webserver = require('tn-webserver');
const http = require('http');

function StartTPServer() {
	console.log("Running Texture Pack Server");
	var app = express();
	app.use('/', express.static(BCP.CONFIG.dir.www));
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, './index.html'))
	});
	app.use(function (req, res, next) {
		res.redirect("http://boxcritters.com" + req.url);
	});
	Webserver(app, {}, BCP.CONFIG.ports.tp);
}

console.clear();
StartTPServer();
