
/* This functionality has two modes: 

	'Create') If it was called by clicking on "Create Flashcards", then when each card is saved, it returns to creating flashcards.
	'Revise') If it was called by clicking on "Fix Card" inside the Run-Flashcards functionality, then when the card is saved, the user is returned to run flashcards.
	Mode is stored in a global variable, createCardMode
	
*/



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
*/

function createFlashcards(){
	
// Set prompt to save if not yet saved
	window.addEventListener("beforeunload", ExitWarningToSave);
	
// Record creation starting in log
	var nowTime = new Date();
	systemLog.push(["Start new Card", nowTime]);

	
// Start creating flashcards by changing the module 
	document.getElementById("moduleWindow").innerHTML = `
		<p>Question</p>
		<textarea id='questionInput' rows='4' cols='50'></textarea>
		<p>Answer</p>
		<textarea id='answerInput' rows='4' cols='50'></textarea>
		<p>Resources ('Enter' saves the Q&A pair)</p>
		<textarea id='resourcesInput' rows='4' cols='50' onkeydown='if(event.keyCode == 13){ addCard(); return false;}' ></textarea>
	`   // end multiline string
	
	document.getElementById("questionInput").focus();
};
	
	
function addCard(){
	
	var longAgo = new Date();
	longAgo.setDate(longAgo.getDate() - 999);
	
	var newCard = {
	"question":document.getElementById("questionInput").value
	,"answer":document.getElementById("answerInput").value
	,"resources":document.getElementById("resourcesInput").value
	,"lastCorrectDate":longAgo
	,"rightInARow":0
	,"rightToday":0
	}

	if(isNaN(cards.length)){
		cards =[newCard]
	} else {
		cards.push(newCard);
	};

	// record card created in log
	nowTime = new Date();
	systemLog.push(["New revised card", newCard["question"], newCard["answer"], nowTime]);

	
//clear textareas for next card
//Mode is stored in a global variable, createCardMode

	if(createCardMode === 'Revise'){
		createCardMode = 'Create';
		document.getElementById("runFlashcardsButton").click();		
	} else {
		document.getElementById("createFlashcardsButton").click();
	}
}

