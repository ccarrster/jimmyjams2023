if(process.argv.length < 3){
	condole.log('You need that command line arg input');
}
var fs = require('fs');
var filename = process.argv[2];


var scoreMap = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];

fs.readFile(filename, 'utf8', function(err, data){
	if(err) throw err;
	
	var lines = data.split("\n");
	var lineIndex = 0;
	var hands = [];
	var bids = [];
	var types = [];
	var rankedHands = [];
	for(var i = 0; i < lines.length; i++){
		console.log('Processing ' + lines[lineIndex]);
		if(lines[lineIndex] != ''){
			var hand = processLine(lines[lineIndex]);
			hands.push(hand[0]);
			bids.push(hand[1]);
		}
		lineIndex++;
	}

	for(var i = 0; i < hands.length; i++){
		var matches = [];
		for(var k = 0; k < 13; k++){
			matches.push(0);
		}
		for(var j = 0; j < hands[i].length; j++){			
			matches[scoreMap.indexOf(hands[i].charAt(j))] += 1;
		}
		var fiveOfAKind = false;
		var fourOfAKind = false;
		var fullHouse = false;
		var threeOfAKind = false;
		var twoPair = false;
		var onePair = false;
		var pairs = 0;
		var countJ = matches[12];
		console.log('Count J');
		console.log(countJ);
		console.log(matches);
		console.log(hands[i]);

		//Ok Js give you a hand, but we are not going to count them by themselves. Also we can only use them once.
		var highestIndex = 0;
		var highestCount = 0;
		for(var l = 0; l < matches.length - 1; l++){
			if(matches[l] > highestCount){
				highestCount = matches[l];
				highestIndex = l;
			}
		}
		console.log('Matches before j');
		console.log(matches);
		matches[highestIndex] += countJ;
		console.log('Matches after j');
		console.log(matches);

		for(var l = 0; l < matches.length - 1; l++){
			if(matches[l]  == 5){
				fiveOfAKind = true;
			}
			if(matches[l] == 4){
				fourOfAKind = true;
			}
			if(matches[l] == 3){
				threeOfAKind = true;
			}
			if(matches[l] == 2){
				onePair = true;
				pairs += 1;
			}
		}

		if(threeOfAKind && onePair){
			fullHouse = true;
		}
		if(pairs == 2){
			twoPair = true;
		}
		//Set type
		//Default high card
		if(fiveOfAKind){
			types[i] = 6;
		} else if(fourOfAKind){
			types[i] = 5;
		} else if(fullHouse){
			types[i] = 4;
		} else if(threeOfAKind){
			types[i] = 3;
		} else if(twoPair){
			types[i] = 2;
		} else	if(onePair){
			types[i] = 1
		} else {
			types[i] = 0;
		}
		console.log('Type');
		console.log(types[i]);
		//console.log(matches);
	}
	//console.log(types);
	for(var i = 0; i < hands.length; i++){
		var handObj = {};
		handObj.hand = hands[i];
		handObj.bid = bids[i];
		handObj.type = types[i];
		rankedHands.push(handObj);
	}
	//console.log(rankedHands);
	rankedHands.sort(handSort);
	console.log(rankedHands);
	var score = 0;
	var scoreMultiplier = 1;
	for(var i = 0; i < rankedHands.length; i++){
		score += parseInt(rankedHands[i].bid) * scoreMultiplier;
		scoreMultiplier += 1;
		console.log(rankedHands[i].hand);
		console.log(rankedHands[i].type);
		console.log(rankedHands[i].bid);
		console.log(scoreMultiplier);
		console.log(score);
	}
	console.log('Final Score:');
	console.log(score);
});

function handSort(a, b){
	if(a.type > b.type){
		return 1;
	} else if(b.type > a.type){
		return -1;
	} else {
		for(var j = 0; j < a.hand.length; j++){
			//console.log('mash: ' + a.hand[j] + ' ' + b.hand[j]);
			if(scoreMap.indexOf(a.hand[j]) < scoreMap.indexOf(b.hand[j])){
				//console.log('Choose A');
				return 1;
			} else if(scoreMap.indexOf(b.hand[j]) < scoreMap.indexOf(a.hand[j])){
				//console.log('Choose B');
				return -1;
			} else {
				//console.log('Next Char');
			}
		}
	}
	//Same hands
	return 0;
}

function processLine(line){
	var results = [''];
	return line.split(' ');
}

