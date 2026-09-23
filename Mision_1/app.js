// Variables de estado
let score = 0;
let timeLeft = 15;
let gameInterval = null;

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
  statusMessage.textContent = '¡El juego ha comenzado!';

  startBtn.disabled = true; // Desactivamos el botón mientras se juega
  bugEl.classList.remove('hidden'); // Mostramos el bug

  moveBug();

  // Cuenta atrás cada 1 segundo
  gameInterval = setInterval(updateTimer, 1000);
}

// Función para mover el bug a una posición aleatoria
function moveBug() {
  const maxX = codeBoard.clientWidth - 40;
  const maxY = codeBoard.clientHeight - 40;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  bugEl.style.left = randomX + 'px';
  bugEl.style.top = randomY + 'px';
}

// Función al hacer clic en el bug
function catchBug() {
  score = score + 1;
  scoreEl.textContent = score;
  moveBug(); // Se mueve inmediatamente a otro lado
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
  startBtn.disabled = false; // Activamos el botón otra vez
  statusMessage.textContent = '¡Fin del juego! Conseguiste ' + score + ' puntos.';
}

// Escuchadores de eventos (sin inline en HTML)
startBtn.addEventListener('click', startGame);
bugEl.addEventListener('click', catchBug);