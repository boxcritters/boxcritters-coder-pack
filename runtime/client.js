const express = require('express');
const path = require("path");
const BCP = require('../config');
const Webserver = require('tn-webserver');
var electron      = require('electron');

var app = express();
app.use('/',express.static(BCP.CONFIG.dir.www));
app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname,'./index.html'))
});
app.use(function(req, res, next){
	res.redirect("http://boxcritters.com"+ req.url);
});
Webserver(app,{},8080);


var BrowserWindow = electron.BrowserWindow;
mainWindow = new BrowserWindow({
    "width": 970,
    "height": 500,
    "center": true,
    'title': 'Main window',
});
mainWindow.webContents.session.setProxy({proxyRules:"socks5://114.215.193.156:1080"}, function () {
    mainWindow.loadURL('https://whatismyipaddress.com/');
});