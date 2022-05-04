const cardArray = [
  'images/cat1.jpg',
  'images/cat2.webp',
  'images/cat3.webp',
  'images/cat4.jpg',
  'images/dog1.jpg',
  'images/dog2.jpeg',
  'images/dog3.jpg',
  'images/dog4.webp',
  'images/cat1.jpg',
  'images/cat2.webp',
  'images/cat3.webp',
  'images/cat4.jpg',
  'images/dog1.jpg',
  'images/dog2.jpeg',
  'images/dog3.jpg',
  'images/dog4.webp'
];

cardArray.sort(() => 0.5 - Math.random());
const unknownCard = 'images/blank.webp';
const gridDisplay = document.querySelector('#gameGrid');
const scoreDisplay = document.getElementById('score');
const mistakesDisplay = document.getElementById('mistakes');
let score = 0;
let mistakes = 0;

(function () {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement('img');
    card.setAttribute('class', 'card');
    card.setAttribute('src', unknownCard);
    card.setAttribute('key', i);
    card.addEventListener('click', flipCard);
    gridDisplay.appendChild(card);
  }
})();

let numberOfCardsFlipped = 0;
let cardsFlipped = [];
let checking = false;

function flipCard() {
  if (!checking) {
    const cardIndex = this.getAttribute('key');
    this.setAttribute('src', cardArray[cardIndex]);
    if (!cardsFlipped || this !== cardsFlipped[cardsFlipped.length - 1]) {
      numberOfCardsFlipped++;
      cardsFlipped.push(this);
    }
    if (numberOfCardsFlipped === 2) {
      checking = true;
      numberOfCardsFlipped = 0;
      checkMatch();
    }
  }
}

function checkMatch() {
  const firstCard = cardsFlipped[0];
  const secondCard = cardsFlipped[1];
  if (firstCard.getAttribute('src') !== secondCard.getAttribute('src')) {
    setTimeout(() => {
      firstCard.setAttribute('src', unknownCard);
      secondCard.setAttribute('src', unknownCard);
      cardsFlipped.length = 0;
      checking = false;
      mistakes++;
      mistakesDisplay.innerText = mistakes;
    }, 1000);
  } else {
    score++;
    scoreDisplay.innerText = score;
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    cardsFlipped.length = 0;
    checking = false;
  }
  if (score === cardArray.length/2) {
    score += ' (You Won!)';
    scoreDisplay.innerText = score;
  }
}
