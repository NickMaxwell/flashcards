/**
 * @fileoverview functions to save card data and log
 */
 
'use strict'; 

function saveData() {
  // clear module window
  document.getElementById('moduleWindow').innerHTML = ''; 
  
  const nowTime = new Date(); 
  systemLog.push(['Save data', nowTime]); 
  
  const codedCards = apostropheToNPPM(); 
  
  // create javascript to load cards data
  const textToWrite = 'let cards = ' + JSON.stringify(codedCards, null, 2) + '; '; 
  
  // save javascript for loading cards data
  saveTextAsFile(textToWrite, 'flashcard_data.js'); 
  
  // save learningSystemLog & empty it
  // System Logs get appended by batch file
  saveTextAsFile(JSON.stringify(systemLog, null, 2), 'flashcards.log'); 
  systemLog = []; 

  // Remove exit prompt to save if not yet saved
  window.removeEventListener('beforeunload', ExitWarningToSave); 
  
}; 

/** @param{event} */
function ExitWarningToSave(e) {
  (e || window.event).returnValue = null; // Gecko + IE
  return null;      // Webkit, Safari, Chrome etc.
}

/** @return {array} cards */
function apostropheToNPPM() {
  let a = cards; 
  for (let i = 0; i < a.length; i++) {
    a[i]['question'] = replaceApostropheAndNewline(a[i]['question']); 
    a[i]['answer'] = replaceApostropheAndNewline(a[i]['answer']); 
    a[i]['resources'] = replaceApostropheAndNewline(a[i]['resources']); 
  }  
  return a; 
}; 


/** @param {string} */
function replaceApostropheAndNewline(s) {
  s = s.replace(/'/g, 'NPPMapostrophe'); 
  return s.replace(/\n/g, ' <br> '); 
}; 

/**
 * @param {string} textToWrite
 * @param {string} fileNameToSaveAs
 */
function saveTextAsFile(textToWrite, fileNameToSaveAs) {
  const textFileAsBlob = new Blob([textToWrite]
                              , {type:'text/plain; charset=utf-8'}); 
  
  let downloadLink = document.createElement('a'); 
  downloadLink.download = fileNameToSaveAs; 

  if (window.webkitURL != null) { // if this is Chrome
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob); 
  } else {
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob); 
    document.getElementById('moduleWindow').appendChild(downloadLink); 
  }
  downloadLink.click(); 
}; 