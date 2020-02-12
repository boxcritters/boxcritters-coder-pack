# BoxCritters Coder Pack

# Prerequisites:
Install Node.js
> https://nodejs.org/en/download/
# Usage
## 1. Getting started 
Set mod name in `config/mods.js` making sure there are no spaces
and then run `setup.bat`.
The Box critters files should download and start life in the `www` folder.

## 2. Development
Then you go to the foldrer for you mod in the `src` folder and start developing
 > Tip: functions like requre also work so feel free to have many files in your mod and use all the npm modules you want
 
 ## 3. Building
 To build your mod run `build.bat`
 and it should start building yourmod into the `build/yourmod/yourmod.js` file ready to be publlished.
 > publising mods comming soon
 and all the mods will be compiled into www/lib/client###.js
 ## 4. Testing
 To test your mod run `client.bat` and a webserver should be setup in the `www` folder 
 Then in a webroewser you must then go to `localhost:3000/play` to try out your mod.

# Contribution
Most code for BCP lives in `runtime` folder.
