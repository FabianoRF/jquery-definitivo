let questoesCorretas = 0;
$(init);


// Inicia
function init() {
  // Esconde a mensagem de sucesso
  $('#mensagemSucesso').hide();
  $('#mensagemSucesso').css({
    left: '580px',
    top: '250px',
    width: 0,
    height: 0
  });


  // Inicia o game
  questoesCorretas = 0;
  $('#cardPile').html('');
  $('#cardSlots').html('');

  // Cria a primeira pilha de cartas
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  numbers.sort(() => { return Math.random() - .5 });

  for (let i = 0; i < 9; i++) {
    $('<div>' + '</div>')
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
  let questoes = ['Primeiro Programador',
    'Pai da computação',
    'Criador da linguagem C, cocriador do Unix',
    'Pai do open source',
    'Solucionou o problema do caminho mais curto num grafo',
    'Pai do Java',
    'Criador do Git e do Linux',
    'Criou o primeiro pc',
    'Criador do WWW'];

  for (let i = 1; i <= 9; i++) {
    $('<div>' + questoes[i - 1] + '</div>')
      .data('number', i)
      .appendTo('#cardSlots')
      .droppable({
        accept: '#cardPile div',
        hoverClass: 'hovered',
        drop: lidaComODropDoCard
      });
  }

}

function lidaComODropDoCard(event, ui) {

  //pega o slot e o numero da questão
  let numeroDoSlot = $(this).data('number');
  let numeroDaQuestão = ui.draggable.data('number');

  //Se os cards forem dropados no slot correto
  //Mude alguma cor ou algo do tipo
  //on top of the slot and prevent it being dragged again

  if (numeroDoSlot === numeroDaQuestão) {
    ui.draggable.addClass('correct');
    ui.draggable.draggable('disable');
    $(this).droppable('disable');
    ui.draggable.position({
      of: $(this), my: 'left top', at: 'left top'
    });

    //Previne que o card saia para fora
    //coloca o card na posição inicial

    ui.draggable.draggable('option', 'revert', false);
    questoesCorretas++; //incrementa uma questão correta
  }

  // Se todas questoes estiverem corretas exibir a mensagem de sucesso
  if (questoesCorretas === 9) {
    $('#mensagemSucesso').show();

    $('#mensagemSucesso').animate({
      width: '600px',
      height: '200px',
      opacity: 1
    });
  }
}
