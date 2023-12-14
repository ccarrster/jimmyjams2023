if(process.argv.length < 3){
	condole.log('You need that command line arg input');
}
var fs = require('fs');
var filename = process.argv[2];




fs.readFile(filename, 'utf8', function(err, data){
	if(err) throw err;
	var sum = 0;
	var lines = data.split("\n");
	var lineIndex = 0;
	var time = null;
	var distance = null;
	var groupIndex = -1;
	var product = 0;
	for(var i = 0; i < lines.length; i++){
		//console.log('Processing ' + lines[lineIndex]);
		if(lines[lineIndex] != ''){
			var matches = processLine(lines[lineIndex]);
			if(time == null){
				time = matches;
			} else {
				distance = matches;
			}
		}
		lineIndex++;
	}
	for(var i = 0; i < time.length; i++){
		//console.log(time[i]);
		//console.log(distance[i]);

		var speed = 0;
		var remainingTime = time[i];
		while(speed * remainingTime <= distance[i]){
			speed += 1;
			remainingTime -= 1;
		}
		var lowTime = speed;

		speed = time[i];
		remainingTime = 0;
		while(speed * remainingTime <= distance[i]){
			speed -= 1;
			remainingTime += 1;
		}
		var highTime = speed;
		var total = speed + 1 - lowTime;
		//console.log('Low Time');
		//console.log(lowTime);
		//console.log('High Time');
		//console.log(highTime);
		//console.log(total);
		if(product == 0){
			product = total;
		} else {
			product = product * total;
		}
	}
	console.log(product);
});



function processLine(line){
	var results = [];
	var regex = /[\d]+/g;
	var matches = line.match(regex);
	for(var i = 0; i < matches.length; i++){
		matches[i] = parseInt(matches[i]);
	}
	return matches;
}

