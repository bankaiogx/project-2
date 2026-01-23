// Game variables
let sequence = [];
let playerSequence = [];
let round = 0;
let isComputerPlaying = false;
let isGameActive = false;

// DOM elements
const pads = Array.from(document.querySelectorAll(".pad"));
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const messageEl = document.getElementById("message");
const roundEl = document.getElementById("round");
const bestScoreEl = document.getElementById("bestScore");
const difficultyEl = document.getElementById("difficulty");

// Difficulty timing
function getStepDelay() {
  let value = "medium";

  if (difficultyEl && difficultyEl.value) {
    value = difficultyEl.value;
  }

  if (value === "easy") {
    return 1000;
  }

  if (value === "hard") {
    return 350;
  }

  return 700; // medium default
}

// Utility UI helpers
function setMessage(text) {
  if (messageEl) messageEl.textContent = text;
}

function setRound(value) {
  if (roundEl) roundEl.textContent = String(value);
}

function setBest(value) {
  if (bestScoreEl) bestScoreEl.textContent = String(value);
}

function setPadsEnabled(enabled) {
  pads.forEach((pad) => {
    pad.disabled = !enabled;
    pad.setAttribute("aria-disabled", String(!enabled));
  });
}

// Visual feedback: flash a pad
function flashPad(pad) {
  if (!pad) return;
  pad.classList.add("active");
  setTimeout(() => {
    pad.classList.remove("active");
  }, 300);
}

// Best score (stored locally)
const BEST_SCORE_KEY = "sequenceTrainerBestScore";
const savedBest = Number(localStorage.getItem(BEST_SCORE_KEY)) || 0;
setBest(savedBest);

function updateBestScoreIfNeeded() {
  const currentBest = Number(localStorage.getItem(BEST_SCORE_KEY)) || 0;
  if (round > currentBest) {
    localStorage.setItem(BEST_SCORE_KEY, String(round));
    setBest(round);
  }
}

function gameOver() {
  updateBestScoreIfNeeded();
  isGameActive = false;
  isComputerPlaying = false;
  setPadsEnabled(false);
  setMessage("Game over. Press Start to try again.");
}

function handlePadClick(pad) {
  if (!isGameActive || isComputerPlaying) return;

  flashPad(pad);

  // Track and check the player's input against the sequence
  playerSequence.push(pad);
  const currentIndex = playerSequence.length - 1;

  if (pad !== sequence[currentIndex]) {
    gameOver();
    return;
  }

  // If the player completed the full sequence, start the next round
  if (playerSequence.length === sequence.length) {
    setMessage("Nice! Next round...");
    setPadsEnabled(false);
    setTimeout(() => {
      computerTurn();
    }, 700);
  }
}

// Pad click listeners
pads.forEach((pad) => {
  pad.addEventListener("click", () => handlePadClick(pad));
});

// Start button logic
if (startBtn) {
  startBtn.addEventListener("click", () => {
    // Reset game state
    sequence = [];
    playerSequence = [];
    round = 0;
    isGameActive = true;
    isComputerPlaying = false;

    // Update UI
    setRound(round);
    setMessage("Watch the sequence...");
    setPadsEnabled(false);

    computerTurn();
  });
}

// Restart button logic (basic reset)
if (restartBtn) {
  restartBtn.addEventListener("click", () => {
    sequence = [];
    playerSequence = [];
    round = 0;
    isGameActive = false;
    isComputerPlaying = false;
    setRound(round);
    setMessage("Click Start to begin.");
    setPadsEnabled(false);
  });
}

// Computer turn: add a random pad and play the full sequence
function computerTurn() {
  if (!isGameActive) return;

  isComputerPlaying = true;
  setPadsEnabled(false);
  setMessage("Watch the sequence...");

  // Reset player input for the new round
  playerSequence = [];

  // Choose a random pad and add it to the sequence
  const randomPad = pads[Math.floor(Math.random() * pads.length)];
  sequence.push(randomPad);

  // Update round
  round += 1;
  setRound(round);

  // Play back the full sequence
  const stepDelay = getStepDelay();
  sequence.forEach((pad, index) => {
    setTimeout(() => {
      flashPad(pad);

      // End of playback: hand control to the player
      if (index === sequence.length - 1) {
        isComputerPlaying = false;
        setPadsEnabled(true);
        setMessage("Your turn");
      }
    }, stepDelay * (index + 1));
  });
}

// Initial UI state
setPadsEnabled(false);
