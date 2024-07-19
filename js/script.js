document.addEventListener('DOMContentLoaded', function() {
  let cardArray = [
    { name: 'A', img: 'A' },
    { name: 'A', img: 'A' },
    { name: 'B', img: 'B' },
    { name: 'B', img: 'B' },
    { name: 'C', img: 'C' },
    { name: 'C', img: 'C' },
    { name: 'D', img: 'D' },
    { name: 'D', img: 'D' },
    { name: 'E', img: 'E' },
    { name: 'E', img: 'E' },
    { name: 'F', img: 'F' },
    { name: 'F', img: 'F' },
    { name: 'G', img: 'G' },
    { name: 'G', img: 'G' },
    { name: 'H', img: 'H' },
    { name: 'H', img: 'H' },
  ];

  let board = document.getElementById('game-board');
  let errorCountElement = document.getElementById('error-count');
  let resetButton = document.getElementById('reset-button');
  let errorCount = 0;
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  function createBoard() {
    board.innerHTML = ''; 
    cardArray.sort(function() {
      return 0.5 - Math.random();
    });

    cardArray.forEach(function(_, index) {
      let card = document.createElement('div');
      card.setAttribute('class', 'card');
      card.setAttribute('data-id', index);
      card.addEventListener('click', flipCard);
      board.appendChild(card);
    });
  }

  function checkForMatch() {
    let cards = document.querySelectorAll('.card');
    let optionOneId = cardsChosenId[0];
    let optionTwoId = cardsChosenId[1];

    if (cardsChosen[0] === cardsChosen[1]) {
      cardsWon.push(cardsChosen);
      cards[optionOneId].classList.add('matched');
      cards[optionTwoId].classList.add('matched');
      cards[optionOneId].removeEventListener('click', flipCard);
      cards[optionTwoId].removeEventListener('click', flipCard);
    } else {
      errorCount++;
      errorCountElement.textContent = errorCount;
      setTimeout(function() {
        cards[optionOneId].classList.remove('flipped');
        cards[optionOneId].textContent = '';
        cards[optionTwoId].classList.remove('flipped');
        cards[optionTwoId].textContent = '';
      }, 1000);
    }
    cardsChosen = [];
    cardsChosenId = [];
  }

  function flipCard() {
    let cardId = this.getAttribute('data-id');
    if (!cardsChosenId.includes(cardId) && cardsChosen.length < 2) {
      cardsChosen.push(cardArray[cardId].name);
      cardsChosenId.push(cardId);
      this.classList.add('flipped');
      this.textContent = cardArray[cardId].img;

      if (cardsChosen.length === 0) {
        setTimeout(checkForMatch, 300);
      }
    }
  }

  function resetGame() {
    errorCount = 0;
    errorCountElement.textContent = errorCount;
    cardsChosen = [];
    cardsChosenId = [];
    cardsWon = [];
    createBoard();
  }

  resetButton.addEventListener('click', resetGame);

  createBoard();
});