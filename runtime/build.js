const BCP = require('../config');
const UTIL = require('./util');

const fs = require('fs-extra')
const path = require("path");
const browserify = require('browserify');

var bcInfo = (function () {
	var bcDir = path.join(BCP.CONFIG.dir.src,'boxcritters');
	var bcInfo = require(path.join(process.cwd(), bcDir, 'modinfo.js'));
	return bcInfo;
})();

var clientLoc = path.join(BCP.CONFIG.dir.www, 'lib', bcInfo.main);
var clientStream = fs.createWriteStream(clientLoc, { flags: 'a' });

fs.writeFile(clientLoc, '', function () { })

BCP.MODS.forEach(mod=>{
	var dir = path.join(BCP.CONFIG.dir.src, mod);
	var buildDir = path.join(BCP.CONFIG.dir.build, mod);

	var info = require(path.join(process.cwd(), dir, 'modinfo.js'));

	console.log(info);
	UTIL.mkdir(buildDir);

	var mainFile = path.join(dir, info.main);
	var buildFile = path.join(buildDir, mod + ".js");
	var buildFileStream = fs.createWriteStream(buildFile);

	console.log(buildFile);
	var s;
	if (info.onefile) {
		s = fs.createReadStream(mainFile);
	} else {
		let b = browserify().add(mainFile)
		s = b.bundle();
	}
	s.pipe(buildFileStream,{end:false});
	s.pipe(clientStream,{end:false});
});