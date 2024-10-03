var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var taskInput = document.getElementById("new-task");
var addTaskBtn = document.getElementById("add-task-btn");
var todoList = document.getElementById("todo-list");
var tasks = [];
var taskId = 0;
function addTask() {
    var taskContent = taskInput.value.trim();
    if (taskContent === "") {
        alert("Please enter a task");
        return;
    }
    var task = {
        id: taskId++,
        content: taskContent,
        completed: false,
    };
    tasks.push(task);
    renderTasks();
    taskInput.value = "";
}
function toggleTaskCompletion(id) {
    tasks = tasks.map(function (task) {
        return task.id === id ? __assign(__assign({}, task), { completed: !task.completed }) : task;
    });
    renderTasks();
}
function removeTask(id) {
    tasks = tasks.filter(function (task) { return task.id !== id; });
    renderTasks();
}
function renderTasks() {
    todoList.innerHTML = "";
    tasks.forEach(function (task) {
        var li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.textContent = task.content;
        li.addEventListener("click", function () { return toggleTaskCompletion(task.id); });
        var removeBtn = document.createElement("button");
        removeBtn.className = "remove-btn";
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            removeTask(task.id);
        });
        li.appendChild(removeBtn);
        todoList.appendChild(li);
    });
}
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});
