// index.js
let inputElement = document.querySelector("input");
let taskContainer = document.querySelector("#tasks");
let addButton = document.querySelector("#add");

function createNewTask(taskText, completed) {
    let listElement = document.createElement("li");
    listElement.innerText = taskText;

    // Add some spacing between the elements using CSS margins
    listElement.style.alignItems = "center";
    listElement.style.marginBottom = "20px"; // Add margin at the bottom


    // Create a checkbox for each task
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    checkbox.addEventListener("change", function () {
        completeTask(listElement, checkbox.checked);
    });

    // Create a delete button for each task
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", function () {
        deleteTaskFromMyTasks(listElement);
    });

    // Create an edit button for each task
    let editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.addEventListener("click", function () {
        editTask(listElement);
    });

    listElement.appendChild(checkbox);
    listElement.appendChild(deleteButton);
    listElement.appendChild(editButton);
    return listElement;
}

function addTaskToMyTasks() {
    let taskText = inputElement.value;
    if (taskText === "") {
        alert("Please enter a task before clicking Add.");
        return; // Return alert if input is empty
    }
    let newTask = createNewTask(taskText, false);
    taskContainer.appendChild(newTask);
    inputElement.value = "";

    saveTasksToLocalStorage();
}

function deleteTaskFromMyTasks(listElement) {
    taskContainer.removeChild(listElement);
    saveTasksToLocalStorage();
}

function editTask(listElement) {
    let taskText = listElement.innerText.replace("Delete", "").replace("Edit", "").trim();
    inputElement.value = taskText;
    deleteTaskFromMyTasks(listElement);
}

function completeTask(listElement, isCompleted) {
    listElement.style.textDecoration = isCompleted ? "line-through" : "none";
    saveTasksToLocalStorage();
}

// Save tasks to local storage
function saveTasksToLocalStorage() {
    let tasks = [];
    taskContainer.querySelectorAll("li").forEach(listElement => {
        let taskText = listElement.innerText.replace("Delete", "").replace("Edit", "").trim();
        let completed = listElement.style.textDecoration === "line-through";
        tasks.push({ text: taskText, completed: completed });
    });
    localStorage.setItem("todos", JSON.stringify(tasks));
}

// Add an event listener on click
addButton.addEventListener("click", function () {
    addTaskToMyTasks();
});

// Add tasks from local storage back to the application on page refresh
window.addEventListener("load", function () {
    let myTasksFromLocalStorage = JSON.parse(localStorage.getItem("todos")) || [];
    let listElements = myTasksFromLocalStorage.map(task => {
        let listElement = createNewTask(task.text, task.completed);
        return listElement;
    });
    taskContainer.append(...listElements);
});
