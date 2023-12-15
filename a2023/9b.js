if(process.argv.length < 3){
	condole.log('You need that command line arg input');
}
var fs = require('fs');
//var math = require('mathjs');
var filename = process.argv[2];




fs.readFile(filename, 'utf8', function(err, data){
	if(err) throw err;
	
	var lines = data.split("\n");
	var lineIndex = 0;
	var sum = 0;

	for(var i = 0; i < lines.length; i++){
		console.log('Processing ' + lines[lineIndex]);
		if(lines[lineIndex] != ''){
			result = processLine(lines[lineIndex]);
			
			for(var j = 0; j < result.length; j++){
				result[j] = parseInt(result[j]);
			}
			var sample = [];
			sample.push(result);
			var workingIndex = 0;
			var workingLevel = [];
			var allZeros = false;
			while(allZeros == false){
				allZeros = true;
				workingLevel = [];
				for(var k = 0; k < sample[workingIndex].length - 1; k++){
					var newValue = sample[workingIndex][k] - sample[workingIndex][k + 1];
					workingLevel.push(newValue * -1);
					if(newValue != 0){
						allZeros = false;
					}
				}
				sample.push(workingLevel);
				workingIndex += 1;
			}
			console.log(sample);
			var workingRowIndex = sample.length - 1;
			var newNumber = 0;
			
			//Fine for sample, but something trixy with negative numbers in the real deal
			while(workingRowIndex >= 1){
				sample[workingRowIndex].unshift(newNumber);
				var aboveRow = sample[workingRowIndex - 1];
				var firstNumber = aboveRow[0];
				newNumber = firstNumber - newNumber;
				aboveRow.unshift(newNumber);
				console.log(aboveRow);
				workingRowIndex -= 1;
			}
			sum += newNumber;
		}
		lineIndex++;
	}
	console.log(sum);


});



function processLine(line){
	var regex = /[0-9-]+/g;
	return line.match(regex);
}

