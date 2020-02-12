const path = require("path");

const ROOT = path.join(__dirname,"..");

module.exports = {
	dir: {
		temp: "./temp",
		www: './www',
		src: './src',
		build: './build'
	},
	urls: {
		bcFiles:"http://bc-mod-api.herokuapp.com/getassets",
		versionInfo:"http://bc-mod-api.herokuapp.com/versions/latest"
	},
	ports: {
		tp: 3000
	}
}