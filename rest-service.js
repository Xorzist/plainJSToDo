const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('cors')

const app = express();
app.use(cors())

app.use(bodyParser.json());

// In-memory storage for tasks
let tasks = [
  {id:0,title:"demo",
description:"demo"},
{id:1,title:"demo2",
description:"demo2"}
];

// Endpoint to create a new task
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;

  // Generate a unique ID for the new task
  const taskId = tasks.length + 1;

  // Create the task object
  const newTask = {
    id: taskId,
    title,
    description,
  };

  // Add the task to the in-memory storage
  tasks.push(newTask);

  res.status(201).json(newTask);
});

// Endpoint to get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Endpoint to get a specific task by ID
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);

  // Find the task with the matching ID
  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    res.json(task);
  }
});

// Endpoint to update a specific task by ID
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description } = req.body;

  // Find the task with the matching ID
  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    // Update the task's title and description
    task.title = title;
    task.description = description;

    res.json(task);
  }
});

// Endpoint to delete a specific task by ID
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);

  // Find the index of the task with the matching ID
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    // Remove the task from the in-memory storage
    tasks.splice(taskIndex, 1);

    res.sendStatus(204);
  }
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});