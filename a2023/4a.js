if(process.argv.length < 3){
	condole.log('You need that command line arg input');
}
var fs = require('fs');
var filename = process.argv[2];
var sum = 0;



fs.readFile(filename, 'utf8', function(err, data){
	if(err) throw err;
	var lines = data.split("\n");
	for(key in lines){
		var line = lines[key];
		console.log(line);
		var result = processLine(line);
		console.log(result);
		sum += result;
	}
	console.log(sum);
});



function processLine(line){
	if(line == ''){
		return 0;
	}
	var winningNumbers = [];
	var drawNumbers = [];
	var lineParts = line.split(':');
	var numberParts = lineParts[1].split('|');
	var numRegex = /[0-9]+/g;
	console.log(numberParts);
	var winningMatch = numberParts[0].match(numRegex);
	var drawMatch = numberParts[1].match(numRegex);
	console.log(winningMatch);
	console.log(drawMatch);
	var matchScore = 0;
	for(key in winningMatch){
		var winningNum = winningMatch[key];
		console.log(winningNum);
		if(drawMatch.includes(winningNum)){
			console.log('Match');
			if(matchScore == 0){
				matchScore = 1;
			} else {
				matchScore = matchScore * 2;
			}
		}
	}
	return matchScore;

	/*

	var numRegex = /[0-9]/;
	var lineIndex = 0;
	symbols[0] = [];
	symbols[1] = [];
	symbols[2] = [];
	numbers[0] = [];
	numbers[1] = [];
	numbers[2] = [];
	for(lineIndex = 0; lineIndex < line.length; lineIndex++){
		var text = line.charAt(lineIndex);
		var matches = text.match(numRegex);
		if(matches !== null){
			symbols[1][lineIndex] = text;
		} else {
			symbols[1][lineIndex] = '';
		}
	}
	if(before != null){
		for(lineIndex = 0; lineIndex < before.length; lineIndex++){
               		var text = before.charAt(lineIndex);
               		var matches = text.match(numRegex);
                	if(matches !== null){
                        	symbols[0][lineIndex] = text;
                	} else {
				symbols[0][lineIndex] = '';
			}
        	}
	}
	if(after != null){
		for(lineIndex = 0; lineIndex < after.length; lineIndex++){
                	var text = after.charAt(lineIndex);
                	var matches = text.match(numRegex);
                	if(matches !== null){
                        	symbols[2][lineIndex] = text;
              		} else {
				symbols[2][lineIndex] = '';
			}
        	}
	}
	for(var i = 0; i < symbols.length; i++){
		var buildNum = '';
		for(var j = 0; j < symbols[i].length; j++){
			var matches = symbols[i][j].match(numRegex);
			if(matches !== null){
				buildNum = buildNum + symbols[i][j];
			} else {
				if(buildNum !== ''){
					for(var k = j - 1; k > j - 1 - buildNum.length; k--){
						numbers[i][k] = buildNum;
					}
				}
				buildNum = '';
			}
		}
		if(buildNum !== ''){
                	for(var k = j - 1; k > j - 1 - buildNum.length; k--){
                        	numbers[i][k] = buildNum;
               		}
        	}
	}

	var numStart = -1;
	var numEnd = -1;
	var num = '';
	for(lineIndex = 0; lineIndex < line.length; lineIndex++){
                var text = line.charAt(lineIndex);
                var matches = text.match(gearRegex);
		var touchingNums = [];
		if(matches !== null){
			var numCount = 0;
			if(lineIndex > 1){
				if(symbols[1][lineIndex - 1] !== ''){
					//That's a number
					//console.log('Num behind');
					numCount += 1;
					touchingNums.push(numbers[1][lineIndex - 1]);
				}
			}
			if(lineIndex + 1 < line.length){
				if(symbols[1][lineIndex + 1] !== ''){
					//That's a number
					//console.log('Num ahead');
					numCount += 1;
					touchingNums.push(numbers[1][lineIndex + 1]);
				}
			}
			if(symbols[0].length > 0){
				if(symbols[0][lineIndex] !== ''){
					//console.log('Num above');
					numCount += 1;
					touchingNums.push(numbers[0][lineIndex]);
				} else {
					if(lineIndex > 1){
						if(symbols[0][lineIndex - 1] !== ''){
							//console.log('Num above and back');
							numCount += 1;
							touchingNums.push(numbers[0][lineIndex - 1]);
						}
					}
					if(lineIndex + 1 < line.length){
						if(symbols[0][lineIndex + 1] !== ''){
							//console.log('Num above and ahead');
							numCount += 1;
							touchingNums.push(numbers[0][lineIndex + 1]);
						}
					}
				}
			}
			if(symbols[2].length > 0){
				if(symbols[2][lineIndex] != ''){
					//console.log('Num below');
					numCount += 1;
					touchingNums.push(numbers[2][lineIndex]);
				} else {
					if(lineIndex > 1){
                                                if(symbols[2][lineIndex - 1] !== ''){
                                                        //console.log('Num below and back');
							numCount += 1;
							touchingNums.push(numbers[2][lineIndex - 1]);
                                                }
                                        }
                                        if(lineIndex + 1 < line.length){
                                                if(symbols[2][lineIndex + 1] !== ''){
                                                        //console.log('Num below and ahead');
							numCount += 1;
							touchingNums.push(numbers[2][lineIndex + 1]);
                                                }
                                        }
				}
			}
			
	
			var ratio = 0;
			if(numCount == 2){			
				console.log(touchingNums);
				console.log(numbers);
				ratio = parseInt(touchingNums[0]) * parseInt(touchingNums[1]);
				validPartSum += ratio;
			}
			
		}
		
	}
	*/
	//console.log(validPartSum);
	//return validPartSum;
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
