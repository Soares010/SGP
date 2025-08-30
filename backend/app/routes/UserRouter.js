const express = require("express");
const router = express.Router();

// Importando controller
const userController = require("../controllers/UserController");

router.post("/login", userController.checkUserExist);
router.post("/add", userController.createUser);

module.exports = router;
