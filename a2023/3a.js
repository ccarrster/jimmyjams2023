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
		var before = null;
		var after = null;
		if(key > 0){
			before = lines[key - 1];
		}
		if(parseInt(key) < lines.length){
			after = lines[parseInt(key) + 1];
			if(after == ''){
				after = null;
			}
		}
		sum += parseInt(processLine(line, before, after));
	}
	console.log(sum);
});



function processLine(line, before, after){
	var validPartSum = 0;
	if(line == ''){
		return 0;
	}
	console.log('*****');
	console.log(before);
	console.log(line);
	console.log(after);
	console.log('*****');
	var symbols = [];
	var symbolRegex = /[0-9.]/;
	var numRegex = /[0-9]/;
	var lineIndex = 0;
	for(lineIndex = 0; lineIndex < line.length; lineIndex++){
		var text = line.charAt(lineIndex);
		var matches = text.match(symbolRegex);
		if(matches == null){
			symbols[lineIndex] = true;
		} else {
			symbols[lineIndex] = false;
		}
	}
	if(before != null){
		for(lineIndex = 0; lineIndex < before.length; lineIndex++){
               		var text = before.charAt(lineIndex);
               		var matches = text.match(symbolRegex);
                	if(matches == null){
                        	symbols[lineIndex] = true;
                	}
        	}
	}
	if(after != null){
		for(lineIndex = 0; lineIndex < after.length; lineIndex++){
                	var text = after.charAt(lineIndex);
                	var matches = text.match(symbolRegex);
                	if(matches == null){
                        	symbols[lineIndex] = true;
              		}    	         
        	}
	}
	var numStart = -1;
	var numEnd = -1;
	var num = '';
	for(lineIndex = 0; lineIndex < line.length; lineIndex++){
                var text = line.charAt(lineIndex);
                var matches = text.match(numRegex);
                if(matches != null){
			if(numStart == -1){
				numStart = lineIndex;
			}
			numEnd = lineIndex;
                     	num = num + text;   
                } else {
			if(num !== ''){
				validPartSum += isNumValid(num, numStart, numEnd, symbols);
			}
			numStart = -1;
			numEnd = -1;
			num = '';
		}
        }
	if(num !== ''){
	        validPartSum += isNumValid(num, numStart, numEnd, symbols);
        }

	return validPartSum;
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
