$('document').ready(function() {

  //Assigns click event to boxes and displays 'O'
  var boxes = document.querySelectorAll('.box');

  for (i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', function () {
      var clicked = document.getElementById(this.id).firstElementChild;
      clicked.src = 'img/o.png';
      clicked.style.display = 'block';
    })
  }


});