let taskInput = document.getElementById("new-task") as HTMLInputElement;
let addTaskBtn = document.getElementById("add-task-btn") as HTMLButtonElement;
let todoList = document.getElementById("todo-list") as HTMLUListElement;


interface Task {
    id: number;
    content: string;
    completed: boolean;
}

let tasks: Task[] = [];
let taskId = 0;

function addTask() {
    const taskContent = taskInput.value.trim();
    if (taskContent === "") {
        alert("Please enter a task");
        return;
    }

    const task: Task = {
        id: taskId++,
        content: taskContent,
        completed: false,
    };

    tasks.push(task);
    renderTasks();
    taskInput.value = "";
}

function toggleTaskCompletion(id: number) {
    tasks = tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
}

function removeTask(id: number) {
    tasks = tasks.filter((task) => task.id !== id);
    renderTasks();
}

function renderTasks() {
    todoList.innerHTML = "";
    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.textContent = task.content;

    li.addEventListener("click", () => toggleTaskCompletion(task.id));

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
    removeTask(task.id);
    });

    li.appendChild(removeBtn);
    todoList.appendChild(li);
    });
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
