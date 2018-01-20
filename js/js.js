document.addEventListener("DOMContentLoaded", function() {

var playerOneTurn = true;
var oImg = 'img/o.png';
var xImg = 'img/x.png';

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
var boxes = document.querySelectorAll('.box');

for (i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener('click', function() {
    var clicked = document.getElementById(this.id);
    var addImageTo = clicked.firstElementChild;
    addImageTo.style.display = 'block';

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
  })
}




//Checks if a player has won
var checkWin = (n) => {
  var checkForWin = [];

  //Pushes all selected elements into checkForWin array
  for (i = 0; i < boxes.length; i++) {
    if (boxes[i].classList.contains(n)) {
      if (checkForWin.indexOf(i) === -1) {
        checkForWin.push(i);
      }
    }
  }

  //Check for a win
  for (i = 0; i < winningCombos.length; i++) {
    var counter = 0;
    for (j = 0; j < 3; j++) {
      if (checkForWin.indexOf(winningCombos[i][j]) !== -1) {
        counter++;
        if (counter === 3) {
          console.log('Player ' + n + ' wins!')
        }
      }
    }
  }

  // console.log(checkForWin);
  // console.log(checkForWin.indexOf(winningCombos[0][0]));





};






});