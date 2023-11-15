const getAllTasks = (req, res) => {
  res.send("All Tasks");
};

const createTask = (req, res) => {
  res.json(req.body);
};

const getTask = (req, res) => {
  res.send("get single task");
};

const updateTask = (req, res) => {
  res.send("updates task");
};

const deleteTask = (req, res) => {
  res.send("delete task");
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
