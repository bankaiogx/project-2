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
