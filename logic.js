// Initial fetch to get all tasks
window.onload = function () {
  getAllTasks();
};

// Function to edit a task
function editTask(id) {
  const newTitle = prompt('Enter the new title:');
  const newDescription = prompt('Enter the new description:');

  updateTaskById(id, newTitle, newDescription);
}

// Function to delete a task
function deleteTask(id) {
  const confirmDelete = confirm('Are you sure you want to delete this task?');
  if (confirmDelete) {
    deleteTaskById(id);
  }
}
