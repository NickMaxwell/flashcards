
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



function saveData(){
	// clear module window
	document.getElementById("moduleWindow").innerHTML = "";
	
	nowTime = new Date();
	systemLog.push(["Save data", nowTime]);
	
	var codedCards = apostropheToNPPM();
	
	// create javascript to load cards data
	var textToWrite = "var cards = " + JSON.stringify(codedCards, null, 2) + ";";
	
	// save javascript for loading cards data
	saveTextAsFile(textToWrite,"learningSystemData.js");
	
	// save learningSystemLog & empty it
	// System Logs get appended by batch file
	saveTextAsFile(JSON.stringify(systemLog, null, 2),"learningSystemLog.JSON");
	systemLog = [];

	// Remove prompt to save if not yet saved
	window.removeEventListener("beforeunload", ExitWarningToSave);
	
};


ExitWarningToSave = function(e){
  (e || window.event).returnValue = null;     //Gecko + IE
  return null;                                //Webkit, Safari, Chrome etc.
}


function apostropheToNPPM(){
	var a = cards;
	for (var i = 0; i < a.length; i++){
		a[i]["question"] = replaceApostropheAndNewline(a[i]["question"]);
		a[i]["answer"] = replaceApostropheAndNewline(a[i]["answer"]);
		a[i]["resources"] = replaceApostropheAndNewline(a[i]["resources"]);
	}	
	return a;
};

function replaceApostropheAndNewline(s){
	s = s.replace(/'/g,"NPPMapostrophe");
	return s.replace(/\n/g," <br> ");
};

	
function saveTextAsFile(textToWrite,fileNameToSaveAs){
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain;charset=utf-8'});
	
	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;

	if (window.webkitURL != null) // if this is Chrome
		{downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);}
	else
	{
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		//downloadLink.onclick = destroyClickedElement;
		//downloadLink.style.display = "none";
		document.getElementById("moduleWindow").appendChild(downloadLink);
	}
		downloadLink.click();
		
};