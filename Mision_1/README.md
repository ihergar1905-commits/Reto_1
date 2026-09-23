# 🐛 Caza al Bug
Misión M1 · El Despertar del DOM (Web Development I - U-tad).

## 🎮 Descripción del proyecto
"Caza al Bug" es una página web interactiva desarrollada con HTML5, CSS3 y JavaScript puro (sin librerías externas)[cite: 8]. El usuario asume el rol de un desarrollador que debe depurar un sistema eliminando errores cibernéticos (bugs 🐛) en un tablero dentro de un límite de tiempo de 30 segundos.

---

## 🤖 Uso de IA

Conforme a las directrices de la asignatura, se ha utilizado **Gemini CLI** integrado en VS Code como asistente y pareja de programación durante el desarrollo del ejercicio[cite: 8].

* **Modo de trabajo utilizado:** Se trabajó paso a paso por fases y con confirmación manual de cambios (sin activar el modo automático de aceptación "YOLO")[cite: 8].
* **Prompts principales utilizados:**
  1. *"Quiero declarar las constantes para seleccionar los elementos del DOM (#score, #timer, #bug, #startBtn) usando querySelector y escuchar los eventos de clic sin usar atributos inline."*[cite: 8]
  2. *"Propón una función en JS para mover el botón del bug a posiciones aleatorias dentro del contenedor #codeBoard sin que se salga de los límites visuales."*[cite: 8]
  3. *"Explícame cómo implementar la cuenta atrás con setInterval y cómo limpiar el temporizador con clearInterval al llegar a cero para evitar fugas de memoria."*[cite: 8]
* **Verificación manual realizada:**
  * Se probó el comportamiento en el navegador mediante Live Server para comprobar la correcta reubicación del elemento en pantalla[cite: 8].
  * Se validó en la consola (F12) que no quedaran intervalos activos en segundo plano tras finalizar la partida.
  * Se comprobó la ausencia de declaraciones `var` y de gestores de eventos `onclick` inline en el HTML[cite: 8].
* **Ajustes y código modificado a mano:**
  * Se ajustaron los cálculos de `clientWidth` y `clientHeight` para restar el margen del icono y evitar desbordamientos en pantallas pequeñas.
  * Se implementó a mano el detector del evento `keydown` para la tecla **`N`** (Modo Nocturno / Matrix) garantizando el cumplimiento del bonus de la M1[cite: 8].

---

## 🩺 Autopsia del código

A continuación se detallan las decisiones técnicas tomadas en el diseño e implementación del proyecto[cite: 8]:

1. **Gestión de temporizadores asíncronos (`setInterval` vs `setTimeout`):**
   * *Decisión:* Se utilizó `setInterval` para el reloj global de la partida y `setTimeout` para forzar el salto del bug si el jugador no le hace clic a tiempo.
   * *Justificación:* Permite separar la lógica del flujo de tiempo general del comportamiento dinámico del elemento en el DOM. Ambos temporizadores se limpian explícitamente al invocar `endGame()` para garantizar la estabilidad del sistema.

2. **Separación de responsabilidades y manipulación del DOM:**
   * *Decisión:* Todo el marcado HTML carece de lógica o eventos inline[cite: 8]. La interacción se gestiona exclusivamente desde `app.js` mediante `addEventListener`[cite: 8].
   * *Justificación:* Mantiene un código limpio, modular y fácil de mantener, facilitando la defensa oral y la explicación de cada bloque de código.

3. **Cálculo de posiciones relativas frente a absolutas:**
   * *Decisión:* Las coordenadas de aparición del bug se calculan en tiempo de ejecución leyendo las dimensiones del contenedor padre (`codeBoard.clientWidth`).
   * *Justificación:* Evita usar valores fijos (hardcodeados) en CSS/JS, asegurando que la aplicación sea totalmente responsiva y funcione en cualquier tamaño de pantalla.