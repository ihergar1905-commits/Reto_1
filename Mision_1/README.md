# 🐛 Caza al Bug
Misión M1 · El Despertar del DOM (Web Development I - U-tad).

## 🎮 Descripción del proyecto
"Caza al Bug" es una aplicación web interactiva desarrollada con HTML5, CSS3 y JavaScript puro (vanilla JS). El usuario debe eliminar los bugs (🐛) que aparecen en el tablero dentro de un límite de tiempo de 15 segundos. 

Como elemento de **originalidad y dinamismo**, el juego incluye un sistema de probabilidades con tres tipos de objetivos:
* **Bug Normal (🐛):** Aparece con mayor frecuencia (70%) y suma **+1 Punto**.
* **Araña Trampa (🕷️):** Aparece un 20% de las veces y resta **-2 Puntos** si se pulsa por error.
* **Bug Dorado / Épico (🌟):** Aparece raramente (10%) y otorga **+3 Puntos**, pero requiere grandes reflejos ya que solo permanece **0.5 segundos** en pantalla antes de desaparecer.

---

## 🤖 Uso de IA

Conforme a las directrices de la asignatura, se ha utilizado **Gemini CLI** integrado en VS Code como asistente de programación durante el desarrollo de la práctica.

* **Modo de trabajo utilizado:** Trabajo guiado mediante instrucciones por pasos, análisis detallado del código y confirmación manual de cambios.
* **Prompts principales utilizados:**
  1. *"Quiero seleccionar los elementos del DOM (#score, #timer, #bug, #startBtn) usando querySelector y escuchar los eventos de clic mediante addEventListener sin eventos inline en HTML."*
  2. *"Cómo calcular coordenadas aleatorias dentro de un contenedor usando clientWidth y clientHeight con Math.random()."*
  3. *"Propón una lógica simple con Math.random() para alternar entre tres tipos de objetivos con diferentes puntuaciones, estilos y tiempos de permanencia."*
  4. *"Cómo implementar un setTimeout dinámico para que el bug cambie de posición automáticamente si el usuario decide no hacer clic."*
* **Verificación manual realizada:**
  * Se comprobó el correcto funcionamiento en el navegador a través de Live Server.
  * Se inspeccionó la consola del navegador (F12) confirmando la ausencia de errores en la manipulación del DOM y la correcta limpieza de temporizadores (`clearInterval` y `clearTimeout`).
  * Se aseguró el cumplimiento de buenas prácticas: ausencia de variables declaradas con `var` y separación completa entre estructura (HTML), estilos (CSS) y comportamiento (JS).

---

## 🩺 Autopsia del código

A continuación se detallan las decisiones técnicas aplicadas en la implementación:

1. **Gestión de temporizadores asíncronos (`setInterval` y `setTimeout`):**
   * *Decisión:* Se utiliza un `setInterval` global de 1 segundo para el reloj de la partida y un `setTimeout` dinámico (`bugTimeout`) para el movimiento automático de los bugs.
   * *Justificación:* Al incluir objetivos trampa que el usuario prefiere no pulsar, el `setTimeout` garantiza que el tablero continúe en movimiento sin quedarse congelado. Ambas funciones asíncronas se limpian explícitamente en `endGame()` con `clearInterval` y `clearTimeout` para prevenir fugas de memoria.

2. **Lógica condicional de probabilidad y velocidad variable:**
   * *Decisión:* En la función `moveBug()`, un valor aleatorio generado con `Math.random()` determina la categoría del objetivo:
     * `chance < 0.10`: Bug Dorado (`🌟`, 500 ms de duración).
     * `chance < 0.30`: Araña Trampa (`🕷️`, 1000 ms de duración).
     * Resto: Bug Normal (`🐛`, 1000 ms de duración).
   * *Justificación:* Permite implementar una mecánica de riesgo/recompensa y dificultad adaptativa de forma muy eficiente, modificando únicamente la variable `duration` consumida por el temporizador.

3. **Separación de responsabilidades y accesibilidad:**
   * *Decisión:* El archivo HTML no incluye funciones inline (`onclick`). Toda la interactividad se vincula desde `app.js` mediante `addEventListener`.
   * *Justificación:* Mantiene un código limpio, legible y fácil de mantener, respetando la separación entre la capa de presentación y la capa de lógica.