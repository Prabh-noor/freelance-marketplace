const express = require("express");
const { placeBid, getBidsByJob } = require("../controllers/bidController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, placeBid);
router.get("/:jobId", getBidsByJob);

module.exports = router;
