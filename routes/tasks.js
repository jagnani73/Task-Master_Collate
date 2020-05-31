const router = require("express").Router();

const tasksController = require("../controllers/tasks");

router.get("/", tasksController.getAllTasks);
router.get("/get", tasksController.getTask);
router.post("/add", tasksController.addTask);
router.post("/delete", tasksController.deleteTask);
router.post("/edit", tasksController.updateTask);

module.exports = router;
