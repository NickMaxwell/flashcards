/**
 * @fileoverview functions to run flashcards
 */
 

'use strict'; 
// Initial time info 

function prettyPrintTime(timeToShow) {

  let hours = timeToShow.getHours(); 
  let ampm = 'am'
  if (hours > 12) {
    hours -= 12; 
    ampm = 'pm'; 
  } else if (hours === 0) {
    hours = 12; 
  }

  // Left pad with zeroes as needed
  let minToGo = '0' + timeToShow.getMinutes(); 
  minToGo = minToGo.slice(minToGo.length - 2, 3); 
  
  return '<strong>' + hours + ':' + minToGo + ampm + '</strong><p>'; 
}

document.getElementById('startTime').innerHTML = prettyPrintTime(timeStarted); 


function showTimeSoFar() {
  const elapsedTimeLabel = document.getElementById('elapsedTime')
  elapsedTimeLabel.innerHTML =  
      '<strong>' + minutesElapsed() + ' minutes</strong><p>'; 
}

showTimeSoFar(); 

function estimateRemainingTime() {
  // quick and dirty estimate
  const cardsToGo = countTrue(displayList); 
  const minutesSoFar = minutesElapsed(); 
  const minutesToGo = cardsToGo*((0.01 + minutesSoFar)/cardsGuessed); 
  
  const remainingTimeLabel = document.getElementById('estimatedRemainingTime')
  remainingTimeLabel.innerHTML = 
      '<strong>' + Math.round(minutesToGo) + ' minutes</strong><p>'; 
      
  let timeEnd = new Date(); 
  timeEnd.setMinutes( timeEnd.getMinutes() + minutesToGo ); 
  
  const stopTimeLabel = document.getElementById('estimatedStopTime')
  stopTimeLabel.innerHTML = 
      '<strong>' + prettyPrintTime(timeEnd) + '</strong><p>';
}

estimateRemainingTime(); 

