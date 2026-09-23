# 🐛 Caza al Bug
Misión M1 · El Despertar del DOM (Web Development I - U-tad).

## 🎮 Descripción del proyecto
"Caza al Bug" es una aplicación web sencilla e interactiva desarrollada con HTML5, CSS3 y JavaScript puro (vanilla JS, sin librerías externas). El usuario debe pulsar sobre un icono de un bug (🐛) que aparece en posiciones aleatorias dentro de un tablero de juego antes de que se agote un tiempo límite de 15 segundos.

---

## 🤖 Uso de IA

Conforme a las directrices de la asignatura, se ha utilizado **Gemini CLI** integrado en VS Code como asistente de programación durante el desarrollo del ejercicio.

* **Modo de trabajo utilizado:** Se trabajó de forma guiada por pasos y con confirmación manual de cambios (sin activar modos de aceptación automática).
* **Prompts principales utilizados:**
  1. *"Quiero seleccionar los elementos del DOM (#score, #timer, #bug, #startBtn) usando querySelector y escuchar los eventos de clic mediante addEventListener en lugar de utilizar onclick en HTML."*
  2. *"Cómo puedo calcular coordenadas aleatorias dentro de un div con Math.random() usando clientWidth y clientHeight."*
  3. *"Explícame cómo implementar una cuenta atrás con setInterval en JS y cómo detenerla con clearInterval al llegar a cero."*
* **Verificación manual realizada:**
  * Se comprobó el correcto funcionamiento y la respuesta al clic en el navegador utilizando la extensión Live Server.
  * Se verificó en la consola del navegador (F12) la ausencia de errores en la manipulación de variables y selección de elementos del DOM.
  * Se aseguró el cumplimiento de las buenas prácticas requeridas: ausencia de declaraciones con `var` y de gestores de eventos `onclick` inline en el archivo HTML.
* **Ajustes y código modificado a mano:**
  * Se ajustaron los límites de las coordenadas resta de margen (40px) en `Math.random()` para evitar que el elemento del bug se desborde fuera del borde visual del contenedor `#codeBoard`.
  * Se simplificó la lógica del juego eliminando temporizadores secundarios para mantener un código limpio, estructurado y fácil de defender.

---

## 🩺 Autopsia del código

A continuación se detallan las decisiones técnicas aplicadas en la implementación:

1. **Gestión de temporizadores asíncronos (`setInterval`):**
   * *Decisión:* Se utilizó un único intervalo (`setInterval`) para controlar el reloj descendente de 15 segundos.
   * *Justificación:* Mantiene la lógica temporal centralizada de forma sencilla. El intervalo se limpia explícitamente mediante `clearInterval(gameInterval)` dentro de la función `endGame()` al llegar a cero para evitar fugas de memoria y llamadas repetidas en segundo plano.

2. **Separación total de responsabilidades:**
   * *Decisión:* El archivo `index.html` contiene únicamente estructura semántica y carece de lógica o atributos de eventos inline (`onclick`). Toda la interacción se delega al archivo `app.js` mediante la función `addEventListener`.
   * *Justificación:* Facilita el mantenimiento, respeta los estándares web actuales y permite una explicación clara del flujo de ejecución ante una evaluación oral.

3. **Cálculo dinámico de coordenadas:**
   * *Decisión:* La posición del elemento `#bug` se calcula en tiempo de ejecución leyendo directamente las propiedades `clientWidth` y `clientHeight` del contenedor padre (`#codeBoard`).
   * *Justificación:* Garantiza que el juego se adapte dinámicamente al espacio disponible sin necesidad de fijar posiciones estáticas en el código.