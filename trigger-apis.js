// Function to create a new task

const port = 3001;
function createTask(title, description) {
    const task = { title, description };
  
  
    fetch('http://localhost:'+port+'/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('New task created:', data);
      })
      .catch((error) => {
        console.error('Error creating task:', error);
      });
  }
  
  // Function to get all tasks
  function getAllTasks() {
    return fetch('http://localhost:'+ port+'/tasks')
      .then((response) => response.json())
      .then((data) => {
        console.log('All tasks:', data);
        return data;
      })
      .catch((error) => {
        console.error('Error retrieving tasks:', error);
      });
  }
  
  // Function to get a specific task by ID
  function getTaskById(id) {
    fetch('http://localhost:'+port+'/tasks/${id}')
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
  
    fetch('http://localhost:'+port+'/tasks/${id}', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Updated task:', data);
      })
      .catch((error) => {
        console.error('Error updating task:', error);
      });
  }
  
  // Function to delete a specific task by ID
  function deleteTaskById(id) {
    fetch('http://localhost:'+port+'/tasks${id}', {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 204) {
          console.log('Task deleted successfully');
        } else {
          console.error('Error deleting task');
        }
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  }
  
  // Call the functions
//   createTask('Task 1', 'This is task 1');
//   getAllTasks();
//   getTaskById(1);
//   updateTaskById(1, 'Updated Task 1', 'This task has been updated');
//   deleteTaskById(1);
  