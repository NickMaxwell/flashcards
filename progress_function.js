/**
 * @fileoverview Function for displaying progress and time remaining
 */
 

'use strict'; 
    
/** @return {number} */
// for displaying time in flashcards
function minutesElapsed() {  
  // Minutes elapsed since starting to work on the flashcards.  
  // This function needs to exist before import the rest of the modules.
  const timeNow = new Date(); 
  const hoursSoFar = timeNow.getHours() - timeStarted.getHours(); 
  return timeNow.getMinutes() - timeStarted.getMinutes() + hoursSoFar*60; 
}

