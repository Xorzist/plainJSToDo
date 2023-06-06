window.addEventListener("load", () => {
  const form = document.querySelector("#new-task-form");
  const title = document.querySelector("#new-task-title");
  const input = document.querySelector("#new-task-input");
  const task_list = document.querySelector("#tasks");

  var data = getAllTasks()
    .then((data) => {
      console.log("API Response: ", data);

      data.forEach((todo) => {
       
        task = `${todo.title} : ${todo.description}`;
        addElements(task,task_list,input);
        console.log(todo);
      });
    })
    .catch((error) => {
      console.error("Error retrieving tasks:", error);
    });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = title.value + " : " + input.value;
    addElements(task,task_list,input);

    

   
  });
});

function addElements(task,task_list,input) {
  const tasks = document.createElement("div");
  tasks.classList.add("task");

  const task_content = document.createElement("div");
  task_content.classList.add("content");

  tasks.appendChild(task_content);

  const task_input = document.createElement("input");
  task_input.classList.add("text");
  task_input.type = "text";
  task_input.setAttribute("readonly", "readonly");

  const task_functions = document.createElement("div");
  task_functions.classList.add("actions");

  const edit_task = document.createElement("button");
  edit_task.classList.add("edit");
  edit_task.innerText = "Edit";

  const delete_task = document.createElement("button");
  delete_task.classList.add("delete");
  delete_task.innerText = "Delete";

  const complete_task = document.createElement("button");
  complete_task.classList.add("completed");
  complete_task.innerText = "Done";

  task_input.value = task;
  task_input.setAttribute("readonly", "readonly");

  task_content.appendChild(task_input);

  task_list.appendChild(tasks);

  input.value = "";

  task_functions.appendChild(complete_task);
  task_functions.appendChild(edit_task);
  task_functions.appendChild(delete_task);

  tasks.appendChild(task_functions);

  edit_task.addEventListener("click", (e) => {
    if (complete_task.innerText.toLowerCase() != "done") {
      return;
    }
    if (edit_task.innerText.toLowerCase() == "edit") {
      edit_task.innerText = "Save";
      task_input.removeAttribute("readonly");
      task_input.focus();
    } else {
      edit_task.innerText = "Edit";
      task_input.setAttribute("readonly", "readonly");
    }
  });

  delete_task.addEventListener("click", (e) => {
    task_list.removeChild(tasks);
  });

  complete_task.addEventListener("click", (e) => {
    if (edit_task.innerText.toLowerCase() == "save") {
      return;
    }
    if (complete_task.innerText.toLowerCase() == "done") {
      task_input.style.textDecoration = "line-through";
      task_input.style.color = "red";
      complete_task.innerText = "Incomplete";
    } else {
      task_input.style.textDecoration = "none";
      task_input.style.color = "whitesmoke";
      complete_task.innerText = "Done";
    }
  });
}
