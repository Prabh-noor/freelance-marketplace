const express = require("express");
const { createJob, getJobs, getJobById, deleteJob } = require("../controllers/jobController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getJobs);
router.post("/", authMiddleware, createJob);
router.get("/:id", getJobById);
router.delete("/:id", authMiddleware, deleteJob);

module.exports = router;
