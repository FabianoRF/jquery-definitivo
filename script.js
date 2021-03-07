let correctCards = 0;
$(init);


// Incia
function init() {

  // Esconde a mensagem de sucesso
  $('#successMessage').hide();
  $('#successMessage').css({
    left: '580px',
    top: '250px',
    width: 0,
    height: 0
  });


  // Inicia o game
  correctCards = 0;
  $('#cardPile').html('');
  $('#cardSlots').html('');

  // Cria a primeira pilha de cartas
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  numbers.sort(function () { return Math.random() - .5 });

  for (let i = 0; i < 10; i++) {
    $('<div>' + numbers[i] + '</div>')
      .data('number', numbers[i])
      .attr('id', 'card' + numbers[i])
      .appendTo('#cardPile')
      .draggable({
        containment: '#content',
        stack: '#cardPile div',
        cursor: 'move',
        revert: true
      });
  }

  // Cria os slots para as cartas
  let words = ['Quem eh o bruxao??', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  for (let i = 1; i <= 10; i++) {
    $('<div>' + words[i - 1] + '</div>')
      .data('number', i)
      .appendTo('#cardSlots')
      .droppable({
        accept: '#cardPile div',
        hoverClass: 'hovered',
        drop: handleCardDrop
      });
  }

}

function handleCardDrop(event, ui) {

  //Grab the slot number and card number
  let slotNumber = $(this).data('number');
  let cardNumber = ui.draggable.data('number');

  //If the cards was dropped to the correct slot,
  //change the card colour, position it directly
  //on top of the slot and prevent it being dragged again
  if (slotNumber === cardNumber) {
    ui.draggable.addClass('correct');
    ui.draggable.draggable('disable');
    $(this).droppable('disable');
    ui.draggable.position({
      of: $(this), my: 'left top', at: 'left top'
    });
    //This prevents the card from being
    //pulled back to its initial position
    //once it has been dropped
    ui.draggable.draggable('option', 'revert', false);
    correctCards++; //increment keep track correct cards
  }

  //If all the cards have been placed correctly then
  //display a message and reset the cards for
  //another go
  if (correctCards === 10) {
    $('#successMessage').show();
    $('#successMessage').animate({
      left: '380px',
      top: '200px',
      width: '400px',
      height: '100px',
      opacity: 1
    });
  }
}
