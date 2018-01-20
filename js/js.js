document.addEventListener("DOMContentLoaded", function() {

var playerOneTurn = true;
var oImg = 'img/o.png';
var xImg = 'img/x.png';
var win = false;
var draw = false;
var fullBoard = 0;


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


//Assigns click event to boxes and displays 'O'
var boxes = document.getElementsByClassName('box');

for (i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener('click', playGame);
}


//Starts the game
function playGame() {
  var clicked = document.getElementById((this.id));
  var addImageTo = clicked.firstElementChild;

  //Allows each box to be selected only once
  if (!clicked.classList.contains('clicked')) {
    clicked.classList.add('clicked');
    addImageTo.style.display = 'block';  
    fullBoard++;

    if (playerOneTurn) {
      clicked.classList.add('o');
      addImageTo.src = oImg;
      checkWin('o');
      playerOneTurn = false;
    } else {
      clicked.classList.add('x');
      addImageTo.src = xImg;
      checkWin('x');
      playerOneTurn = true;
    }
  }
}


//Checks if a player has won
var checkWin = (ox) => {
  var checkForWin = [];
  var counter;

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
};






});