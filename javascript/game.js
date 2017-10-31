

window.onload = function () {  // check this is right  from book

  var lettersArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z', ];

  var contentArray = [
  					['demogorgon', 'mythical beast', 'https://en.wikipedia.org/wiki/Demogorgon', 'https://cdnb.artstation.com/p/assets/images/images/003/749/943/original/limkuk-art-demogorgon-4.gif?1477078806',],
  					[' ', ' ', ' ', ' ',],
  					];

  var headerText = 'Stranger Things';

  var instructions = 'We all love Stranger Things! <br /><br />' +
  					 'BUT do you know your MONSTERS!! <br /><br />' +
  					 'Pit yourself against our Stranger Things Hang-monster game <br />' +
  					 'and win the right to add your own favourite monster to the game!'; 

  var word = "demogorgon";
  var guess = [];
  var guessed = [];
  var keypressed = "";
  					


function setUp(destination, message, delay){
    var i = 0;
    var interval = setInterval(function(){        									// will execute 'function every 'delay' 
        document.getElementById(destination).innerHTML += message.charAt(i); 		// gets current innerHTML and adds next character
        i++;																		// for loop to step through 'message'
        if (i > message.length){
            clearInterval(interval);												// until cleared by clearInterval
            document.getElementById('subheadtext').innerHTML='Hang-monster!';		// print sub-heading when main heading finished printing
            instructionsPrint('gameinstructions', instructions);  
            monsterAdd('monsterbx', 'images/demogorgon.jpg');

            initletterholders();

          
        }
    },
    delay);
}


/* Function: Print header text*/

setUp('headertext', 'Stranger Things', 2);

/* Function: Print Instructions */

 function instructionsPrint(destination, msg) {
 	document.getElementById(destination).innerHTML=msg;	
 }

 /* Function: add image to monsterbox */

function monsterAdd(destination, monsterImg) {
	var elem = document.createElement('img');
	elem.setAttribute('src', monsterImg);
	elem.setAttribute('height', '280px');
	elem.setAttribute('width', '280px');
	elem.setAttribute('alt', 'The demogorgon');
	document.getElementById(destination).appendChild(elem);
}

 /* Function: set up the user controls & start game button*/

function initletterholders() {

	var letter = "";
	var msg = "";

	for (var i = 0; i < word.length; i++) {

		if (word[i] === '-') {
			letter = "-";
			}
			else {
			letter = "_";
			}
		guess[i] = letter;

		}
		var newWord = document.getElementById('guessword');
		newWord.innerHTML = guess;

	}


function guessAction(e) {
		var keypressed = e.target.innerHTML;				
		console.log(keypressed);

		guess[0] = keypressed;

		var newWord = document.getElementById('guessword');
		newWord.innerHTML = guess;

		console.log(guess);

	}


	var el = document.getElementById('keyboard');
	el.addEventListener('click', function(e) {guessAction(e);
	}, false);


};