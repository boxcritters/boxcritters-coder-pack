const BCP = require('../config');
const UTIL = require('./util');

const fs = require('fs-extra')
const http = require('http');
const extract = require('extract-zip');
const path = require("path");


function setupFolders() {
	UTIL.mkdir(BCP.CONFIG.dir.temp);
	UTIL.mkdir(BCP.CONFIG.dir.www);
}

function createModInfo({name,version,main,onefile},force) {
	var dir = path.join(BCP.CONFIG.dir.src,name);
	UTIL.mkdir(dir);
	let modinfo = new Uint8Array(Buffer.from(
`module.exports = {
	name:"${name}",
	version:"${version}",
	main:"${main}",${onefile?"\n	onefile:true":''}
}`
		));
	if(!force && fs.existsSync(path.join(dir,'modinfo.js')))return;
	fs.writeFile(path.join(dir,'modinfo.js'),modinfo, (err) => {if (err) throw err;});

}

function printBytes(b) {
	if(b>1024*1024*1024*1024){
		return Math.round(100*b/(1024*1024*1024*1024))/100 + " TB      ";
	}
	if(b>1024*1024*1024){
		return Math.round(100*b/(1024*1024*1024))/100 + " GB      ";
	}
	if(b>1024*1024){
		return Math.round(100*b/(1024*1024))/100 + " MB      ";
	}
	if(b>1024){
		return Math.round(100*b/1024)/100 + " KB      ";
	}
	return b + " bytes";
}
//wait is the mod api server  down
function downloadBC() {
	let bcZip = BCP.CONFIG.dir.temp + "/bc.zip";
	console.log("Downloading BoxCritters Files...");
	return new Promise((resolve, reject) => {
		http.get(BCP.CONFIG.urls.bcFiles, function (response) {
			var i = 0;
			response.on('data', function (data) {
				fs.appendFileSync(bcZip, data);
				i += data.length;
				process.stdout.write("> " + printBytes(i) + /*isWin ?*/ "\033[0G"/*: "\r"*/);
			});
			response.on('end', function () {
				resolve();
			})
		});
	});
}

function extractBC(cb) {
	let bcZip = "./" + BCP.CONFIG.dir.temp + "/bc.zip";
	let bcDir = path.join(process.cwd(),BCP.CONFIG.dir.temp, "/bc/");
	console.log("Extracting BoxCritters Files...")
	extract(bcZip, { dir: bcDir }, function (err) {
		if (err) {
			console.error(err)
			process.exit();
		}
		if(cb) cb();
	})

}

function setupWWW() {	
	let bcAssets = path.join(process.cwd(),BCP.CONFIG.dir.temp, "bc","boxcritters.com");
	let wwwDir = path.join(process.cwd(),BCP.CONFIG.dir.www);

	console.log("Setting Up WWW folder");
	fs.copy(bcAssets,wwwDir,function(err) {
		if(err) {

		}
	});
}

function setupSrc() {
	let bcLib = path.join(process.cwd(),BCP.CONFIG.dir.temp, "bc","boxcritters.com","lib");

	console.log("Setting Up Src folder");
	BCP.MODS.forEach(mod=>{
		console.log(`> Setting up ${mod}`)
		let loc = path.join(BCP.CONFIG.dir.src,mod);
		createModInfo({
			name:mod,
			version:"0.1",
			main:"main.js"
		});
	});
	var bcSrcDir = path.join(BCP.CONFIG.dir.src,'boxcritters');
	fs.copy(bcLib,bcSrcDir,function(err) {
		if(err) {

		}
	});	

	http.get(BCP.CONFIG.urls.versionInfo, function (response) {
		var body = '';
		response.on('data',function(chunk){
			body+=chunk;
		});
		response.on('end',function() {
			var data = JSON.parse(body);
			var version = data.name;
			createModInfo({
				name:"boxcritters",
				version:version,
				main:`client${version}.min.js`,
				onefile:true
			},true)
		})
	})
}


async function setupBC(zipNotExist) {
	if (zipNotExist) {
		await downloadBC();
	}
	extractBC(()=>{
		setupWWW();
		setupSrc();
	});
}

console.clear();
setupFolders();
fs.access(BCP.CONFIG.dir.temp + "/bc.zip", fs.constants.F_OK, (err) => {
	//console.log(`${BCP.CONFIG.dir.temp + "/bc.zip"} ${err ? 'does not exist' : 'exists'}`);
	setupBC(err);
});