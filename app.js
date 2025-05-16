// app.js - Main logic for Date Treasure Hunt
let clues = [];
let current = 0;
const clueScreen = document.getElementById('clue-screen');
const welcomeScreen = document.getElementById('welcome-screen');
const completeScreen = document.getElementById('complete-screen');
const clueText = document.getElementById('clue-text');
const answerInput = document.getElementById('answer-input');
const unlockBtn = document.getElementById('unlock-btn');
const feedback = document.getElementById('feedback');
const clueProgress = document.getElementById('clue-progress');
const startBtn = document.getElementById('start-btn');

function showScreen(id) {
  document.getElementById('welcome-screen').classList.add('hidden');
  document.getElementById('clue-screen').classList.add('hidden');
  document.getElementById('complete-screen').classList.add('hidden');
  document.getElementById(id).classList.remove('hidden');
}

function loadClue() {
  if (current >= clues.length) {
    showScreen('complete-screen');
    localStorage.removeItem('dth-progress');
    return;
  }
  document.getElementById('clue-progress').textContent = `Pista ${current + 1} de ${clues.length}`;
  document.getElementById('clue-text').textContent = clues[current].riddle;
  document.getElementById('answer-input').value = '';
  document.getElementById('feedback').textContent = '';
  showScreen('clue-screen');
}

document.getElementById('start-btn').onclick = () => {
  current = Number(localStorage.getItem('dth-progress')) || 0;
  loadClue();
};

document.getElementById('unlock-btn').onclick = () => {
  const input = document.getElementById('answer-input').value.trim().toLowerCase();
  if (input === clues[current].answer.toLowerCase()) {
    current++;
    localStorage.setItem('dth-progress', current);
    loadClue();
  } else {
    document.getElementById('feedback').textContent = '¡Intenta de nuevo! 💛';
  }
};

window.onload = async () => {
  const res = await fetch('clues.json');
  clues = await res.json();
  if (localStorage.getItem('dth-progress')) {
    current = Number(localStorage.getItem('dth-progress'));
    loadClue();
  }
  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }
};
