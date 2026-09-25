# 🐛 Caza al Bug
Misión M1 · El Despertar del DOM (Web Development I - U-tad).

## 🎮 Descripción del proyecto
"Caza al Bug" es una aplicación web interactiva desarrollada con HTML5, CSS3 y JavaScript puro (vanilla JS). El usuario debe eliminar los bugs (🐛) que aparecen en el tablero dentro de un límite de tiempo de 15 segundos. 

Como elemento de **originalidad y dinamismo**, el juego incluye un sistema de probabilidades con tres tipos de objetivos:
* **Bug Normal (🐛):** Aparece con mayor frecuencia (70%) y suma **+1 Punto**.
* **Araña Trampa (🕷️):** Aparece un 20% de las veces y resta **-2 Puntos** si se pulsa por error.
* **Bug Dorado / Épico (🌟):** Aparece raramente (10%) y otorga **+3 Puntos**, pero requiere grandes reflejos ya que solo permanece **0.5 segundos** en pantalla antes de desaparecer.

### ★ BONUS: Modo Oscuro (Easter Egg)
Se ha implementado una característica secreta para personalizar la experiencia visual:
* Al pulsar la tecla **`D`** en el teclado, se activa o desactiva de forma dinámica el **Modo Oscuro** en toda la aplicación.
* Un mensaje informativo en pantalla (`#themeNotice`) actualiza su texto en tiempo real indicando si la función está activa o cómo desbloquearla.

---

## 🤖 Uso de IA

Conforme a las directrices de la asignatura, se ha utilizado **Gemini CLI** integrado en VS Code como asistente de programación durante el desarrollo de la práctica.

* **Modo de trabajo utilizado:** Trabajo guiado mediante instrucciones por pasos, análisis detallado del código y confirmación manual de cambios.
* **Prompts principales utilizados:**
  1. *"Quiero seleccionar los elementos del DOM (#score, #timer, #bug, #startBtn) usando querySelector y escuchar los eventos de clic mediante addEventListener sin eventos inline en HTML."*
  2. *"Cómo calcular coordenadas aleatorias dentro de un contenedor usando clientWidth y clientHeight con Math.random()."*
  3. *"Propón una lógica simple con Math.random() para alternar entre tres tipos de objetivos con diferentes puntuaciones, estilos y tiempos de permanencia."*
  4. *"Cómo implementar un setTimeout dinámico para que el bug cambie de posición automáticamente si el usuario decide no hacer clic."*
  5. *"Cómo añadir un modo oscuro que se active globalmente con la tecla 'D' usando addEventListener('keydown') y classList.toggle()."*
* **Verificación manual realizada:**
  * Se comprobó el correcto funcionamiento en el navegador a través de Live Server.
  * Se inspeccionó la consola del navegador (F12) confirmando la ausencia de errores en la manipulación del DOM y la correcta limpieza de temporizadores (`clearInterval` y `clearTimeout`).
  * Se aseguró el cumplimiento de buenas prácticas: ausencia de variables declaradas con `var` y separación completa entre estructura (HTML), estilos (CSS) y comportamiento (JS).

---

## 🩺 Autopsia del código

A continuación se detallan las decisiones técnicas aplicadas en la implementación:

1. **Gestión de temporizadores asíncronos (`setInterval` y `setTimeout`):**
   * *Decisión:* Se utiliza un `setInterval` global de 1 segundo (`gameInterval`) para la cuenta atrás de la partida y un `setTimeout` dinámico (`bugTimeout`) para el movimiento automático del bug.
   * *Justificación:* Al incluir objetivos trampa que el usuario prefiere no pulsar, el `setTimeout` garantiza que el tablero continúe en movimiento. `clearTimeout(bugTimeout)` se ejecuta tanto al inicio de cada salto en `moveBug()` (para evitar solapamientos si el usuario hace clics rápidos) como en `endGame()`, garantizando la prevención de fugas de memoria y acumulaciones asíncronas.

2. **Lógica condicional de probabilidad y velocidad variable:**
   * *Decisión:* En la función `moveBug()`, un valor aleatorio generado con `Math.random()` determina la categoría del objetivo:
     * `chance < 0.10`: Bug Dorado (`🌟`, 500 ms de duración).
     * `chance < 0.30`: Araña Trampa (`🕷️`, 1000 ms de duración).
     * Resto: Bug Normal (`🐛`, 1000 ms de duración).
   * *Justificación:* Permite implementar una mecánica de riesgo/recompensa y dificultad adaptativa de forma muy eficiente, modificando únicamente la variable `duration` consumida por el temporizador.

3. **Manipulación eficiente del DOM y detección de eventos de teclado (Bonus):**
   * *Decisión:* Se utiliza `textContent` en lugar de `innerHTML` para actualizar puntuaciones, tiempo y avisos. Además, se añade un escuchador de teclado global (`document.addEventListener('keydown', ...)`) que evalúa `event.key.toLowerCase() === 'd'` y aplica `classList.toggle('dark-mode')` sobre `document.body`.
   * *Justificación:* Es una práctica segura (previene vulnerabilidades XSS) y con mejor rendimiento. El uso de `.toggle()` en el `body` permite cambiar la paleta completa de la interfaz con una única regla CSS sin duplicar código ni alterar la estructura HTML.

4. **Separación de responsabilidades y accesibilidad:**
   * *Decisión:* El archivo HTML no incluye funciones inline (`onclick`). Toda la interactividad se vincula desde `app.js` mediante `addEventListener` pasando referencias callback sin paréntesis (ej. `startBtn.addEventListener('click', startGame)`).
   * *Justificación:* Mantiene un código limpio, legible y fácil de mantener, respetando la separación entre la capa de presentación y la capa de lógica.