# BoxCritters Coder Pack

# Prerequisites:
Install Node.js
> https://nodejs.org/en/download/
# Usage
## Setup
Set mod name in `config/mods.js` and run `setup.bat`.
## Development
Put mod code in `src` 
create a `modinfo.js` file in your mod folder
```javascript
module.exports = {
	name:"Mod Name",
	version:"0.1",
	main:"main.js"
}
```
To test, run `client.bat` and go to localhost:3000/play
## Build
To build mod for distribution and **testing**, run `build.bat`.

# Contribution
Most code for BCP lives in `runtime` folder.
