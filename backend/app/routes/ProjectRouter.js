const express = require("express");
const router = express.Router();
const token = require("../middlewares/AuthToken");

const projectController = require("../controllers/ProjectController");
router.post("/addproject", token, projectController.CreateProject);
router.get("/projects", token, projectController.getProjects);
router.get("/deleteprojects/:id", token, projectController.deleteProjects);
router.get("/project/:id", token, projectController.getProject);
router.patch("/edit/:id", token, projectController.editProject);

module.exports = router;
