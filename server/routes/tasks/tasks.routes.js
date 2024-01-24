const Router = require('express');
const router = Router();
const tasksController = require("../../controllers/tasks/tasks.controller");

router.post("/create", tasksController.create);

router.get("/get", tasksController.get);
router.get("/get/:id", tasksController.getById);

router.put("/update/:id", tasksController.update);

router.delete("/delete/:id", tasksController.delete);

module.exports = router;