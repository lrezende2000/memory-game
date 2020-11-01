const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let blockBoard = false;

function flipCard() {
  if (blockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    console.log(this);
    return;
  }

  secondCard = this;

  checkMatch(firstCard, secondCard);
}

function checkMatch(firstCard, secondCard) {
  if (firstCard.dataset.card === secondCard.dataset.card) {
    disableCards();
    return;
  }

  unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  blockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000)
}

function resetBoard() {
  [hasFlippedCard, blockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(() => {
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  })
})();

cards.forEach(card => {
  card.addEventListener('click', flipCard);
})

