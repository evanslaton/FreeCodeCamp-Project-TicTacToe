document.addEventListener("DOMContentLoaded", function() {

var playerOneTurn = true;
var playerOne = 'o';
var playerTwo = 'x';
var playerOneImg = 'img/' + playerOne + '.png';
var playerTwoImg = 'img/' + playerTwo + '.png';
var win = false;
var draw = false;
var fullBoard = 0;
var checkForWin = [];
var happensOnce = true;
var onePlayer = true;
var playerOneTurnKeeper = document.getElementById('player-one');
var playerTwoTurnKeeper = document.getElementById('player-two');

//Boxes
var zero = document.getElementById('0');
var one = document.getElementById('1');
var two = document.getElementById('2');
var three = document.getElementById('3');
var four = document.getElementById('4');
var five = document.getElementById('5');
var six = document.getElementById('6');
var seven = document.getElementById('7');
var eight = document.getElementById('8');

var winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
];


//Assigns click event to boxes and starts the game
var boxes = document.getElementsByClassName('box');

for (i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener('click', playGame);
}


//Starts the game
function playGame() {
  var clicked = document.getElementById((this.id));
  var addImageTo = clicked.firstElementChild;

  //Allows each box to be selected only once
  if (!clicked.classList.contains('clicked') && !win) {

    if (playerOneTurn) {
      clicked.classList.add(playerOne);
      addImageTo.src = playerOneImg;
      clicked.classList.add('clicked');
      addImageTo.style.display = 'block';   
      checkWin(playerOne);
      playerOneTurn = false;
      playerOneTurnKeeper.classList.remove('visible-border');      
      playerTwoTurnKeeper.classList.add('visible-border');
      computerPlay(playerOne, playerTwo);
    } else {




      // clicked.classList.add('x');
      // addImageTo.src = xImg;
      // checkWin('x');
      // playerOneTurn = true;
    }
  }
}


//Computer's turn
var computerPlay = (pOne, pTwo) => {

  if (!win) {
    setTimeout(function() {
      var openBoxes = [];
      var playHere;
      var randomBox;
      var toBePlayed;
      var tempArr = [];
      checkForWin = [];

        for (i = 0; i < boxes.length; i++) {
          if (!boxes[i].classList.contains('clicked')) {
            openBoxes.push(boxes[i]);
          }
        }

        if (openBoxes.indexOf(four) !== -1 && openBoxes.length === 8) {
          four.classList.add(playerTwo);
          four.firstElementChild.src = playerTwoImg;
          four.firstElementChild.style.display = 'block';
          four.classList.add('clicked');
        } else if (openBoxes.indexOf(four) === -1 && openBoxes.length === 8) {
          zero.classList.add(playerTwo);
          zero.firstElementChild.src = playerTwoImg;
          zero.firstElementChild.style.display = 'block';
          zero.classList.add('clicked'); 
        } else if (openBoxes.length < 8) {

          //Pushes all selected elements into checkForWin array
          for (i = 0; i < boxes.length; i++) {
            if (boxes[i].classList.contains(pOne)) {
              if (checkForWin.indexOf(i) === -1) {
                checkForWin.push(i);
              }
            }
          }

          for (i = 0; i < winningCombos.length; i++) {
            counter = 0;
            for (j = 0; j < 3; j++) {
              if (checkForWin.indexOf(winningCombos[i][j]) !== -1 && !playerOneTurn) {
                counter++;
                if (counter === 2 && happensOnce) {
                  tempArr = winningCombos[i];
                  for (k = 0; k < tempArr.length; k++) {
                    if (checkForWin.indexOf(tempArr[k]) === -1) {
                      if (tempArr[k] !== 4) {
                        console.log('block win');
                      toBePlayed = document.getElementById(tempArr[k]);
                      toBePlayed.classList.add(playerTwo);
                      toBePlayed.firstElementChild.src = playerTwoImg;
                      toBePlayed.firstElementChild.style.display = 'block';
                      toBePlayed.classList.add('clicked');
                      happensOnce = false;
                      playerOneTurn = true;
                      }
                    }
                  }
                }
              }
            }
          }
        }

        if (!playerOneTurn && openBoxes.length < 8) {
          console.log(counter);
          randomBox = randomNumber(0, openBoxes.length -1);       
          playHere = openBoxes[randomBox];
          playHere.classList.add(playerTwo);
          playHere.firstElementChild.src = playerTwoImg;
          playHere.firstElementChild.style.display = 'block';
          playHere.classList.add('clicked');
        }

        checkWin(playerTwo);
        playerOneTurn = true;
        playerOneTurnKeeper.classList.add('visible-border');      
        playerTwoTurnKeeper.classList.remove('visible-border');
    }, 500);
  }
};


//Generates a random number
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//Checks if a player has won
var checkWin = (ox) => {
  checkForWin = [];
  counter = 0;
  fullBoard++;

  //Pushes all selected elements into checkForWin array
  for (i = 0; i < boxes.length; i++) {
    if (boxes[i].classList.contains(ox)) {
      if (checkForWin.indexOf(i) === -1) {
        checkForWin.push(i);
      }
    }
  }

  //Checks for a win
  for (i = 0; i < winningCombos.length; i++) {
    counter = 0;
    for (j = 0; j < 3; j++) {
      if (checkForWin.indexOf(winningCombos[i][j]) !== -1) {
        counter++;
        if (counter === 3) {
          win = true;
          console.log('Player ' + ox + ' wins!')
          stopGame();
        }
      }
    }
  }

  //Determines if the game is a draw
  if (win === false && fullBoard === 9) {
    draw = true;
    console.log('It\'s a draw');
    stopGame();    
  }
};


//Ends the game
var stopGame = () => {
  for (i = 0; i < boxes.length; i++) {
    boxes[i].removeEventListener('click', playGame);
  }

  win = true;



};






});