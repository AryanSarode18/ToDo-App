const plusBtn = document.querySelector(".plus-btn");
const inputText = document.getElementById("text-input");
const taskList = document.querySelector(".task-list");
const error = document.querySelector(".error");

let tasks;

const toggleIcon = (e) => {
  let nextElClassList = e.target.nextElementSibling.classList;
  let classList = e.target.classList;

  if (classList.contains("fa-circle")) {
    classList.remove("fa-circle");
    classList.add("fa-circle-check");
    nextElClassList.add("completed");
  } else {
    classList.add("fa-circle");
    classList.remove("fa-circle-check");
    nextElClassList.remove("completed");
  }
};

const removeTask = (index) => {
  tasks.splice(index, 1);
  save(tasks);

  showTaskList();
};

const updateTaskStatus = (index) => {
  let status = tasks[index].status;

  status == "pending" ? (status = "completed") : (status = "pending");

  tasks[index].status = status;

  save(tasks);
};

const save = (data) => localStorage.setItem("tasks", JSON.stringify(data));

const get = () => JSON.parse(localStorage.getItem("tasks"));

const addTask = () => {
  let task = inputText.value;
  if (!task) {
    error.style.display = "block";
    return;
  } else {
    error.style.display = "none";
  }

  tasks = get();

  if (!tasks) tasks = [];

  tasks.push({
    task,
    status: "pending",
  });

  save(tasks);

  showTaskList();

  inputText.value = "";
};

const showTaskList = () => {
  tasks = [];

  tasks = get();
  taskList.innerHTML = "";

  if (tasks) createLiTag(tasks);
};

const createLiTag = (tasks) => {
  tasks.forEach((taskInfo, index) => {
    const { task, status } = taskInfo;
    let iconClass =
      taskInfo.status === "pending" ? "fa-circle" : "fa-circle-check";

    let textClass = taskInfo.status === "pending" ? "" : "completed";

    let liTag = document.createElement("li");
    liTag.innerHTML = `
        <li class="task">
          <span>
            <i class="fa-regular ${iconClass}" onclick="toggleIcon(event);updateTaskStatus(${index})"></i>
            <span class="text ${textClass}">${task}</span>
            
          </span>
          <i class="fa-solid fa-xmark" onclick="removeTask(${index})"></i>
        </li>
    `;
    taskList.appendChild(liTag);
  });
};

showTaskList();
