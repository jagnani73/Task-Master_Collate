const router = require("express").Router();
const authController = require("../controllers/auth");

router.post("/login", authController.loginUser);
router.post("/register", authController.registerUser);

module.exports = router;
