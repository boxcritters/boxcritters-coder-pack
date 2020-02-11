const BCP = require('../config');

const fs = require('fs-extra')
const http = require('http');
var extract = require('extract-zip');
const path = require("path");


function setupTmp() {
	fs.mkdirSync(BCP.CONFIG.dir.temp, { recursive: true });
}

function downloadBC() {
	let bcZip = BCP.CONFIG.dir.temp + "/bc.zip";
	console.log("Downloading BoxCritters Files...");
	return new Promise((resolve, reject) => {
		http.get(BCP.CONFIG.urls.bcFiles, function (response) {
			var i = 0;
			response.on('data', function (data) {
				fs.appendFileSync(bcZip, data);
				i += data.length;
				process.stdout.write("> " + i + " bytes" + /*isWin ?*/ "\033[0G"/*: "\r"*/);
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
	fs.mkdirSync(BCP.CONFIG.dir.www, { recursive: true });
	fs.copy(bcAssets,wwwDir,function(err) {
		if(err) {

		}
	});
}

function setupSrc() {
	let bcLib = path.join(process.cwd(),BCP.CONFIG.dir.temp, "bc","boxcritters.com","lib");

	console.log("Setting Up Src folder");
	Object.values(BCP.MODS).forEach((dir,i)=>{
		console.log(`> Setting up ${Object.keys(BCP.MODS)[i]}`)
		let loc = path.join(BCP.CONFIG.dir.src,dir);
		fs.mkdirSync(loc, { recursive: true });
	});
	if(BCP.MODS.boxcritters) {
		var bcSrcDir = path.join(BCP.CONFIG.dir.src,BCP.MODS.boxcritters);
		fs.copy(bcLib,bcSrcDir,function(err) {
			if(err) {
	
			}
		});	
		
	}
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
setupTmp();
fs.access(BCP.CONFIG.dir.temp + "/bc.zip", fs.constants.F_OK, (err) => {
	//console.log(`${BCP.CONFIG.dir.temp + "/bc.zip"} ${err ? 'does not exist' : 'exists'}`);
	setupBC(err);
});