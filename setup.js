/**
 * @fileoverview Declare global variables
 */
 
'use strict'; 
 
// systemLog is a global array that holds data on what happens and when
let systemLog = []; 
 
let timeStarted = new Date(); 
systemLog.push(['Open flashcards', timeStarted]); 
   
// for estimating average time per card 
let cardsGuessed = 0; 
  
// Global array that will be used to display cards
let displayList = [false]; 

// createCardMode records mode of card creation step
// 'Create' = user clicked on "Create Cards".  
// 'Revise' = user clicked on "Fix Card" while running flashcards
let createCardMode = 'Create'; 
 
// Which card is durrently being displayed
let currentCard = -1; 
   
