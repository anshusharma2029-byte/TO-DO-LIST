const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const app = document.querySelector(".app");
const xpFill = document.getElementById("xpFill");
const levelText = document.getElementById("level");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let xp = Number(localStorage.getItem("xp")) || 0;
let level = Math.floor(xp / 100) + 1;

function updateLevel() {
  level = Math.floor(xp / 100) + 1;
  levelText.textContent = `Level ${level}`;
  xpFill.style.width = `${xp % 100}%`;

  localStorage.setItem("xp", xp);
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    li.style.setProperty("--z", `${index * 5}px`);

    if (task.completed) li.classList.add("completed");

    li.addEventListener("click", () => {
      if (!task.completed) xp += 10;
      task.completed = !task.completed;
      updateLevel();
      save();
    });

    const del = document.createElement("span");
    del.textContent = "✖";
    del.className = "delete";

    del.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      save();
    });

    li.appendChild(del);
    taskList.appendChild(li);
  });
}

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

addBtn.addEventListener("click", () => {
  if (!input.value.trim()) return;

  tasks.push({ text: input.value, completed: false });
  input.value = "";
  save();
});

document.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / 50;
  const y = (window.innerHeight / 2 - e.clientY) / 50;
  app.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg)`;
});

updateLevel();
renderTasks();
