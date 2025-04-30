
const express = require("express");

const authRoutes = require("./authRoutes.js");
const jobRoutes = require("./jobRoutes.js");
const bidRoutes = require("./bidRoutes.js");
const messageRoutes = require("./messageRoutes.js");
const paymentRoutes = require("./paymentRoutes.js");
const reviewRoutes = require("./reviewRoutes.js");
const notificationRoutes = require("./notificationRoutes.js");

const router = express.Router();

// Attach routes with a common prefix
router.use("/auth", authRoutes);
router.use("/jobs", jobRoutes);
router.use("/bids", bidRoutes);
router.use("/messages", messageRoutes);
router.use("/payments", paymentRoutes);
router.use("/reviews", reviewRoutes);
router.use("/notifications", notificationRoutes);

module.exports = router;