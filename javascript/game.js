


/* -----------------------------Global variables --- ---------------------------------------- */

/* can be altered and added to as required here */


var lettersArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

var qwertyLetters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 
		'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 
		'c', 'v', 'b', 'n', 'm'];

var monstersArray = [	// Array of arrays (2D array) to hold monster data for use in program INdex: (0)name, (1)hint, (2)web reference, (3)picture

	  	['demogorgon', 'the faceless Prince of Demons', 'https://en.wikipedia.org/wiki/Demogorgon', 'demogorgon.jpg',],
	  	['pollywog', 'a monstrous tadpole', 'https://www.popsugar.com/entertainment/What-Pollywog-44191387', 'polliwog.jpg',],
	  	['hydra', 'a many headed serpent', 'https://en.wikipedia.org/wiki/Hydra', 'hydra.jpg',],
	  	['cyclops','a one eyed monster who lives in a cave', 'https://en.wikipedia.org/wiki/Cyclops', 'cyclops.jpg'],
	  	['zombie', 'a reanimated - usually very pale - human corpse!','https://en.wikipedia.org/wiki/Zombie', 'zombie.jpg'],
  					];

var instructions = '<p>We all love Stranger Things! <br /><br />' +				// Initial instrcutions 
  		'BUT do you know your MONSTERS!! <br /><br />' +
  		'Pit yourself against our Stranger Things Hang-Monster game <br />' +
  		'and win the right to add your own favourite monster to the game!</p>';


/* ----------------------------- Objects ---------------------------------------------------- */


/* Initialise game Object */

var game = new Object();



/* Properties */

game.guesses = [];	 													// Array to hold correct letterrs guessed
game.letUsed = [];   													// Array to hold letters used (i.e. unique keys entered)
game.keyPressed = "";													// Holds the current keypress
game.kbd = "";															// Keyboard input acive/not active

game.word = "";															// Holds monstername to be guessed
game.wordGuessed = "";													// Holds string of current state of users guess
game.randNum = 0;														// Random number generated and used as indexer for monsterArray
game.numLives = 12;  													// Tally of number of uiques keys pressed (users lives)

game.getLives = document.getElementById("lives");						// Holds id of element where users lives displayed
game.getLetUsed = document.getElementById("letused");					// Holds id of element where used letters are displayed
game.getHint = document.getElementById("hint"); 	    				// Holds id of element where hint displayed
game.getWarnMsg = game.getHint;											// Warnings also displayed in hints element
game.getGuessWd = document.getElementById("statusword"); 				// Holds id of element where correct guesses displayed

game.getInstructBox = document.getElementById('hangboxtext'); 			// Holds id of element of instructions box
game.getHeaderText = document.getElementById('headertext'); 			// Holds id of heading
game.getSubHeadText= document.getElementById('subheadtext');			// Holds id of subheader
game.getKeyboard = document.getElementById('keyboard');					// Holds id of containing element of keyboard (used for eventlistener)
game.getAudio = document.getElementById('musicPlay');
/* Methods */


/* Function: Initial set up of the game */

game.setUp = function(message, delay) {									// Set up an interval timer to display heading letters one by one
    var i = 0;					
    var interval = setInterval(function() {        						// Will execute 'function every 'delay' 
        game.getHeaderText.innerHTML += message.charAt(i); 				// Gets current innerHTML and adds next character
        i++;															// For loop to step through 'message'
        if (i > message.length){
            clearInterval(interval);									// Until cleared by clearInterval

            /* Then go on and set up rest of gamepage 
			   note must be within interval loop to occus asynchronously */
            												
            game.getSubHeadText.innerHTML='Hang-Monster!';      			// Print sub-heading when main heading finished printing

            game.printFunc('hangboxtext', instructions);					// Display initial text & instructions

            game.imageAdd('monsterbx', 'images/poster.JPG');				// Display the initial image

            game.word = game.randWord(monstersArray);						// Get a random monstername to be guessed

            game.guesses = game.initGuesses(game.word);						// Converts monstername to an appropraite length string of underscores for display

            game.printGuesses(game.guesses);								// Displays players guesses (initialy just underscores)

            game.updateLives(game.numLives);								// Initilaises num user lives & displays

            game.updateLetUsed(game.letUsed);								// initialises array of letters used by player & displays

            game.giveHint(game.randNum);									// Finally displays hint

            game.setKeyboard();

            game.audioPlay();
          
       	}
    }, delay);																// End of interval function
}

/* Function: Output content to to an element */

  game.printFunc = function(destination, msg) {								// Target element and message to be displayed passed to function
 	document.getElementById(destination).innerHTML=msg;	
 };


 /* Function: Add image to container*/

 game.imageAdd = function(destination, monsterImg) {						// Target elemnt and image path passed to function
	var elem = document.createElement('img');								// Creates a new img element
		elem.setAttribute('id', 'monstimage');								// Sets attributes
		elem.setAttribute('src', monsterImg);						
		elem.setAttribute('height', '290px');
		elem.setAttribute('max-width', '290px');
		elem.setAttribute('alt', 'The demogorgon');
	document.getElementById(destination).appendChild(elem);					// Appends to parent element (as passed to function) in DOM 
};


/* Function: Change image in container*/

game.imageChange = function(destination, newImg) {
	var elem = document.getElementById(destination);
	elem.setAttribute('src', newImg);	
};


/* Function: Generate and return a random monstername from the array monsterArray
   Make sure it is different from previous monster */

game.randWord = function (array) {
 	
 	var checkDifferent = game.randNum;
 	while (game.randNum == checkDifferent) {								// Random number generation repeats until new number is different from previous
 		game.randNum = Math.round((Math.random()*(array.length-1)));}		// Make number 0 - length of passed in array (in this case monsterArray)
 	var wd = array[game.randNum] [0]; 
 	return wd;
 };


/* Function: Creates a string of underscores corresponding to letters in monstername to be guessed */
  

game.initGuesses = function (wd) {

	var letter = "";
	var msg = "";

	for (var i = 0; i < wd.length; i++) {									// Loop through letters in word to be guessed
		if (wd[i] === '-') {   												// Allow for hyphens in monsternames*/
			letter = "-";
			}
			else {
			letter = "_";													// otherwise an underscore
			}
		game.guesses.push(letter);											// push either '_' or '-' to array game.guesses
	}
	return game.guesses;
};


/* Function: Converts game.guesses array to a string and prints it to the statusbox*/

game.printGuesses = function(gs) {
	
	var letter = "";
	var msg = "";

	for (var i = 0; i < gs.length; i++) {
		msg = msg + gs[i];
	}
	game.getGuessWd.innerHTML = msg;
	return msg;
};


 /* Function: Displays number of player lives left in the DOM*/

game.updateLives = function(num) {
 	game.getLives.innerHTML = "Lives remaining: " + num;
 };


 /* Function: Converts used letters array to a string and displays it in the DOM*/

 game.updateLetUsed = function(array) {
 	var msg = "";

 	for (var i=0; i < array.length; i++) {
 		msg = msg + array[i] + " ";
 	}

 	game.getLetUsed.innerHTML = "Letters used: " + msg;
 };


  /* Function: Create & display keyboard*/

 game.setKeyboard = function() {

 	for (var i=0; i<10; i++) {
		var elem = document.createElement('button');
		elem.setAttribute('type', 'button');							
		elem.setAttribute('class', 'key');	
		elem.innerHTML = qwertyLetters[i];					
		document.getElementById('keyFirstRow').appendChild(elem);
	}	

	for (var i=10; i<19; i++) {			
		var elem = document.createElement('button');
		elem.setAttribute('type', 'button');							
		elem.setAttribute('class', 'key');	
		elem.innerHTML = qwertyLetters[i];					
		document.getElementById('keySecondRow').appendChild(elem);
	}	

	for (var i=19; i<26; i++) {			
		var elem = document.createElement('button');
		elem.setAttribute('type', 'button');							
		elem.setAttribute('class', 'key');	
		elem.innerHTML = qwertyLetters[i];					
		document.getElementById('keyThirdRow').appendChild(elem);
	}	

};


 /* Function: Get and Show the hint*/

game.giveHint = function(ind) {
	var msg = "Hint: " + monstersArray[ind] [1];
	game.getHint.innerHTML = msg;
};


 /* Function: create play again and quit buttons and add event handlers*/

game.againOrQuit = function() {													

	var elem = document.createElement('button');									// create new button element
		elem.setAttribute('id', 'playagain');										// Add attributes incl id for event listener
		elem.setAttribute('class', 'playagainbut');									// Add attributes incl class for styling
		elem.innerHTML = "Play Again";												// Give it some text to dispaly
	game.getInstructBox.appendChild(elem);											// update DOM

	elem = document.createElement('button');										// "" See above
		elem.setAttribute('id', 'quit');
		elem.setAttribute('class', 'quitbut');
		elem.innerHTML = "Quit";
	game.getInstructBox.appendChild(elem);

	var el1 = document.getElementById('playagain');									// Add an event listener to new button
	el1.addEventListener('click', game.playAgain, false);							// Has to be done in same funtion scope as button is created 
																					// ** Note no parameters so no ()
																					// ** If () included then function called immediately 
																					// ** compare this to keyboard event listener where function has paraneters 
																					// ** but to avoid immediate function call have function calling function ()
																					

	var el2 = document.getElementById('quit');										// "" See above
	el2.addEventListener('click', game.quitGame, false);
};

 /* Function: Display correct answer with unguessed letters in red*/

 game.printAnswer = function() {

	game.getGuessWd.innerHTML = "";													// Clear element HTML
	var ans = "";
	var lett = "";	

	for (var i=0; i < game.word.length; i++	) {										// Iterate through letters in monstername

		var elem = document.createElement('span');									// Create a <span> for each letter

		if (game.wordGuessed[i] == game.word[i]) {									// If letter correctly guessed					
			elem.setAttribute('class', 'green')}									// Then color is green
			else {elem.setAttribute('class', 'red')}								// else incorrect guesses color is red

		elem.innerHTML = game.word[i];												// Text in <span> element = letter					
		game.getGuessWd.appendChild(elem);											// Append new span to container
	}

}


  /* Function: Playagain
     re-initialise game variables and run through required subset of startup functions */

game.playAgain = function() {

	game.guesses = [];
    game.letUsed = [];
  	game.keyPressed = "";

  	game.numLives = 12;
  	game.word = "";
  	game.wordGuessed = "";

  	game.printFunc('hangboxtext', instructions);

    game.imageChange('monstimage', 'images/poster.JPG');

    game.word = game.randWord(monstersArray);

    game.guesses = game.initGuesses(game.word);

    game.printGuesses(game.guesses);

    game.updateLives(game.numLives);

    game.updateLetUsed(game.letUsed);

    game.giveHint(game.randNum);

    game.audioReplay();

    game.getKeyboard.setAttribute('class', 'clearfix center');

    game.kbd = "active";

 };


 /* Function: Quit the game */

 game.quitGame = function() {
 	window.location.href = "https://www.netflix.com/title/80057281";			// Exit to stranger things website 
 };

  /* Function: Audio management fucntions */

 game.audioPlay = function() {													// Pay audio clip 
  	game.getAudio.play();
 };

 game.audioPause = function() {													// Pause adio clip
  	game.getAudio.pause();
 };

 game.audioReplay = function() {
 	game.getAudio.currentTime = 0;  											// Starts audio clip from beginning again
  	game.getAudio.play();
 };




/* ----------------------------------------- ______________ --------------------------------------------*/
/* -----------------------------------------                --------------------------------------------*/
/* -----------------------------------------     Calls      --------------------------------------------*/
/* -----------------------------------------                --------------------------------------------*/
/* ----------------------------------------- ______________ --------------------------------------------*/
  					



/* ----------------------------------------- Setup the game --------------------------------------------*/

game.setUp('Stranger Things', 200); 											// Change text of heading and time delay between letters here



/* ----------------------------------------- Initialise keyboard Event Listener ----------------------------------------*/

 /* Event listener for keyboard keypresses - 
    **Note don't need event listener for individual keys as event bubbled up and 
      captured by containing element with id keyboard */

game.getKeyboard.addEventListener('click', function(e) {guessAction(e);}, false);



/* ----------------------------------------- Keyboard Event Handler ---------------  --------------------*/

 /* Event Handler function for when a key is pressed
    ****Could be included as a method oof the game object 
        but nice to keep it outside as it's the central piece of game control logic****   */


function guessAction(e) {
		var notTwice = 0;
		game.keyPressed = e.target.innerHTML;												// Get keypressed from innerHTML of container event (e)
		if (game.keyPressed.length >1 || game.kbd == "inactive") {game.keyPressed = ""; game.numLives++;}					// Filter out keypresses outside of keys themselves

			if ((game.letUsed.length > 0) && (game.letUsed.indexOf(game.keyPressed) >= 0)) {// Filter out non-unique keypresses

					if (notTwice = 0) {game.numLives++; notTwice = 1}						// Prevent multiple updates to numLives due to repeated keypresses of non-unique keys

					game.getWarnMsg.innerHTML="Letter already selected. Please select another";// Dispaly warning message 
				}	


			else {

				 game.giveHint(game.randNum); 												// Replace warning message (if present) with hint

				for (var i=0; i < game.word.length; i++) { 									// Loop through monstername to be guessed 

					if (game.word[i] == game.keyPressed) {									// Compare each letter to user entered letter

						game.guesses[i] = game.keyPressed;									// If match then place that letter into the correct guesses array at the correct position
						}

						else {

							// Call function to build  gallows								// If no match I was going to draw some gallows but ran out of time!
						}																	// More importnatly, DONT add anything to correct guesses array
				
				}

				game.wordGuessed = game.printGuesses(game.guesses);							// Dispaly current state of user guesses 						

				if (game.keyPressed != "") {game.letUsed.push(game.keyPressed)}				// Update and display used Letters with latast keypress (provided keyPress doesn't equal "")
				game.updateLetUsed(game.letUsed);

				game.numLives--;															// Decrement and display player lives
				game.updateLives(game.numLives);
				notTwice = 0;																	
				
				}


			if (game.numLives == 0) {														// Player lost (no more lives)

				game.kbd = "inactive";														// Toggle keyboard to inactve

				game.getKeyboard.setAttribute('class', 'clearfix center kbdfade');			// Fade out keyboard to indicate inactive

				game.printAnswer ();														// print the correct answer with unguessed letters in red

				var msg = 	'<h1 class="gameoverh">GAME OVER<h1>' + 
			  				'<p class="gameoverp">The monster was a ' + 
			  				'<span class="gameoverm">' + game.word + '</span>.</p>'+		// Add a class for styling
			  				'<p class="gameoverp">Read more about this monster <br />' + 
			 				 '<a href=monstersArray[game.randNum] [3] target="_blank" class="gameoverl">HERE</a></p>'; // Add a link


				game.printFunc('hangboxtext', msg);

				var monst = "images/" + monstersArray[game.randNum] [3];					// Change image to current monster
				game.imageChange('monstimage', monst);

				game.audioPause();															// pause the audio

				game.againOrQuit();															// Game over - player lost - call gameLost function
			}


			if (game.wordGuessed == game.word) {											// Player won - guessed word = monstername																	

				game.kbd = "inactive";														// "" as above

				game.getKeyboard.setAttribute('class', 'clearfix center kbdfade');



				var msg = 	'<h1 class="youwonh">You Won!<h1>' + 
					  		'<p class="gameoverp">The monster was a ' + 
					  		'<span class="gameoverm">' + game.word + '</span>.</p>'+
					  		'<p class="gameoverp">Read more about this monster <br />' + 
					  		'<a href=monstersArray[game.randNum] [3] target="_blank" class="gameoverl">HERE</a></p>';

				game.printFunc('hangboxtext', msg);

				var monst = "images/" + monstersArray[game.randNum] [3];
				game.imageChange('monstimage', monst);

				game.audioPause();

				game.againOrQuit();													// Game over - player won - call gameWon function
																					// ** Note the wordGuessed string has no spaces since we separate out the letters using letter-spacing in the CSS

			}		 

}



/* ----------------------------------------- End  --------------------------------------------------------*/
