// Variables de estado
let score = 0;
let timeLeft = 15;
let gameInterval = null;
let bugTimeout = null;
let bugType = 'normal'; // Guarda el tipo actual: 'normal', 'trap' o 'golden'

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
  statusMessage.textContent = '¡Caza los bugs 🐛! Ojo a los Dorados 🌟 y evita las Arañas 🕷️';

  startBtn.disabled = true;
  bugEl.classList.remove('hidden');

  moveBug();

  // Cuenta atrás global de la partida
  gameInterval = setInterval(updateTimer, 1000);
}

// Función para mover el bug y decidir qué tipo de insecto aparece
function moveBug() {
  // Cancelamos el temporizador de movimiento anterior
  clearTimeout(bugTimeout);

  const maxX = codeBoard.clientWidth - 40;
  const maxY = codeBoard.clientHeight - 40;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  bugEl.style.left = randomX + 'px';
  bugEl.style.top = randomY + 'px';

  // Reseteamos las clases especiales
  bugEl.classList.remove('bug-trap', 'golden-bug');

  // Probabilidades y tiempo de permanencia según el tipo
  const chance = Math.random();
  let duration = 1000; // Tiempo por defecto (1 segundo)

  if (chance < 0.10) {
    // 10% de probabilidad: Bug Dorado (Rápido y difícil)
    bugType = 'golden';
    bugEl.textContent = '🌟';
    bugEl.classList.add('golden-bug');
    duration = 500; // ¡Solo dura 0.5 segundos!

  } else if (chance < 0.30) {
    // 20% de probabilidad: Araña Trampa
    bugType = 'trap';
    bugEl.textContent = '🕷️';
    bugEl.classList.add('bug-trap');
    duration = 1000;

  } else {
    // 70% de probabilidad: Bug Normal
    bugType = 'normal';
    bugEl.textContent = '🐛';
    duration = 1000;
  }

  // Si no se pulsa en el tiempo indicado (duration), salta solo
  bugTimeout = setTimeout(moveBug, duration);
}

// Función al hacer clic en el elemento
function catchBug() {
  if (bugType === 'golden') {
    score = score + 3;
    statusMessage.textContent = '⚡ ¡RELEJO INCREÍBLE! Bug Dorado +3 Puntos';
  } else if (bugType === 'trap') {
    score = score - 2;
    statusMessage.textContent = '⚠️ ¡CAÍSTE EN LA TRAMPA! -2 Puntos';
  } else {
    score = score + 1;
    statusMessage.textContent = '🎯 ¡Bug cazado! +1 Punto';
  }

  scoreEl.textContent = score;
  moveBug(); // Salta de inmediato tras hacer clic
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
  clearInterval(gameInterval); // Detiene el reloj global
  clearTimeout(bugTimeout);    // Detiene el salto automático
  
  bugEl.classList.add('hidden');
  startBtn.disabled = false;
  statusMessage.textContent = '¡Fin del juego! Puntuación final: ' + score + ' puntos.';
}

// Escuchadores de eventos
startBtn.addEventListener('click', startGame);
bugEl.addEventListener('click', catchBug);