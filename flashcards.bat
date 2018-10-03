rem This moves saved data to flashcards system & opens flashcards.html

:appendLogData 
  type d:\flashcards.log >> d:\flashcards\flashcards.log 
  type d:\flashcards(1).log >> d:\flashcards\flashcards.log 
  type d:\flashcards(2).log >> d:\flashcards\flashcards.log 
  type d:\flashcards(3).log >> d:\flashcards\flashcards.log 
  type d:\flashcards(4).log >> d:\flashcards\flashcards.log 
  type d:\flashcards(5).log >> d:\flashcards\flashcards.log 
  type d:\flashcards(6).log >> d:\flashcards\flashcards.log 
  type d:\flashcards(7).log >> d:\flashcards\flashcards.log 
  type d:\flashcards(8).log >> d:\flashcards\flashcards.log 
  type d:\flashcards(9).log >> d:\flashcards\flashcards.log 
  
  del d:\flashcards.log  
  del d:\flashcards(1).log  
  del d:\flashcards(2).log  
  del d:\flashcards(3).log  
  del d:\flashcards(4).log  
  del d:\flashcards(5).log  
  del d:\flashcards(6).log  
  del d:\flashcards(7).log  
  del d:\flashcards(8).log  
  del d:\flashcards(9).log  
  
:replaceCardData 
  move /Y d:\flashcard_data.js d:\flashcards\flashcard_data.js 
  move /Y d:\flashcard_data(1).js d:\flashcards\flashcard_data.js 
  move /Y d:\flashcard_data(2).js d:\flashcards\flashcard_data.js 
  move /Y d:\flashcard_data(3).js d:\flashcards\flashcard_data.js 
  move /Y d:\flashcard_data(4).js d:\flashcards\flashcard_data.js 
  move /Y d:\flashcard_data(5).js d:\flashcards\flashcard_data.js 
  move /Y d:\flashcard_data(6).js d:\flashcards\flashcard_data.js 
  move /Y d:\flashcard_data(7).js d:\flashcards\flashcard_data.js 
  move /Y d:\flashcard_data(8).js d:\flashcards\flashcard_data.js 
  move /Y d:\flashcard_data(9).js d:\flashcards\flashcard_data.js 

:runFlascards
  d:\flashcards\flashcards.html