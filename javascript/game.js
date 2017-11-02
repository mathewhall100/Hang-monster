


/* ----Initialise global variables ------ */

var lettersArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z', ];

  var monstersArray = [
  					['demogorgon', 'the faceless Prince of Demons', 'https://en.wikipedia.org/wiki/Demogorgon', 'demogorgon.jpg',],
  					['demogorgon', 'the faceless Prince of Demons', 'https://en.wikipedia.org/wiki/Demogorgon', 'demogorgon.jpg',],
  					['pollywog', 'a monstrous tadpole', 'https://www.popsugar.com/entertainment/What-Pollywog-44191387', 'polliwog.jpg',],
  					['hydra', 'a many headed serpent', 'https://en.wikipedia.org/wiki/Hydra', 'hydra.jpg',],
  					['cyclops','a one eyed monster who lives in a cave', 'https://en.wikipedia.org/wiki/Cyclops', 'cyclops.jpg'],
  					['zombie', 'a reanimated - usually very pale - human corpse!','https://en.wikipedia.org/wiki/Zombie', 'zombie.jpg'],
  					  ];

  var instructions = '<p>We all love Stranger Things! <br /><br />' +
  					 'BUT do you know your MONSTERS!! <br /><br />' +
  					 'Pit yourself against our Stranger Things Hang-Monster game <br />' +
  					 'and win the right to add your own favourite monster to the game!</p>';

  var headerText = 'Stranger Things';		  

  var guesses = [];
  var letUsed = [];
  var keyPressed = "";
  var numLives = 12;
  var numCorrectGuesses = 0;
  var word = "";
  var wordGuessed = "";
  var randNum = 0;

  var getLives = document.getElementById("lives");
  var getLetUsed = document.getElementById("letused");
  var warnMsg = document.getElementById("warningmsg"); 
  var guessWd = document.getElementById("statusword"); 
  var keyBd = document.getElementById("keyboard"); 

  					
window.onload = function () {  // run initialisation code as soon as page loads



/* ---- call setup function ------ */

setUp('headertext', 'Stranger Things', 200);



 /* Handover to event handler function for keypresses*/
  /* Core control logic for game*/


function guessAction(e) {
		var notTwice = 0;
		var keyPressed = e.target.innerHTML;							// get keypressed from innerHTML of container event		
		if (keyPressed.length >1) {keyPressed = ""; numLives++;}		// filter out keypresses outside of keys themselves

			if ((letUsed.length > 0) && (letUsed.indexOf(keyPressed) >= 0)) {

					console.log(letUsed.indexOf(keyPressed));

					if (notTwice = 0) {numLives++; notTwice = 1}
					warnMsg.innerHTML="Letter already selected. Please select another";
				}	


			else {

				 giveHint(randNum); /*warnMsg.innerHTML="";*/

				for (var i=0; i < word.length; i++) { 

					if (word[i] == keyPressed) {

						guesses[i] = keyPressed;
						}

						else {

							// function to build more gallows
						}
				
				}

				wordGuessed = printGuesses(guesses);

				letUsed.push(keyPressed);
				updateLetUsed(letUsed);

				numLives--;
				updateLives(numLives);
				notTwice = 0;
				
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
            document.getElementById('subheadtext').innerHTML='Hang-Monster!';       // print sub-heading when main heading finished printing

            


            printFunc('hangboxtext', instructions);

            imageAdd('monsterbx', 'images/poster.JPG');

            word = randWord(monstersArray);

            guesses = initGuesses(word);

            printGuesses(guesses);

            updateLives(numLives);

            updateLetUsed(letUsed);

            giveHint(randNum);
          
        }
    }, delay);
}


/* Function: Print Instructions */

 function printFunc(destination, msg) {
 	document.getElementById(destination).innerHTML=msg;	
 }



 /* Function: add image to monsterbox */

function imageAdd(destination, monsterImg) {
	var elem = document.createElement('img');
	elem.setAttribute('id', 'monstimage');
	elem.setAttribute('src', monsterImg);
	elem.setAttribute('height', '280px');
	elem.setAttribute('max-width', '280px');
	elem.setAttribute('alt', 'The demogorgon');
	document.getElementById(destination).appendChild(elem);
}


 /* Function: change image in monsterbox */

function imageChange(dest, newImg) {
	var elem = document.getElementById(dest);
	elem.setAttribute('src', newImg);
	
}



 /* create word to guess using random function om contentArray */

 function randWord(array) {
 	var checkDifferent = randNum;
 	while (randNum == checkDifferent) {
 		randNum = Math.round((Math.random()*(array.length-1)));}
 
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

function giveHint(ind) {
	var msg = "Hint: " + monstersArray[ind] [1];
	warnMsg.innerHTML = msg;

}


 /* Function: game lost actions*/

function gameLost(wd) {
	var msg = '<h1 class="gameoverh">GAME OVER<h1>' + 
			  '<p class="gameoverp">The monster was a ' + 
			  '<span class="gameoverm">' + wd + '</span>.</p>'+
			  '<p class="gameoverp">Read more about this monster <br />' + 
			  '<a href=monstersArray[randNum] [3] target="_blank" class="gameoverl">HERE</a></p>';


	printFunc('hangboxtext', msg);

	var monst = "images/" + monstersArray[randNum] [3];
	imageChange('monstimage', monst);

	againOrQuit();
}

 /* Function: game won actions*/

function gameWon(wd) {

	var msg = '<h1 class="youwonh">You Won!<h1>' + 
			  '<p class="gameoverp">The monster was a ' + 
			  '<span class="gameoverm">' + wd + '</span>.</p>'+
			  '<p class="gameoverp">Read more about this monster <br />' + 
			  '<a href=monstersArray[randNum] [3] target="_blank" class="gameoverl">HERE</a></p>';


	printFunc('hangboxtext', msg);

	var monst = "images/" + monstersArray[randNum] [3];
	imageChange('monstimage', monst);

	againOrQuit();
}

 /* Function: create play again and quit buttons and add event handlers*/

function againOrQuit() {
	var elem = document.createElement('button');
	elem.setAttribute('id', 'playagain');
	elem.setAttribute('class', 'playagainbut');
	elem.innerHTML = "Play Again";
	document.getElementById('hangboxtext').appendChild(elem);

	elem = document.createElement('button');
	elem.setAttribute('id', 'quit');
	elem.setAttribute('class', 'quitbut');
	elem.innerHTML = "Quit";
	document.getElementById('hangboxtext').appendChild(elem);

	var el1 = document.getElementById('playagain');
	el1.addEventListener('click', playagain, false);

	var el2 = document.getElementById('quit');
	el2.addEventListener('click', quitgame, false);

}





 /* Function: quitgame*/

 function quitgame() {
 	window.location.href = "https://www.netflix.com/title/80057281";
 }

  /* Function: playagain*/

function playagain() {

	guesses = [];
    letUsed = [];
  	keyPressed = "";
  	numLives = 12;
  	numCorrectGuesses = 0;
  	word = "";
  	wordGuessed = "";
  	randNum = 0;

  	printFunc('hangboxtext', instructions);

    imageChange('monstimage', 'images/poster.JPG');

    word = randWord(monstersArray);

    guesses = initGuesses(word);

    printGuesses(guesses);

    updateLives(numLives);

    updateLetUsed(letUsed);

    giveHint(randNum);
 }


/* ----------------------------------------- Eventy handlers ----------------------------------------*/

 /* add event handler for keyboard keypresses - 
    note don't need event handlers for each key as eevent bubbled up and 
    captured by containing element, */

	var el = document.getElementById('keyboard');
	el.addEventListener('click', function(e) {guessAction(e);}, false);


}; // close of windoes onload function	

	




