// --- ESTADO DEL JUEGO ---
let score = 0;
let timeLeft = 30;
let gameInterval = null;
let bugTimeout = null;
let highScore = 0;
let isPlaying = false;

// --- ELEMENTOS DEL DOM ---
const scoreEl = document.querySelector('#score');
const timerEl = document.querySelector('#timer');
const highScoreEl = document.querySelector('#highScore');
const bugEl = document.querySelector('#bug');
const startBtn = document.querySelector('#startBtn');
const startOverlay = document.querySelector('#startOverlay');
const codeBoard = document.querySelector('#codeBoard');
const statusMessage = document.querySelector('#statusMessage');

// --- INICIAR JUEGO ---
function startGame() {
  score = 0;
  timeLeft = 30;
  isPlaying = true;

  scoreEl.textContent = '0';
  timerEl.textContent = `${timeLeft}s`;
  statusMessage.textContent = '¡Caza todos los bugs que puedas!';

  startOverlay.classList.add('hidden');
  bugEl.classList.remove('hidden');

  // Mover el primer bug y arrancar temporizador
  moveBug();
  gameInterval = setInterval(updateTimer, 1000);
}

// --- MOVER BUG A POSICIÓN ALEATORIA ---
function moveBug() {
  if (!isPlaying) return;

  // Obtener dimensiones del tablero
  const boardWidth = codeBoard.clientWidth - 50;
  const boardHeight = codeBoard.clientHeight - 50;

  // Coordenadas aleatorias dentro del área
  const randomX = Math.max(10, Math.floor(Math.random() * boardWidth));
  const randomY = Math.max(10, Math.floor(Math.random() * boardHeight));

  bugEl.style.left = `${randomX}px`;
  bugEl.style.top = `${randomY}px`;

  // Cambiar posición automáticamente tras un tiempo si no se le hace clic
  clearTimeout(bugTimeout);
  bugTimeout = setTimeout(moveBug, 1200); 
}

// --- EVENTO DE CAZAR BUG ---
function catchBug() {
  if (!isPlaying) return;

  score += 10;
  scoreEl.textContent = String(score);
  statusMessage.textContent = '⚡ ¡Bug cazado (+10 pts)!';

  // Reposicionar inmediatamente tras cazarlo
  moveBug();
}

// --- ACTUALIZAR TEMPORIZADOR ---
function updateTimer() {
  timeLeft--;
  timerEl.textContent = `${timeLeft}s`;

  if (timeLeft <= 0) {
    endGame();
  }
}

// --- FIN DEL JUEGO ---
function endGame() {
  isPlaying = false;
  clearInterval(gameInterval);
  clearTimeout(bugTimeout);

  bugEl.classList.add('hidden');
  startOverlay.classList.remove('hidden');

  if (score > highScore) {
    highScore = score;
    highScoreEl.textContent = String(highScore);
    statusMessage.textContent = `🎉 ¡NUEVO RÉCORD! Has conseguido ${score} puntos.`;
  } else {
    statusMessage.textContent = `Fin de la partida. Puntuación: ${score} pts.`;
  }
}

// --- EVENT LISTENERS (Sin inline handlers) ---
startBtn.addEventListener('click', startGame);
bugEl.addEventListener('click', catchBug);

// --- BONUS M1: TECLA SECRETA "N" PARA MODO NOCTURNO MATRIX ---
document.addEventListener('keydown', (e) => {
  if (e.key === 'n' || e.key === 'N') {
    document.body.classList.toggle('dark-mode');
  }
});