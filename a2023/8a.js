if(process.argv.length < 3){
	condole.log('You need that command line arg input');
}
var fs = require('fs');
var filename = process.argv[2];




fs.readFile(filename, 'utf8', function(err, data){
	if(err) throw err;
	
	var lines = data.split("\n");
	var lineIndex = 0;
	var instructions = '';
	var map = {};
	var instructionIndex = 0;
	var mapLocation = 'AAA';
	var steps = 0;
	for(var i = 0; i < lines.length; i++){
		console.log('Processing ' + lines[lineIndex]);
		if(lines[lineIndex] != ''){
			result = processLine(lines[lineIndex]);
			if(instructions == ''){
				instructions = result;
			} else {
				var obj = {};
				obj.L = result[1];
				obj.R = result[2];
				map[result[0]] = obj;
			}
			console.log(result);
		}
		lineIndex++;
	}

	console.log(map);
	while(mapLocation != 'ZZZ'){
		if(instructionIndex == instructions.length){
			instructionIndex = 0;
		}
		if(instructions[instructionIndex] == 'R'){
			//console.log(map);
			//console.log(mapLocation);

			mapLocation = map[mapLocation]['R'];
		} else {
			mapLocation = map[mapLocation]['L'];
		}
		steps += 1;
		instructionIndex += 1;
	}
	console.log(steps);

});

function processLine(line){
	if(!line.includes(',')){
		return line;
	}
	var regex = /[A-Z]+/g;
	return line.match(regex);
}

