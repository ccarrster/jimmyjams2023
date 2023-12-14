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
	var spreadSeeds = [];
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
	i	}
		//console.log(groupIndex);
		lineIndex++;
	}

	var locationNum = 0;
	while(true){
		workingLocationNum = locationNum;
		//console.log('********* ' + workingLocationNum);
		for(var i = map.length - 1; i >= 0; i--){
			for(var j = 0; j < map[i].length; j++){
				var mapPart = map[i][j];
				if(workingLocationNum >= mapPart[0] && workingLocationNum < mapPart[0] + mapPart[2]){
					
					//console.log('Match');
					//console.log(workingLocationNum);
					//console.log(mapPart);
					workingLocationNum = workingLocationNum + mapPart[1] - mapPart[0]; 
					break;
				}
			}
		}
		for(var k = 0; k < seeds.length; k += 2){
			if(workingLocationNum >= seeds[k] && workingLocationNum < (seeds[k] + seeds[k + 1])){
				console.log(workingLocationNum + ' In Range ' + seeds[k] + ' ' + seeds[k + 1] + ' original: ' + locationNum);
				return;
			}
		}
		locationNum += 1;
	}




	var lowest = null;
	for(var i = 0; i < seeds.length; i += 2){
		for(var j = seeds[i]; j < seeds[i] + seeds[i + 1]; j++){
			var testSeed = j;
			for(var k = 0; k < map.length; k++){
				for(var j = 0; j < map[k].length; j++){
					var mapPart = map[k][j];
					if(testSeed >= mapPart[1] && workingSeeds[i] < mapPart[1] + mapPart[2]){
						//Not so sure of this maths
						var change = 0;
						if(mapPart[0] < mapPart[1]){
							change = mapPart[0] - mapPart[1];
						} else {
							change = mapPart[0] - mapPart[1];
						}
						testSeed = testSeed + change;
						break;
					}
				}
			}
			if(lowest == null){
				lowest = testSeed;
			} else {
				if(testSeed < lowest){
					lowest = testSeed;
				}
			}
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
