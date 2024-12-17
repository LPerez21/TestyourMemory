const grid = document.getElementById('grid');
const resetButton = document.getElementById('reset-button');

let totalTime = 0; // Variable to keep track of total time
let timerInterval; // Variable to hold the timer interval
let gameStarted = false; // Variable to check if the game has started

// Access the audio element
const bgMusic = document.getElementById('bg-music');

// Function to start the music
const startMusic = () => {
  bgMusic.play();
  bgMusic.loop = true; // Loop the music
};

// Function to stop the music
const stopMusic = () => {
  bgMusic.pause();
  bgMusic.currentTime = 0; // Reset to the beginning
};

// Function to start the game, timer and music
const startGame = () => {
  if (!gameStarted) { // Check if the game has already started
    gameStarted = true; // Set gameStarted to true
    totalTime = 0; // Reset the total time
    document.getElementById('timer').innerText = `⏱️: ${totalTime} sec`; // Reset timer display

    // Start the music
    startMusic();

    // Start the timer
    timerInterval = setInterval(() => {
      totalTime++; // Increment total time
      document.getElementById('timer').innerText = `⏱️: ${totalTime} sec`; // Update timer display
    }, 1000); // Update every second
  }
}

// Function to stop the timer (you can call this when the game ends)
const stopTimer = () => {
  clearInterval(timerInterval); // Stop the timer
  gameStarted = false;
  document.getElementById('timer').innerText = `⏱️: ${totalTime} sec`; // Reset timer display
  console.log(totalTime);
  localStorage.setItem('totalTime', totalTime);
};

const resetTimer = () => {
  totalTime = 0;
  clearInterval(timerInterval); // Stop the timer
  document.getElementById('timer').innerText = `⏱️: ${totalTime} sec`; // Reset timer display
}

// Array of card values (8 pairs of images)
const cardValues = [
  'assets/images/Snoopy.jpg', 'assets/images/Snoopy.jpg',
  'assets/images/Woodstock.jpg', 'assets/images/Woodstock.jpg',
  'assets/images/CharlieBrown.jpg', 'assets/images/CharlieBrown.jpg',
  'assets/images/Linus.jpg', 'assets/images/Linus.jpg',
  'assets/images/Lucy.jpg', 'assets/images/Lucy.jpg',
  'assets/images/sally.jpg', 'assets/images/sally.jpg',
  'assets/images/Franklin.jpg', 'assets/images/Franklin.jpg',
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
  startGame()
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
      alert(`You win! It took you ${totalTime} seconds!`)
      stopTimer()
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.style.backgroundImage = ''; 
      secondCard.style.backgroundImage =  '';
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
  resetTimer();

  // Stop the music
  stopMusic();
}

// Initialize game
resetButton.addEventListener('click', resetGame);
createCards();

