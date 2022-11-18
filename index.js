// === SETUP === //

// GENERAL PURPOSE VARIABLES
let tasksArray = [];
let completedTasksArray = [];
const root = document.getElementById("root");
root.style =
  "font-family: courier; user-select: none; padding: 60px; display: flex; flex-direction: column; gap: 60px;";
class Task {
  constructor(title, dueDate, id) {
    this.title = title;
    this.dueDate = dueDate;
    this.id = id;
  }
}

// === FORM AND NEW TASK CREATION === //

// FORM CONTAINER CREATION
const formDiv = document.createElement("form");
formDiv.id = "form-div";
formDiv.style = "display: flex; align-items: center ; gap: 20px;";
root.appendChild(formDiv);

// TASK TITLE INPUT CREATION
const taskTitleInputArea = document.createElement("input");
taskTitleInputArea.type = "text";
taskTitleInputArea.id = "task-title";
taskTitleInputArea.style = "font-family: courier";
formDiv.appendChild(taskTitleInputArea);

// TASK DUE DATE INPUT CREATION
const taskDueDateInputArea = document.createElement("input");
taskDueDateInputArea.type = "date";
taskDueDateInputArea.id = "task-due-date";
taskDueDateInputArea.style = "font-family: courier";
formDiv.appendChild(taskDueDateInputArea);

// SUBMIT BUTTON CREATION
const submitButton = document.createElement("input");
submitButton.type = "button";
submitButton.id = "submit-button";
submitButton.value = "CREATE NEW TASK";
submitButton.style = "padding: 4px; font-family: courier;";
formDiv.appendChild(submitButton);

// NEW TASK CREATION EVENT LISTENER
submitButton.addEventListener("click", function () {
  const newTaskTitle = document.getElementById("task-title").value;
  const newTaskDueDate = document.getElementById("task-due-date").value;
  if (!newTaskTitle.length || !newTaskDueDate.length) return;
  const newTaskId = new Date().getTime().toString();
  tasksArray.push(new Task(newTaskTitle, newTaskDueDate, newTaskId));
  document.getElementById("form-div").reset();
  render();
});

// CLEAR TASK LIST BUTTON CREATION
const clearAllButton = document.createElement("input");
clearAllButton.type = "button";
clearAllButton.value = "CLEAR ALL";
clearAllButton.id = "clear-all-button";
clearAllButton.style = "padding: 4px; font-family: courier;";
formDiv.appendChild(clearAllButton);
clearAllButton.addEventListener("click", () => {
  tasksArray.splice(0, tasksArray.length);
  render();
});

// CURRENT TASK COUNTER CREATION
const taskCounter = document.createElement("div");
taskCounter.id = "task-counter";
taskCounter.innerText = "CURRENT TASKS: 0";
formDiv.appendChild(taskCounter);

// COMPLETED TASKS COUNTER CREATION
const completedCounter = document.createElement("div");
completedCounter.id = "completed-tasks-counter";
completedCounter.innerText = "COMPLETED TASKS: 0";
formDiv.appendChild(completedCounter);

// === TASKS ARRAY RENDERING === //

// TASKS LIST CONTAINER CREATION
const tasksListContainer = document.createElement("div");
tasksListContainer.id = "tasks-list-container";
tasksListContainer.style = "display: flex; flex-direction: column; gap: 10px;";
root.appendChild(tasksListContainer);

// NEW TASK DIV CREATION
function createNewTask(taskTitle, taskDueDate, taskId) {
  const newTaskDiv = document.createElement("div");
  newTaskDiv.style =
    "font-family: courier; display: flex; align-items:center ; gap: 20px; margin-top: 20px;";
  newTaskDiv.innerText = taskTitle + " " + taskDueDate;

  const newTaskDeleteBtn = document.createElement("button");
  newTaskDeleteBtn.innerText = "DELETE";
  newTaskDeleteBtn.id = taskId;
  newTaskDeleteBtn.style =
    "margin-left:4px; padding: 4px; font-family: courier;";
  newTaskDiv.appendChild(newTaskDeleteBtn);
  newTaskDeleteBtn.addEventListener("click", (event) => {
    tasksArray = tasksArray.filter((elem) => {
      return !(elem.id === event.target.id);
    });
    render();
  });

  const newTaskCompleteBtn = document.createElement("button");
  newTaskCompleteBtn.innerText = "COMPLETE";
  const completeButtonFakeId = taskId;
  newTaskCompleteBtn.style =
    "margin-left:4px; padding: 4px; font-family: courier;";
  newTaskDiv.appendChild(newTaskCompleteBtn);
  newTaskCompleteBtn.addEventListener("click", () => {
    for (let i = 0; i < tasksArray.length; i++) {
      if (tasksArray[i].id === completeButtonFakeId)
        completedTasksArray.push(tasksArray[i]);
    }
    tasksArray = tasksArray.filter((elem) => {
      return !(completeButtonFakeId === elem.id);
    });
    render();
  });

  tasksListContainer.appendChild(newTaskDiv);
}

// CREATE COMPLETED TASK
function createCompletedTask(taskTitle, taskDueDate, taskId) {
  const newCompletedTaskDiv = document.createElement("div");
  newCompletedTaskDiv.style =
    "font-family: courier; display: flex; align-items:center; gap: 20px; margin-top: 20px;";
  newCompletedTaskDiv.innerText = taskTitle + " " + taskDueDate;
  completedTasks.appendChild(newCompletedTaskDiv);
  const dltCompleteTaskBtn = document.createElement("button");
  dltCompleteTaskBtn.innerText = "DELETE";
  dltCompleteTaskBtn.style =
    "margin-left:4px; padding: 4px; font-family: courier;";
  dltCompleteTaskBtn.id = taskId;
  newCompletedTaskDiv.appendChild(dltCompleteTaskBtn);
  dltCompleteTaskBtn.addEventListener("click", (event) => {
    completedTasksArray = completedTasksArray.filter((elem) => {
      return !(elem.id === event.target.id);
    });
    render();
  });
}

// RENDERING
function render() {
  tasksListContainer.innerHTML = "";
  completedTasks.innerHTML = "";
  tasksArray.forEach((task) => {
    createNewTask(task.title, task.dueDate, task.id);
  });
  taskCounter.innerText = "CURRENT TASKS: " + tasksArray.length;
  completedCounter.innerText = "COMPLETED TASKS: " + completedTasksArray.length;
  completedTasksArray.forEach((task) => {
    createCompletedTask(task.title, task.dueDate, task.id);
  });
}

const tasksListTitle = document.createElement("div");
tasksListTitle.innerText = "ACTIVE TASKS";
const activeTasks = document.createElement("div");
activeTasks.appendChild(tasksListTitle);
activeTasks.appendChild(tasksListContainer);
const listsWrapper = document.createElement("div");
listsWrapper.appendChild(activeTasks);
root.appendChild(listsWrapper);
listsWrapper.id = "lists-wrapper";
activeTasks.id = "active-tasks";
const completedTasksTitle = document.createElement("div");
completedTasksTitle.style = "align-self: flex-end;";
completedTasksTitle.innerText = "COMPLETED TASKS";
const completedTasks = document.createElement("div");
const completedTasksContainer = document.createElement("div");
completedTasksContainer.id = "completed-tasks";
completedTasks.id = "completed-tasks-container";
completedTasks.style =
  "display: flex; flex-direction: column; align-items: flex-end;";
completedTasksContainer.style = "display: flex; flex-direction: column;";
completedTasksContainer.appendChild(completedTasksTitle);
completedTasksContainer.appendChild(completedTasks);
listsWrapper.appendChild(completedTasksContainer);
listsWrapper.style = "display:flex; justify-content: space-between;";

// MEDIA QUERY

function handleResize() {
  if (window.innerWidth < 1055) {
    formDiv.style =
      "display: flex; flex-direction: column; align-items: center ; gap: 20px;";
    listsWrapper.style =
      "display:flex; flex-direction: column; align-items: center; justify-content: space-between; gap:40px";
    completedTasksTitle.style = "text-align: center";
    tasksListTitle.style = "text-align: center";
  } else {
    formDiv.style = "display: flex; align-items: center ; gap: 20px;";
    listsWrapper.style = "display:flex; justify-content: space-between;";
    completedTasksTitle.style = "align-self: flex-end;";
  }
}
handleResize();
window.addEventListener("resize", handleResize);
