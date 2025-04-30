const express = require("express");

const  { login, register, getUserProfile, updateUserProfile } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware")

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

// Protected routes
router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);

module.exports = router;