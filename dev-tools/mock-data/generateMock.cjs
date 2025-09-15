// dev-tools/mock-data/generateMock.js
const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Helpers para pedir inputs en consola
function askQuestion(query, rl) {
  return new Promise(resolve => rl.question(query, ans => resolve(ans.trim())));
}

(async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log("=== Generador de JSON de ejemplo para Notifica ===");

  // Preguntar parámetros
  const fechaInicioStr = await askQuestion("Fecha inicio (YYYY-MM-DD): ", rl);
  const fechaFinStr = await askQuestion("Fecha fin (YYYY-MM-DD): ", rl);
  const numTramosPorDia = parseInt(await askQuestion("Número de tramos por día: ", rl), 10);
  const numTareasPorTramo = parseInt(await askQuestion("Número de tareas por tramo: ", rl), 10);
  const ratioCompletadas = parseFloat(await askQuestion("Ratio completadas (0-1): ", rl));
  const ratioRegistradas = parseFloat(await askQuestion("Ratio registradas (0-1): ", rl));
  const durMin = parseInt(await askQuestion("Duración mínima de tareas (min): ", rl), 10);
  const durMax = parseInt(await askQuestion("Duración máxima de tareas (min): ", rl), 10);
  const maxNotasPorTramo = parseInt(await askQuestion("Máximo de notas por tramo: ", rl), 10);

  rl.close();

  // Cargar listas
  const tasksList = JSON.parse(fs.readFileSync(path.join(__dirname, "lists", "tasks.json"), "utf8"));
  const namesList = JSON.parse(fs.readFileSync(path.join(__dirname, "lists", "names.json"), "utf8"));
  const notesList = JSON.parse(fs.readFileSync(path.join(__dirname, "lists", "notes.json"), "utf8"));

  // Horarios fijos de tramos
  const horarios = [7, 15, 23]; // horas en local

  // Funciones para calcular inicio de tareas y shiftId
  function makeTaskStart(date, hourLocal) {
    const d = new Date(date);
    d.setHours(hourLocal, 0, 0, 0); // hora local
    return d.getTime();
  }

  function makeShiftId(date, hourLocal) {
    const d = new Date(date);
    d.setUTCHours(hourLocal, 0, 0, 0); // hora en UTC
    return d.getTime();
  }

  // Generar datos
  const tasks = [];
  const notesByShiftId = {};

  const fechaInicio = new Date(fechaInicioStr);
  const fechaFin = new Date(fechaFinStr);

  for (let d = new Date(fechaInicio); d <= fechaFin; d.setDate(d.getDate() + 1)) {
    for (let t = 0; t < numTramosPorDia; t++) {
      const shiftStart = makeTaskStart(d, horarios[t % horarios.length]);
      const shiftId = "shift-" + makeShiftId(d, horarios[t % horarios.length]);

      // Notas
      const numNotas = Math.floor(Math.random() * (maxNotasPorTramo + 1));
      if (numNotas > 0) {
        notesByShiftId[shiftId] = [];
        for (let i = 0; i < numNotas; i++) {
          const note = notesList[Math.floor(Math.random() * notesList.length)];
          notesByShiftId[shiftId].push(note);
        }
      }

      // Tareas
      const usedDescriptions = new Set();
      const tramoTasks = [];

      for (let i = 0; i < numTareasPorTramo; i++) {
        // Selección aleatoria sin repetir descripción
        let description;
        do {
          description = tasksList[Math.floor(Math.random() * tasksList.length)];
        } while (usedDescriptions.has(description));
        usedDescriptions.add(description);

        // Técnico aleatorio
        const technician = namesList[Math.floor(Math.random() * namesList.length)];

        // Hora inicio dentro del tramo (base UTC del shiftId)
        const tramoDurMs = 8 * 60 * 60 * 1000; // 8h
        const randomOffset = Math.floor(Math.random() * tramoDurMs);
        const baseShiftUtc = makeShiftId(d, horarios[t % horarios.length]);
        const startTime = new Date(baseShiftUtc + randomOffset);

        tramoTasks.push({
          id: startTime.getTime().toString(),
          description,
          startTime: startTime.toISOString(),
          shiftId,
          technician
        });
      }

      // Calcular objetivos con margen ±10%
      function withMargin(target, total) {
        const delta = Math.round(total * 0.1); // 10%
        const min = Math.max(0, target - delta);
        const max = Math.min(total, target + delta);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      const targetCompleted = withMargin(Math.round(numTareasPorTramo * ratioCompletadas), numTareasPorTramo);
      const targetNotified  = withMargin(Math.round(numTareasPorTramo * ratioRegistradas), numTareasPorTramo);

      // Barajar array
      function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }

      // Asignar endTime a las tareas completadas
      shuffle(tramoTasks);
      for (let i = 0; i < targetCompleted; i++) {
        const task = tramoTasks[i];
        const durMinMs = durMin * 60 * 1000;
        const durMaxMs = durMax * 60 * 1000;
        const dur = durMinMs + Math.floor(Math.random() * (durMaxMs - durMinMs + 1));
        task.endTime = new Date(new Date(task.startTime).getTime() + dur).toISOString();
      }

      // Asignar isNotified a las tareas registradas
      shuffle(tramoTasks);
      for (let i = 0; i < targetNotified; i++) {
        tramoTasks[i].isNotified = true;
      }

      // Añadir al array global
      tasks.push(...tramoTasks);
    }
  }

  // Resultado final
  const result = { tasks, notesByShiftId };

  // Guardar archivo
  const outDir = path.join(__dirname, "output");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  // Formatear como YYYY-MM-DD-HH-MM
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const timestamp = `${year}-${month}-${day}-${hours}-${minutes}`;

  const fileName = `mock-${timestamp}.json`;
  const outPath = path.join(outDir, fileName);
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), "utf8");

  console.log(`✅ Archivo generado: ${outPath}`);
})();
