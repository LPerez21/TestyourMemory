const grid = document.getElementById('grid');
const resetButton = document.getElementById('reset-button');

// Array of 16 card values (8 pairs)
const cardValues = [
  'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
  'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

// Shuffle array
function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

// Create cards
function createCards() {
  const shuffledValues = shuffle(cardValues);

  shuffledValues.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.innerText = value;
    card.style.color = 'transparent'; // Hide the value initially
    card.addEventListener('click', handleCardClick);
    grid.appendChild(card);
  });
}

// Handle card click
function handleCardClick(e) {
  if (lockBoard) return;
  const clickedCard = e.target;

  if (clickedCard === firstCard) return; // Prevent double-click

  clickedCard.classList.add('flipped');
  clickedCard.style.color = ''; // Show value on flip

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
      alert('You win!');
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      firstCard.style.color = 'transparent';
      secondCard.style.color = 'transparent';
      resetSelection();
    }, 1000);
  }
}

// Reset selection
function resetSelection() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// Reset game
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
