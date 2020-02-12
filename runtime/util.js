const fs = require('fs-extra');

function mkdir(path) {
	if (!fs.existsSync(path)) {
		fs.mkdirSync(path, { recursive: true });
	}
}

module.exports = {
	mkdir
}