// Tidy cards data on loading webpage

if (cards === undefined){ // if this is the first time this system has been run,
	var cards = [];
} else {
	for (var i = 0; i < cards.length; i++){
	// Undo apostrophe to NPPMapostrophe
		cards[i]["question"] = cards[i]["question"].replace(/NPPMapostrophe/g,"'");
		cards[i]["answer"] = cards[i]["answer"].replace(/NPPMapostrophe/g,"'");
		cards[i]["resources"] = cards[i]["resources"].replace(/NPPMapostrophe/g,"'");
	}	
}
