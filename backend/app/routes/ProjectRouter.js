const express = require("express");
const router = express.Router();
const token = require("../middlewares/AuthToken");

const projectController = require("../controllers/ProjectController");
router.post("/addproject", token, projectController.CreateProject);
router.get("/projects", token, projectController.getProjects);
router.get("/deleteprojects/:id", token, projectController.deleteProjects);

module.exports = router;
