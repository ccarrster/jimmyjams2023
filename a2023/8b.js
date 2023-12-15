if(process.argv.length < 3){
	condole.log('You need that command line arg input');
}
var fs = require('fs');
var math = require('mathjs');
var filename = process.argv[2];




fs.readFile(filename, 'utf8', function(err, data){
	if(err) throw err;
	
	var lines = data.split("\n");
	var lineIndex = 0;
	var instructions = '';
	var map = {};
	var instructionIndex = 0;
	var mapLocations = [];
	var steps = [];
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
				if(result[0][2] == 'A'){
					mapLocations.push(result[0]);
				}
			}
		}
		lineIndex++;
	}


		for(var j = 0; j < mapLocations.length; j++){
			console.log(mapLocations[j]);
			var exitFound = false;
			var localStep = 0;
			instructionIndex = 0;
			while(exitFound == false){
				if(instructionIndex == instructions.length){
					instructionIndex = 0;
				}
				var mapLocation = mapLocations[j];
				if(instructions[instructionIndex] == 'R'){
					mapLocations[j] = map[mapLocation]['R'];
				} else {
					mapLocations[j] = map[mapLocation]['L'];
				}
				localStep += 1;
				if(mapLocations[j][2] == 'Z'){
					console.log('Got one '+mapLocations[j]);
					steps.push(localStep);
					exitFound = true;
					break;
				}
				instructionIndex += 1;
			}
		}
	console.log(steps);
	var lcmResult = math.lcm(...steps);
	console.log(lcmResult);

});

//stolen and cheated

function processLine(line){
	if(!line.includes(',')){
		return line;
	}
	var regex = /[A-Z0-9]+/g;
	return line.match(regex);
}

