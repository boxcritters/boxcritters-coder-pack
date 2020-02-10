const path = require("path");

const ROOT = path.join(__dirname,"..");

module.exports = {
	dir: {
		temp: "./temp",
		www: './www'
	},
	urls:{
		bc:"http://bc-mod-api.herokuapp.com/getassets"
	}
}