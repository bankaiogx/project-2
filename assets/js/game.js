// game variables 
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

// Pad click listeners (basic interaction)
pads.forEach((pad) => {
  pad.addEventListener("click", () => {
    if (!isGameActive || isComputerPlaying) return;
    flashPad(pad);
  });
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
  });
}
