// --- ESTADO DEL JUEGO ---
let secret = 0;
let maxRange = 50;
let attempts = 0;
let history = [];
let isGameOver = false;
let bestScore = null;

// --- ELEMENTOS DEL DOM ---
const guessInput = document.querySelector('#guessInput');
const castBtn = document.querySelector('#castBtn');
const restartBtn = document.querySelector('#restartBtn');
const errorMsg = document.querySelector('#errorMsg');
const oracleSpeech = document.querySelector('#oracleSpeech');
const oracleAvatar = document.querySelector('#oracleAvatar');
const attemptsCount = document.querySelector('#attemptsCount');
const proximityText = document.querySelector('#proximityText');
const bestScoreText = document.querySelector('#bestScoreText');
const historyList = document.querySelector('#historyList');
const diffButtons = document.querySelectorAll('.btn-diff');

// --- INICIALIZACIÓN ---
function initGame() {
  secret = Math.floor(Math.random() * maxRange) + 1;
  attempts = 0;
  history = [];
  isGameOver = false;

  // Reset de la UI
  attemptsCount.textContent = '0';
  proximityText.textContent = 'En reposo';
  errorMsg.textContent = '';
  oracleSpeech.textContent = `"He guardado un nuevo secreto entre 1 y ${maxRange}. ¡Adivínalo si puedes!"`;
  oracleAvatar.textContent = '🧙‍♂️';
  
  guessInput.value = '';
  guessInput.max = maxRange;
  guessInput.disabled = false;
  castBtn.disabled = false;

  renderHistory();
}

// --- LÓGICA DE PROXIMIDAD (CALIENTE / FRÍO) ---
function calculateProximity(guess) {
  const diff = Math.abs(guess - secret);
  const percentage = diff / maxRange;

  if (percentage <= 0.05) return { text: '🔥 Hirviendo', color: '#ef4444' };
  if (percentage <= 0.15) return { text: '☀️ Caliente', color: '#f59e0b' };
  if (percentage <= 0.30) return { text: '🌤️ Tibio', color: '#eab308' };
  return { text: '❄️ Congelado', color: '#3b82f6' };
}

// --- MANEJO DE INTENTOS ---
function handleGuess() {
  if (isGameOver) return;

  const rawValue = guessInput.value;
  const numValue = Number(rawValue);

  // Validación
  if (rawValue.trim() === '' || isNaN(numValue)) {
    errorMsg.textContent = '⚠️ Escribe un número válido antes de lanzar el conjuro.';
    return;
  }

  if (numValue < 1 || numValue > maxRange) {
    errorMsg.textContent = `⚠️ El número debe estar entre 1 y ${maxRange}.`;
    return;
  }

  // Si pasa la validación, limpiamos el error
  errorMsg.textContent = '';
  attempts++;
  attemptsCount.textContent = String(attempts);

  // Comparación
  if (numValue === secret) {
    handleWin();
  } else {
    const proximity = calculateProximity(numValue);
    proximityText.textContent = proximity.text;

    if (numValue < secret) {
      oracleSpeech.textContent = `🔮 "El número místico es MAYOR que ${numValue}."`;
      oracleAvatar.textContent = '🔮';
      history.push({ val: numValue, type: 'low', label: `${numValue} ⬆️` });
    } else {
      oracleSpeech.textContent = `🔮 "El número místico es MENOR que ${numValue}."`;
      oracleAvatar.textContent = '🔮';
      history.push({ val: numValue, type: 'high', label: `${numValue} ⬇️` });
    }
    renderHistory();
  }

  guessInput.value = '';
  guessInput.focus();
}

// --- MANEJO DE VICTORIA ---
function handleWin() {
  isGameOver = true;
  guessInput.disabled = true;
  castBtn.disabled = true;

  oracleAvatar.textContent = '👑';
  oracleSpeech.textContent = `🎉 ¡INCREÍBLE! Has descubierto el número ${secret} en ${attempts} intentos.`;
  proximityText.textContent = '🎯 ¡Acertado!';

  history.push({ val: secret, type: 'win', label: `${secret} 🏆` });
  renderHistory();

  // Guardar récord
  if (bestScore === null || attempts < bestScore) {
    bestScore = attempts;
    bestScoreText.textContent = `${bestScore} int.`;
  }
}

// --- RENDERIZADO DEL HISTORIAL ---
function renderHistory() {
  if (history.length === 0) {
    historyList.innerHTML = '<span class="empty-history">Aún no has lanzado ningún conjuro...</span>';
    return;
  }

  // Usamos textContent a través de fragmentos o chips dinámicos seguros
  historyList.innerHTML = '';
  history.forEach((item) => {
    const chip = document.createElement('span');
    chip.className = `chip ${item.type}`;
    chip.textContent = item.label;
    historyList.appendChild(chip);
  });
}

// --- EVENT LISTENERS (Sin inline handlers) ---
castBtn.addEventListener('click', handleGuess);

// Permitir lanzar conjuro pulsando Enter
guessInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    handleGuess();
  }
});

restartBtn.addEventListener('click', initGame);

// Cambio de Dificultad
diffButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    diffButtons.forEach((b) => b.classList.remove('active'));
    e.target.classList.add('active');
    maxRange = Number(e.target.dataset.max);
    initGame();
  });
});

// --- BONUS DE LA MISIÓN: MODO NOCTURNO CON TECLA SECRET "N" ---
document.addEventListener('keydown', (e) => {
  if (e.key === 'n' || e.key === 'N') {
    // Evita activar si se está escribiendo dentro del input
    if (document.activeElement === guessInput) return;
    document.body.classList.toggle('dark-mode');
  }
});

// Arranque inicial
initGame();