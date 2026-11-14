// Estado de la app
let tasks = [];
let currentFilter = "all"; // "all" | "pending" | "done"

// Referencias al DOM
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const emptyMsg = document.getElementById("empty-msg");
const counter = document.getElementById("counter");
const clearDoneBtn = document.getElementById("clear-done");
const filterButtons = document.querySelectorAll(".filter");
const kamehamehaOverlay = document.getElementById("kamehameha-overlay");
const levelSelect = document.getElementById("level-select");
const powerLevel = document.getElementById("power-level");
const powerFill = document.getElementById("power-fill");
const powerTitle = document.querySelector(".power-title");

const STORAGE_KEY = "todo-list-tasks";

// Niveles de poder
const LEVELS = {
  saiyan: { label: "SAIYAJIN", power: 500, cls: "lv-saiyan" },
  ssj: { label: "SUPER SAIYAJIN", power: 2000, cls: "lv-ssj" },
  blue: { label: "SSJ BLUE", power: 8000, cls: "lv-blue" },
  migatte: { label: "MIGATTE NO GOKUI", power: 25000, cls: "lv-migatte" },
};

// ---------- Persistencia ----------
function loadTasks() {
  try {
    tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    tasks = [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// ---------- Acciones ----------
function addTask(text) {
  tasks.unshift({
    id: crypto.randomUUID(),
    text: text.trim(),
    done: false,
    level: levelSelect.value,
  });
  saveTasks();
  render();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;
  task.done = !task.done;
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  render();
}

function clearDone() {
  const hadDone = tasks.some((t) => t.done);
  tasks = tasks.filter((t) => !t.done);
  saveTasks();
  if (hadDone) kamehameha();
  render();
}

// Efecto especial: ¡Kamehameha!
function kamehameha() {
  kamehamehaOverlay.classList.remove("hidden");
  setTimeout(() => kamehamehaOverlay.classList.add("hidden"), 1100);
}

// ---------- Renderizado ----------
function getVisibleTasks() {
  if (currentFilter === "pending") return tasks.filter((t) => !t.done);
  if (currentFilter === "done") return tasks.filter((t) => t.done);
  return tasks;
}

function render() {
  const visible = getVisibleTasks();

  list.innerHTML = "";

  for (const task of visible) {
    const li = document.createElement("li");
    li.className = "task" + (task.done ? " done" : "");

    // Esfera del dragón (checkbox)
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "orb";
    checkbox.title = task.done ? "Esfera conseguida" : "Esfera por reunir";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const text = document.createElement("span");
    text.className = "text";
    text.textContent = task.text;

    // Insignia del nivel de poder
    const level = LEVELS[task.level] || LEVELS.saiyan;
    const badge = document.createElement("span");
    badge.className = `level-badge ${level.cls}`;
    badge.title = `Poder de pelea: ${level.power.toLocaleString("es-AR")}`;
    badge.textContent = level.label;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.title = "Destruir con un puñetazo";
    deleteBtn.textContent = "💥";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    li.append(checkbox, text, badge, deleteBtn);
    list.appendChild(li);
  }

  // Mensaje de lista vacía
  emptyMsg.classList.toggle("hidden", visible.length > 0);

  // Contador de esferas
  const pending = tasks.filter((t) => !t.done).length;
  if (pending === 0) {
    counter.textContent = "¡Tenés las 7 esferas! Pedí tu deseo 🐉";
  } else if (pending === 1) {
    counter.textContent = "Falta 1 esfera";
  } else {
    counter.textContent = `${pending} esferas por reunir`;
  }

  updatePowerMeter();
}

// Medidor de poder de pelea (suma de los poderes de las tareas completadas)
let previousPower = 0;

function updatePowerMeter() {
  const total = tasks
    .filter((t) => t.done)
    .reduce((sum, t) => sum + (LEVELS[t.level]?.power || 0), 0);

  powerLevel.textContent = total.toLocaleString("es-AR");

  const over9000 = total > 9000;
  powerLevel.classList.toggle("over-9000", over9000);
  powerTitle.textContent = over9000 ? "¡¡ESTÁ SUPERA LOS 9000!!" : "PODER DE PELEA";

  // La barra se escala hasta 9000; al pasarlo, queda llena y roja
  powerFill.style.width = over9000
    ? "100%"
    : `${Math.min(100, (total / 9000) * 100)}%`;
  if (over9000) {
    powerFill.style.background = "linear-gradient(90deg, #ff4d6d, #ffd23f)";
  }

  // Animación de "pop" cuando el poder sube
  if (total > previousPower) {
    powerLevel.classList.remove("pop");
    // Reinicia la animación
    void powerLevel.offsetWidth;
    powerLevel.classList.add("pop");
  }
  previousPower = total;
}

// ---------- Eventos ----------
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTask(text);
  input.value = "";
  input.focus();
});

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    filterButtons.forEach((b) => b.classList.toggle("active", b === btn));
    render();
  });
});

clearDoneBtn.addEventListener("click", clearDone);

// Inicio
loadTasks();
render();
