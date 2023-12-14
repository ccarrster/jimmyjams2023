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
	var seeds = [];
	var workingSeeds = [];
	var map = [];
	var groupIndex = -1;
	for(var i = 0; i < lines.length; i++){
		//console.log('Processing ' + lines[lineIndex]);
		var matches = processLine(lines[lineIndex]);
		if(seeds.length == 0){
			seeds = matches;
		} else {
			if(matches == 'next'){
				groupIndex += 1;
				map[groupIndex] = [];
			} else if(matches == null){
				//Ignore
			} else {
				map[groupIndex].push(matches);
			}
		}
		//console.log(groupIndex);
		lineIndex++;
	}
	for(var i = 0; i < seeds.length; i++){
		var seed  = seeds[i];
		workingSeeds[i] = seeds[i];
		for(var k = 0; k < map.length; k++){
			console.log(map[k]);
			for(var j = 0; j < map[k].length; j++){
				var mapPart = map[k][j];
				if(workingSeeds[i] >= mapPart[1] && workingSeeds[i] < mapPart[1] + mapPart[2]){
					console.log('seed ' + workingSeeds[i] + ' in range ' + mapPart[1] + ' - ' + (mapPart[1] + mapPart[2]));
					//Not so sure of this maths
					var change = 0;
					if(mapPart[0] < mapPart[1]){
						change = mapPart[0] - mapPart[1];
					} else {
						change = mapPart[0] - mapPart[1];
					}
					console.log('Map Part');
					console.log(mapPart);
					console.log('change '+change);
					var newSeed = workingSeeds[i] + change;
					//console.log(newSeed);
					workingSeeds[i] = newSeed;
					break;
				}
				//console.log(mapPart);
			}
			console.log(workingSeeds);
		}
	}
	//console.log(seeds);
	//console.log(map);

	//console.log(sum)
	var lowest = null;
	for(var l = 0; l < workingSeeds.length; l++){
		if(lowest == null){
			lowest = workingSeeds[l];
		} else if(workingSeeds[l] < lowest){
			lowest = workingSeeds[l];
		}
	}
	console.log(lowest);
});



function processLine(line){
	var results = [];
	if(line.includes('seeds:')){
		var splitSeeds = line.split(': ');
		var seeds = splitSeeds[1].split(' ');
		for(var i = 0; i < seeds.length; i++){
			seeds[i] = parseInt(seeds[i]);
		}
		return seeds;
	} else {
		if(line.includes(':')){
			return 'next';
		} else if(line == ''){
			return null;
		} else {
			var splitLines = line.split(' ');
			for(var i = 0; i < splitLines.length; i++){
        	                splitLines[i] = parseInt(splitLines[i]);
	                }

			return splitLines;
		}
	}
	return ;
}

function isNumValid(num, numStart, numEnd, symbols){
        var symbolIndex = -1;
        for(symbolIndex = numStart - 1; symbolIndex < (numEnd + 2); symbolIndex++){
        	if(symbolIndex < 0 || symbolIndex >= symbols.length){
                	continue;
                }
                if(symbols[symbolIndex] == true){
			return parseInt(num);
                }
	}
	return 0;
}
