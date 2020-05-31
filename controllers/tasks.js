const Task = require("../models/tasks");
const User = require("../models/users");
const ObjectId = require("mongoose").Types.ObjectId;

exports.addTask = async (req, res, next) => {
  try {
    const user = res.locals.user;
    const newTask = new Task({
      title: req.body.title,
      author: new ObjectId(res.locals.user._id),
      content: req.body.content,
      progress: req.body.progress,
    });
    const resultTask = await newTask.save();
    user.tasks.push(new ObjectId(resultTask._id));
    const result = await user.save();
    if (result) {
      res.json({
        status: "OK",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "ERROR",
      error: "Internal Server Error.",
    });
  }
};

exports.getAllTasks = async (req, res, next) => {
  try {
    const data = await User.findOne({ email: res.locals.user.email })
      .populate({
        path: "tasks",
        select: "-__v",
        populate: {
          path: "author",
          select: "name -_id",
        },
      })
      .select("-email -name -password -__v -_id");
    res.status(200).json({
      status: "OK",
      data: data.tasks,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "ERROR",
      error: "Internal Server Error.",
    });
  }
};

exports.getTask = async (req, res, next) => {
  try {
    const taskId = res.locals.user.tasks.find(
      (ele) => ele._id.toString() === req.query.id
    );
    if (!taskId) {
      throw new Error("Task Not Found.");
    }
    const task = await Task.findById(new ObjectId(taskId))
      .populate({
        path: "author",
        select: "name -_id",
      })
      .select("-__v");
    res.status(200).json({
      status: "OK",
      data: task,
    });
  } catch (err) {
    res.status(404).json({
      status: "ERROR",
      error: `${err.message}`,
    });
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const taskId = res.locals.user.tasks.find(
      (ele) => ele._id.toString() === req.body.id.toString()
    );
    if (!taskId) {
      throw new Error("Task Not Found.");
    }
    const deletedTask = await Task.findByIdAndRemove(new ObjectId(taskId));
    const updatedTasks = res.locals.user.tasks.filter(
      (ele) => ele.toString() !== deletedTask._id.toString()
    );
    res.locals.user.tasks = updatedTasks;
    const result = await res.locals.user.save();
    res.status(200).json({
      status: "OK",
    });
  } catch (err) {
    res.status(404).json({
      status: "ERROR",
      error: `${err.message}`,
    });
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const taskId = res.locals.user.tasks.find(
      (ele) => ele._id.toString() === req.body.id.toString()
    );
    if (!taskId) {
      throw new Error("Task Not Found.");
    }
    const updatedTask = await Task.findById(taskId);
    updatedTask.title = req.body.title;
    updatedTask.content = req.body.content;
    updatedTask.progress = req.body.progress;
    const result = await updatedTask.save();
    res.status(200).json({
      status: "OK",
    });
  } catch (err) {
    res.status(404).json({
      status: "ERROR",
      error: `${err.message}`,
    });
  }
};
