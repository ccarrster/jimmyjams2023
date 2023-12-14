if(process.argv.length < 3){
	condole.log('You need that command line arg input');
}
var fs = require('fs');
var filename = process.argv[2];
var sum = 0;
var values = {'one':'1', 'two':'2', 'three':'3', 'four':'4', 'five':'5', 'six':'6', 'seven':'7', 'eight':'8', 'nine':'9'};


fs.readFile(filename, 'utf8', function(err, data){
	if(err) throw err;
	var lines = data.split("\n");
	for(key in lines){
		var line = lines[key];
		sum += parseInt(processLine(line));
	}
	console.log(sum);
});



function processLine(line){
	if(line == ''){
		return 0;
	}
	console.log(line);
	var gameParts = line.split(':');
	var gameId = gameParts[0].split(' ');
	var gameNum = gameId[1];
	var games = gameParts[1].split(';');
	for(key in games){
		var game = games[key];
		console.log(game);
		const regexRed = /([0-9]+) red/;
		const regexBlue = /([0-9]+) blue/;
		const regexGreen = /([0-9]+) green/;
		var redMatch = game.match(regexRed);
		var blueMatch = game.match(regexBlue);
		var greenMatch = game.match(regexGreen);
		var redCount;
		var blueCount;
		var greenCount;
		if(redMatch === null){
			redCount = 0;
		} else {
			redCount = redMatch[1];
		}
		if(blueMatch === null){
			blueCount = 0;
		} else {
			blueCount = blueMatch[1];
		}
		if(greenMatch === null){
			greenCount = 0;
		} else {
			greenCount = greenMatch[1];
		}
		var redLimit = 12;
		var greenLimit = 13;
		var blueLimit = 14;

		if(redCount <= redLimit && blueCount <= blueLimit && greenCount <= greenLimit){
			//Good
			console.log('OK');
		} else {
			console.log('over the line');
			gameNum = 0;
		}
	}
	return gameNum;
}


