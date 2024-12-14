const grid = document.getElementById('grid');
const resetButton = document.getElementById('reset-button');

// Array of card values (8 pairs of images)
const cardValues = [
  'assets/images/Snoopy.jpg', 'assets/images/Snoopy.jpg',
  'assets/images/Woodstock.jpg', 'assets/images/Woodstock.jpg',
  'assets/images/CharlieBrown.jpg', 'assets/images/CharlieBrown.jpg',
  'assets/images/Linus.jpg', 'assets/images/Linus.jpg',
  'assets/images/Lucy.jpg', 'assets/images/Lucy.jpg',
  'assets/images/sally.jpg', 'assets/images/sally.jpg',
  'assets/images/paty.jpg', 'assets/images/paty.jpg',
  'assets/images/Pig-Pen.jpg', 'assets/images/Pig-Pen.jpg'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

// Shuffle function
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Create cards on the grid
function createCards() {
  const shuffledValues = shuffle(cardValues);
  shuffledValues.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.addEventListener('click', handleCardClick);
    grid.appendChild(card);
  });
}

// Handle card click
function handleCardClick(e) {
  if (lockBoard) return;

  const clickedCard = e.target;
  if (clickedCard === firstCard || clickedCard.classList.contains('matched')) return;

  clickedCard.classList.add('flipped');
  clickedCard.style.backgroundImage = `url(${clickedCard.dataset.value})`;

  if (!firstCard) {
    firstCard = clickedCard;
  } else {
    secondCard = clickedCard;
    checkMatch();
  }
}

// Check for a match
function checkMatch() {
  const isMatch = firstCard.dataset.value === secondCard.dataset.value;

  if (isMatch) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedPairs += 1;
    resetSelection();

    if (matchedPairs === cardValues.length / 2) {
      setTimeout(() => alert('You win!'), 500);
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.style.backgroundImage = 'none';
      secondCard.style.backgroundImage = 'none';
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetSelection();
    }, 1000);
  }
}

// Reset selection
function resetSelection() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// Reset the game
function resetGame() {
  grid.innerHTML = '';
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  matchedPairs = 0;
  createCards();
}

// Initialize game
resetButton.addEventListener('click', resetGame);
createCards();

