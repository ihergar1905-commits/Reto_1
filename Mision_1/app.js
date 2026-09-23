// Variables de estado
let score = 0;
let timeLeft = 15;
let gameInterval = null;
let isGolden = false; // <-- NUEVO: Controla si el bug actual es dorado

// Selección de elementos del DOM
const scoreEl = document.querySelector('#score');
const timerEl = document.querySelector('#timer');
const bugEl = document.querySelector('#bug');
const startBtn = document.querySelector('#startBtn');
const codeBoard = document.querySelector('#codeBoard');
const statusMessage = document.querySelector('#statusMessage');

// Función para iniciar el juego
function startGame() {
  score = 0;
  timeLeft = 15;

  scoreEl.textContent = score;
  timerEl.textContent = timeLeft;
  statusMessage.textContent = '¡Juego iniciado! Caza los bugs 🐛 (¡Ojo a los dorados 🌟!)';

  startBtn.disabled = true;
  bugEl.classList.remove('hidden');

  moveBug();

  gameInterval = setInterval(updateTimer, 1000);
}

// Función para mover el bug y decidir si es dorado
function moveBug() {
  const maxX = codeBoard.clientWidth - 40;
  const maxY = codeBoard.clientHeight - 40;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  bugEl.style.left = randomX + 'px';
  bugEl.style.top = randomY + 'px';

  // <-- NUEVO: Probabilidad del 20% de que salga el Bug Dorado
  if (Math.random() < 0.2) {
    isGolden = true;
    bugEl.textContent = '🌟';
    bugEl.classList.add('golden-bug');
  } else {
    isGolden = false;
    bugEl.textContent = '🐛';
    bugEl.classList.remove('golden-bug');
  }
}

// Función al hacer clic en el bug
function catchBug() {
  // <-- NUEVO: Si es dorado suma 3 puntos, si no suma 1
  if (isGolden) {
    score = score + 3;
    statusMessage.textContent = '⚡ ¡BUG DORADO CAZADO! +3 Puntos';
  } else {
    score = score + 1;
    statusMessage.textContent = '🎯 ¡Bug cazado! +1 Punto';
  }

  scoreEl.textContent = score;
  moveBug();
}

// Función para actualizar la cuenta atrás
function updateTimer() {
  timeLeft = timeLeft - 1;
  timerEl.textContent = timeLeft;

  if (timeLeft <= 0) {
    endGame();
  }
}

// Función al terminar el juego
function endGame() {
  clearInterval(gameInterval);
  bugEl.classList.add('hidden');
  startBtn.disabled = false;
  statusMessage.textContent = '¡Fin del juego! Conseguiste ' + score + ' puntos.';
}

// Escuchadores de eventos
startBtn.addEventListener('click', startGame);
bugEl.addEventListener('click', catchBug);