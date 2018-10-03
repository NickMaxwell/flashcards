/**
 * @fileoverview functions to turn in-JSON apostrophe codes back to apostrophes
 * after importing saved card data
 */
 
'use strict'; 

if (cards === undefined) { 
  // if this is the first time this system has been run
  // creates global: window.cards
  cards = []; 
} else {
  for (let i = 0; i < cards.length; i++) {
  // Undo apostrophe to NPPMapostrophe
    cards[i]['question'] = 
        cards[i]['question'].replace(/NPPMapostrophe/g, `'`); 
    
    cards[i]['answer'] = 
        cards[i]['answer'].replace(/NPPMapostrophe/g, `'`); 
    
    cards[i]['resources'] = 
        cards[i]['resources'].replace(/NPPMapostrophe/g, `'`);
  }  
}
