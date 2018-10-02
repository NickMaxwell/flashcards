
/* Flashcard data is stored in an array, called 'cards' 
	cards is a list of objects 
	Objects' keys: 
	'question'
	'answer'
	'resource' is for any links etc. for relearning 
	'lastCorrectDate' is the last time the question was answered correctly	
	'rightInARow' is how many times there have been 3 right in a row  -- a count of in-a-row of in-a-rows
	'rightToday' is how many times most recently, there have been all correct.
		When rightToday = 3, rightInARow updated and card no longer shown today
		
	Card showing is based on an global array, displayList that has a boolean for each card to indicate whether it should be shown or not
*/


function runFlashcard(){
	// update time display
	showTimeSoFar();

	// Replace working area with card running module
	document.getElementById("moduleWindow").innerHTML = `
	<div id="question" style="max-width:430px;min-height:70px">
	</div>
	
	<div id="answer" style="max-width:430px;min-height:60px;visibility:hidden">
	</div>
		
	<span id="answerButton">
		<input type="button" value="Show Answer" onclick="showAnswer();"/> 
	</span>
	
	<span id="gotitMissedit" style="visibility:hidden">
		<input type="button" value="Got it" onclick="gotIt()"/> 
		<input type="button" value="Missed it" onclick="missedIt()"/> 
		<input type="button" value="Fix card" onclick="fixCard()"/> 
		<input type="button" value="Obvious" onclick="delayCard()"/> 
	</span>
	

	`;
	
	if(displayListEmpty()){ setupDisplayList(); }

	showCard();
	
	// Update time display
	estimateRemainingTime();
} 

function displayListEmpty(){
	return countTrue(displayList) === 0 ;
}

function countTrue(dispList){
	var nTrue = 0;
	for(i=0;i<=dispList.length;i++){
		if(dispList[i]){nTrue++};
	}
	return nTrue;
}

function setupDisplayList(){
	
	// for turning differences of datetimes into days
	var MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
	
	cards = randomizeCards(cards);

	displayList = [];
	for(var i=0; i<cards.length; i++){
		displayList[i] = false;
		if(cards[i]["rightToday"] < 3){
			
			// Calculate a score indicating ho9w much the card needs to be shown now
			var lastCorrectDate = new Date(cards[i]["lastCorrectDate"]);
			var todayDate = new Date();
			var utcLast = Date.UTC(lastCorrectDate.getFullYear(), lastCorrectDate.getMonth(), lastCorrectDate.getDate());
			var utcNow = Date.UTC(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
			var daysSinceLast = Math.floor( (utcNow - utcLast)/MILLISECONDS_PER_DAY );

			var cutoff = Math.ceil(Math.exp(cards[i]["rightInARow"]*0.51));

			var showScore = daysSinceLast - cutoff - cards[i]["rightToday"]/10.0;

			if (showScore > 0){displayList[i] = true}

			}
	}
}

	
function showCard(){

	currentCard = -1;
	for(var i=0; i<displayList.length; i++){
		if(displayList[i]){
			currentCard = i;
			break;
		}
	}

	if (currentCard > -1){
		document.getElementById("question").innerHTML = cards[currentCard]["question"];
		document.getElementById("answer").innerHTML = cards[currentCard]["answer"];
		displayList[currentCard]=false;
		
		nowTime = new Date();
		systemLog.push(["Show Flashcard Question", cards[currentCard]["question"],nowTime]);
	} else {
		document.getElementById("answerButton").style.visibility="hidden";
		document.getElementById("question").innerHTML = "All done!";
		
		nowTime = new Date();
		systemLog.push(["Show All Done Flashcards", nowTime]);

	}
}
	
function showAnswer(){
	cardsGuessed++;
	
	document.getElementById("answerButton").innerHTML = "";
	document.getElementById("answer").style.visibility = "visible";
	document.getElementById("gotitMissedit").style.visibility = "visible";
	document.getElementById("gotitMissedit").style.visibility = "visible";

	nowTime = new Date();
	systemLog.push(["Show Answer", cards[currentCard]["answer"], nowTime]);
}


function gotIt(){
	cards[currentCard]["rightToday"] += 1;
	nowTime = new Date();
	systemLog.push(["Got it", cards[currentCard]["answer"], nowTime]);

	if(cards[currentCard]["rightToday"] > 2){
		cards[currentCard]["rightInARow"] += 1;
		var todayDate = new Date();
		cards[currentCard]["lastCorrectDate"] = todayDate;
		cards[currentCard]["rightToday"] = 0;
	};
	runFlashcard();
}


function missedIt(){
	nowTime = new Date();
	systemLog.push(["Missed it", cards[currentCard]["answer"], nowTime]);

	cards[currentCard]["rightToday"] = 0;
	cards[currentCard]["rightInARow"] = 0; 
	var longAgo = new Date();
	longAgo.setDate(longAgo.getDate() - 999);
	cards[currentCard]["lastCorrectDate"] = longAgo;
	runFlashcard();
}

function fixCard(){
	nowTime = new Date();
	systemLog.push(["Fix card", cards[currentCard]["question"], cards[currentCard]["answer"],nowTime]);

	createFlashcards();
	
	document.getElementById("questionInput").value = cards[currentCard]["question"];
	document.getElementById("answerInput").value = cards[currentCard]["answer"];
	document.getElementById("resourcesInput").value = cards[currentCard]["resources"];

	// remove the to-be-replaced card
	var removedCard = cards.splice(currentCard,1);
	
	//Mode is stored in a global variable, createCardMode
	createCardMode = 'Revise';

}


function delayCard(){
	cards[currentCard]["rightInARow"] *= 4;
	gotIt();
}


function randomizeCards(cards){
	var currentIndex = cards.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }

  return cards;
}
