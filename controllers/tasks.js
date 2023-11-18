const Task = require("../models/task");
const asyncWrapper = require("../middleware/aysnc");
const { createCustomError } = require("../errors/customError");

/* const getAllTasks = asyncWrapper(async (req, res) => {
  try {
    const tasks = await Task.find({});

    res
      .status(200)
      .json({ status: "success", data: { tasks, nbHits: tasks.length } });
    // .json({ success: true, data: { tasks, nbHits: tasks.length } });
    // res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error.errors.name.message });
  }
}); */

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  //  const task =  await Task.create({name: 'first'});
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

/* const getTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    res.status(404).json({ msg: `no task with id ${taskId}` });
  }
  res.status(200).json({ task });
}); */

/* const getTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    const error = new Error("Not Found");
    error.status = 404;
    return next(error);
    return res.status(404).json({ msg: `no task with id ${taskId}` });
  }
  res.status(200).json({ task });
}); */

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    return next(createCustomError(`no task with id ${taskId}`, 404));
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`no task with id ${taskId}`, 404));
  }
  res.status(200).json({ task });
  // res.status(200).json({ id: taskId, data: req.body });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });
  if (!task) {
    return next(createCustomError(`no task with id ${taskId}`, 404));
  }
  response.status(200).json({ task });
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
