// Variables de estado
let score = 0;
let timeLeft = 15;
let gameInterval = null;
let isTrap = false; // Controla si el icono actual es una trampa

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
  statusMessage.textContent = '¡Caza los bugs 🐛! ¡Cuidado con las arañas trampa 🕷️!';

  startBtn.disabled = true; // Desactivamos el botón de inicio
  bugEl.classList.remove('hidden'); // Mostramos el bug

  moveBug();

  // Cuenta atrás cada 1 segundo
  gameInterval = setInterval(updateTimer, 1000);
}

// Función para mover el bug y decidir si es trampa
function moveBug() {
  const maxX = codeBoard.clientWidth - 40;
  const maxY = codeBoard.clientHeight - 40;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  bugEl.style.left = randomX + 'px';
  bugEl.style.top = randomY + 'px';

  // Probabilidad del 20% de que sea una trampa
  if (Math.random() < 0.2) {
    isTrap = true;
    bugEl.textContent = '🕷️';
    bugEl.classList.add('bug-trap');
  } else {
    isTrap = false;
    bugEl.textContent = '🐛';
    bugEl.classList.remove('bug-trap');
  }
}

// Función al hacer clic en el elemento
function catchBug() {
  if (isTrap) {
    score = score - 2; // Resta puntos si es trampa
    statusMessage.textContent = '⚠️ ¡PULSASTE UNA TRAMPA! -2 Puntos';
  } else {
    score = score + 1; // Suma puntos si es el bug normal
    statusMessage.textContent = '🎯 ¡Bug cazado! +1 Punto';
  }

  scoreEl.textContent = score;
  moveBug(); // Se reubica en otra posición
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
  clearInterval(gameInterval); // Detenemos el reloj
  bugEl.classList.add('hidden'); // Ocultamos el bug
  startBtn.disabled = false; // Activamos el botón de inicio
  statusMessage.textContent = '¡Fin del juego! Puntuación final: ' + score + ' puntos.';
}

// Escuchadores de eventos (sin inline en HTML)
startBtn.addEventListener('click', startGame);
bugEl.addEventListener('click', catchBug);