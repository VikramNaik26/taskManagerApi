// require('./db/connect')
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();

const tasks = require("./routes/tasks");

// middleware
app.use(express.json());

const port = 3000;

// routes
app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

app.use("/api/v1/tasks", tasks);

// app.get('/api/v1/tasks') - gets all the tasks
// app.post('/api/v1/tasks') - creates a new task
// app.get('/api/v1/tasks/:id') - gets a single task
// app.patch('/api/v1/tasks/:id') - updates a single task
// app.delete('/api/v1/tasks/:id') - deletes a single task

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
