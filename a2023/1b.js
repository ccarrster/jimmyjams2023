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
	console.log(line);
	const regex = /^[0-9]|^one|^two|^three|^four|^five|^six|^seven|^eight|^nine/;
	var stringIndex = 0;
	var matches = [];
	while(stringIndex < line.length){
		var subline = line.substring(stringIndex);
		var aMatch = subline.match(regex);
		if(aMatch !== null){
			matches.push(aMatch[0]);
		}
		stringIndex += 1;
	}
	var num = 0;
	for(matchKey in matches){
		if(isNaN(parseInt(matches[matchKey]))){
			matches[matchKey] = values[matches[matchKey]];
		}
	}
	if(matches.length > 0){
		num = matches[0].concat(matches[matches.length - 1]);
	}
	console.log(num);
	return num;
}


