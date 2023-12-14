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
		sum += parseInt(processLine(line));
	}
	console.log(sum);
});



function processLine(line){
	console.log(line);
	const regex = /[0-9]/g;
	matches = line.match(regex);
	var num = 0;
	if(matches != null){
		num = matches[0].concat(matches[matches.length - 1]);
	}
	console.log(num);
	return num;
}
