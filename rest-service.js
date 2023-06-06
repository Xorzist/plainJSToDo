const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const cors = require("cors");

const app = express();
app.use(cors());

app.use(bodyParser.json());
const path = require("path");
const router = express.Router();
// Setup essential routes
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
  //__dirname : It will resolve to your project folder.
});
//MongoDB Connection !

mongoose
  .connect(process.env.DATABASE_URL || "mongodb://localhost/your-app-name", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

//Schema
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
});
// Task Model
const Task = mongoose.model("Task", taskSchema);

// In-memory storage for tasks
let tasks = [
  { id: 0, title: "demo", description: "demo" },
  { id: 1, title: "demo2", description: "demo2" },
];

// Endpoint to create a new task
app.post("/tasks", (req, res) => {
  const { title, description } = req.body;

  // Create a new task using the Task model
  Task.create({ title, description })
    .then((newTask) => {
      res.status(201).json(newTask);
    })
    .catch((error) => {
      console.error("Error creating task:", error);
      res.status(500).json({ error: "Server error" });
    });
});

// Endpoint to get all tasks
app.get("/tasks", (req, res) => {
  Task.find()
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((error) => {
      console.error("Error retrieving tasks:", error);
      res.status(500).json({ error: "Server error" });
    });
});

// Endpoint to get a specific task by ID
app.get("/tasks/:id", (req, res) => {
  const taskId = req.params.id;

  Task.findById(taskId)
    .then((task) => {
      if (!task) {
        res.status(404).json({ error: "Task not found" });
      } else {
        res.json(task);
      }
    })
    .catch((error) => {
      console.error("Error retrieving task:", error);
      res.status(500).json({ error: "Server error" });
    });
});

// Endpoint to update a specific task by ID
app.put("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const { title, description } = req.body;

  Task.findByIdAndUpdate(taskId, { title, description }, { new: true })
    .then((task) => {
      if (!task) {
        res.status(404).json({ error: "Task not found" });
      } else {
        res.json(task);
      }
    })
    .catch((error) => {
      console.error("Error updating task:", error);
      res.status(500).json({ error: "Server error" });
    });
});

// Endpoint to delete a specific task by ID
app.delete("/tasks/:id", (req, res) => {
  const taskId = req.params.id;

  Task.findByIdAndDelete(taskId)
    .then((task) => {
      if (!task) {
        res.status(404).json({ error: "Task not found" });
      } else {
        res.sendStatus(204);
      }
    })
    .catch((error) => {
      console.error("Error deleting task:", error);
      res.status(500).json({ error: "Server error" });
    });
});

//add the router
app.use("/", router);
// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
