// Número secreto entre 1 y 100
let secreto = Math.floor(Math.random() * 100) + 1;

// Variables del juego
let intentos = 0;
let historial = [];

// Elementos del HTML
const input = document.querySelector("#numero");
const boton = document.querySelector("#boton");
const mensaje = document.querySelector("#mensaje");
const contador = document.querySelector("#intentos");
const historialHTML = document.querySelector("#historial");
const nuevaPartida = document.querySelector("#nuevaPartida");

// Comprobar número
boton.addEventListener("click", function () {
  const numero = Number(input.value);

  // Validar el número
  if (input.value === "" || numero < 1 || numero > 100) {
    mensaje.textContent = "Introduce un número entre 1 y 100.";
    return;
  }

  // Registrar el intento
  intentos++;
  historial.push(numero);

  
  contador.textContent = intentos;
  historialHTML.textContent = `Has probado: ${historial.join(", ")}`;

  // Comparar con el número secreto
  if (numero === secreto) {
    mensaje.textContent = `¡Correcto! Has acertado en ${intentos} intentos.`;
    boton.disabled = true;
  } else if (numero < secreto) {
    mensaje.textContent = "El número secreto es mayor.";
  } else {
    mensaje.textContent = "El número secreto es menor.";
  }

  // Terminar tras siete intentos
  if (intentos === 7 && numero !== secreto) {
    mensaje.textContent = `Has agotado los 7 intentos. El número era ${secreto}.`;
    boton.disabled = true;
  }

  input.value = "";
  input.focus();
});

// Empezar una nueva partida
nuevaPartida.addEventListener("click", function () {
  secreto = Math.floor(Math.random() * 100) + 1;
  intentos = 0;
  historial = [];

  contador.textContent = "0";
  historialHTML.textContent = "";
  mensaje.textContent = "Nueva partida. ¡Adivina el número!";
  input.value = "";
  boton.disabled = false;
  input.focus();
});