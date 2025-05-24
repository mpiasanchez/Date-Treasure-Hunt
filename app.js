// app.js - Main logic for Date Treasure Hunt
let clues = [];
let current = 0;
let solved = 0; // Number of clues solved (progress)
const clueScreen = document.getElementById('clue-screen');
const welcomeScreen = document.getElementById('welcome-screen');
const completeScreen = document.getElementById('complete-screen');
const clueText = document.getElementById('clue-text');
const answerInput = document.getElementById('answer-input');
const unlockBtn = document.getElementById('unlock-btn');
const feedback = document.getElementById('feedback');
const clueProgress = document.getElementById('clue-progress');
const startBtn = document.getElementById('start-btn');
const revealContainer = document.getElementById('reveal-container');
const revealText = document.getElementById('reveal-text');
const continueBtn = document.getElementById('continue-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function saveProgress() {
  localStorage.setItem('dth-progress', solved);
}

function loadProgress() {
  solved = Number(localStorage.getItem('dth-progress')) || 0;
}

function showScreen(id) {
  document.getElementById('welcome-screen').classList.add('hidden');
  document.getElementById('clue-screen').classList.add('hidden');
  document.getElementById('complete-screen').classList.add('hidden');
  document.getElementById(id).classList.remove('hidden');
}

function loadClue(idx = current) {
  if (idx >= clues.length) {
    showScreen('complete-screen');
    localStorage.removeItem('dth-progress');
    return;
  }
  current = idx;
  clueProgress.textContent = `Pista ${current + 1} de ${clues.length}`;
  clueText.textContent = clues[current].riddle;
  answerInput.value = '';
  feedback.textContent = '';
  // Show reveal if solved, else hide
  if (current < solved) {
    revealText.textContent = clues[current].reveal;
    revealContainer.classList.remove('hidden');
    answerInput.classList.add('hidden');
    unlockBtn.classList.add('hidden');
  } else {
    revealContainer.classList.add('hidden');
    answerInput.classList.remove('hidden');
    unlockBtn.classList.remove('hidden');
  }
  // Navigation buttons
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current + 1 > solved;
  showScreen('clue-screen');
}

startBtn.onclick = () => {
  loadProgress();
  loadClue();
};

unlockBtn.onclick = () => {
  const input = answerInput.value.trim().toLowerCase();
  if (input === clues[current].answer.toLowerCase()) {
    if (current === solved) {
      solved++;
      saveProgress();
    }
    revealText.textContent = clues[current].reveal;
    revealContainer.classList.remove('hidden');
    answerInput.classList.add('hidden');
    unlockBtn.classList.add('hidden');
    feedback.textContent = '';
  } else {
    feedback.textContent = '¡Intenta de nuevo! 💛';
  }
};

continueBtn.onclick = () => {
  if (current + 1 < clues.length) {
    loadClue(current + 1);
  } else {
    showScreen('complete-screen');
    localStorage.removeItem('dth-progress');
  }
};

prevBtn.onclick = () => {
  if (current > 0) loadClue(current - 1);
};

nextBtn.onclick = () => {
  if (current + 1 <= solved) loadClue(current + 1);
};

window.onload = async () => {
  const res = await fetch('clues.json');
  clues = await res.json();
  loadProgress();
  if (solved > 0) {
    loadClue(solved === clues.length ? clues.length - 1 : solved);
  }
  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }
};
