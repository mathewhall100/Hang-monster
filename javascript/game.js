


/* ----Initialise global variables ------ */

var lettersArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z', ];

  var monstersArray = [
  					['demogorgon', 'mythical beast', 'https://en.wikipedia.org/wiki/Demogorgon', 'demogorgon.jpg',],
  					['pollywog', 'A monstrous tadpole', 'https://www.popsugar.com/entertainment/What-Pollywog-44191387', 'polliwog.jpg',],
  					['hydra', 'A many headed serpent', 'https://en.wikipedia.org/wiki/Hydra', 'hydra.jpg',],
  					['cyclops','A one eyed monster who lives in a cave', 'https://en.wikipedia.org/wiki/Cyclops', 'cyclops.jpg'],
  					['zombie', 'A reanimated - usually very pale - human corpse!','https://en.wikipedia.org/wiki/Zombie', 'zombie.jpg'],
  					  ];

  var headerText = 'Stranger Things';

  var instructions = 'We all love Stranger Things! <br /><br />' +
  					 'BUT do you know your MONSTERS!! <br /><br />' +
  					 'Pit yourself against our Stranger Things Hang-monster game <br />' +
  					 'and win the right to add your own favourite monster to the game!'; 

  var guesses = [];
  var letUsed = [];
  var keyPressed = "";
  var numLives = 12;
  var numCorrectGuesses = 0;
  var word = "";

  var getLives = document.getElementById("lives");
  var getLetUsed = document.getElementById("letused");
  var warnMsg = document.getElementById("warningmsg"); 
  var guessWd = document.getElementById("statusword"); 
  var keyBd = document.getElementById("keyboard"); 

  					
window.onload = function () {  // run initialisation code as soon as page loads



/* ---- call setup function ------ */

setUp('headertext', 'Stranger Things', 2);



 /* Handover to event handler function for keypresses*/


function guessAction(e) {
		var keyPressed = e.target.innerHTML;							// get keypressed from innerHTML of container event		
		if (keyPressed.length >1) {keyPressed = ""; numLives++;}		// filter out keypresses outside of keys themselves

			console.log(keyPressed);
			console.log(letUsed.indexOf(keyPressed));

			if ((letUsed.length > 0) && (letUsed.indexOf(keyPressed) > 0)) {

					console.log(letUsed.indexOf(keyPressed));
					warnMsg.innerHTML="Letter already selected. Please select another";
				}	


			else {

				warnMsg.innerHTML="";

				for (var i=0; i < word.length; i++) { 

					if (word[i] == keyPressed) {

						guesses[i] = keyPressed;
						}

						else {

							// function to build more gallows
						}
				}

				var wordGuessed = printGuesses(guesses);

				letUsed.push(keyPressed);
				updateLetUsed(letUsed);

				numLives--;
				updateLives(numLives);

				}


			if (numLives == 0) {			// game over - player lost

				gameLost(word);
			}


			if (wordGuessed == word) {		// game over - player won
				gameWon(word);

			}

		 
}



/* -----------------------------------------Functions ----------------------------------------*/



/* ---- setup function including printing game headers using interval delays ------ */

function setUp(destination, message, delay){
    var i = 0;
    var interval = setInterval(function(){        									// will execute 'function every 'delay' 
        document.getElementById(destination).innerHTML += message.charAt(i); 		// gets current innerHTML and adds next character
        i++;																		// for loop to step through 'message'
        if (i > message.length){
            clearInterval(interval);												// until cleared by clearInterval
            document.getElementById('subheadtext').innerHTML='Hang-monster!';       // print sub-heading when main heading finished printing

            instructionsPrint('gameinstructions', instructions);

            monsterAdd('monsterbx', 'images/demogorgon.jpg');

            word = randWord(monstersArray);

            guesses = initGuesses(word);

            printGuesses(guesses);

            updateLives(numLives);

            updateLetUsed(letUsed);
          
        }
    }, delay);
}


/* Function: Print Instructions */

 function instructionsPrint(destination, msg) {
 	document.getElementById(destination).innerHTML=msg;	
 }



 /* Function: add image to monsterbox */

function monsterAdd(destination, monsterImg) {
	var elem = document.createElement('img');
	elem.setAttribute('src', monsterImg);
	elem.setAttribute('height', '280px');
	elem.setAttribute('max-width', '280px');
	elem.setAttribute('alt', 'The demogorgon');
	document.getElementById(destination).appendChild(elem);
}



 /* create word to guess using random function om contentArray */

 function randWord(array) {
 	var randNum = Math.round((Math.random()*(array.length-1)));
 	var wd = array[randNum] [0];  
 	console.log(randNum + "," + wd);
 	
 	return wd;
 }



 /* Function: create guesses array and placeholders*/

function initGuesses(wd) {

	var letter = "";
	var msg = "";

	for (var i = 0; i < wd.length; i++) {

		if (wd[i] === '-') {
			letter = "-";
			}
			else {
			letter = "_";
			}

		guesses.push(letter);

		}

	return guesses;

	}



 /* Function: creates a string from the guesses array and prints it to the statusbox*/

function printGuesses(gs) {
	
	var letter = "";
	var msg = "";

	for (var i = 0; i < gs.length; i++) {

		msg = msg + gs[i];
	}

	guessWd.innerHTML = msg;
	return msg;

	}



 /* Function: update the number of lives*/

 function updateLives (num) {
 	getLives.innerHTML = "Lives remaining: " + num;
 }


 /* Function: update array of used letters*/

 function updateLetUsed(array) {
 	var msg = "";

 	for (var i=0; i < array.length; i++) {
 		msg = msg + array[i] + " ";
 	}

 	if (msg == "") {msg = "0";}

 	getLetUsed.innerHTML = "Letters used: " + msg;
 }

function gameLost() {

};

function gameWon() {console.log('gameWon')};





/* ----------------------------------------- Eventy handlers ----------------------------------------*/

 /* add event handler for keyboard keypresses - 
    note don't need event handlers for each key as eevent bubbled up and 
    captured by containing element, */

	var el = document.getElementById('keyboard');
	el.addEventListener('click', function(e) {guessAction(e);
	}, false);





}; // close of windoes onload function

