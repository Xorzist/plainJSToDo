const port = 3001;

// Function to create a new task
function createTask() {
  const title = document.getElementById('task-title').value;
  const description = document.getElementById('task-description').value;

  const task = { title, description };

  fetch(`http://localhost:${port}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('New task created:', data);
      getAllTasks();
    })
    .catch((error) => {
      console.error('Error creating task:', error);
    });
}

// Function to get all tasks
function getAllTasks() {
  fetch(`http://localhost:${port}/tasks`)
    .then((response) => response.json())
    .then((data) => {
      console.log('All tasks:', data);
      displayTasks(data);
    })
    .catch((error) => {
      console.error('Error retrieving tasks:', error);
    });
}

// Function to display tasks in the HTML
function displayTasks(tasks) {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${task.title}: ${task.description}</span>
      <button onclick="editTask(${task.id})">Edit</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(listItem);
  });
}

// Function to get a specific task by ID
function getTaskById(id) {
  fetch(`http://localhost:${port}/tasks/${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log('Task by ID:', data);
    })
    .catch((error) => {
      console.error('Error retrieving task:', error);
    });
}

// Function to update a specific task by ID
function updateTaskById(id, title, description) {
  const task = { title, description };

  fetch(`http://localhost:${port}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Updated task:', data);
      getAllTasks();
    })
    .catch((error) => {
      console.error('Error updating task:', error);
    });
}

// Function to delete a specific task by ID
function deleteTaskById(id) {
  fetch(`http://localhost:${port}/tasks/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.status === 204) {
        console.log('Task deleted successfully');
        getAllTasks();
      } else {
        console.error('Error deleting task');
      }
    })
    .catch((error) => {
      console.error('Error deleting task:', error);
    });
}