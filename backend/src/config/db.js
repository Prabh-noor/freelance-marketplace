const mongoose = require("mongoose")
require("dotenv").config();

const connUrl = process.env.DB_URL;
mongoose.connect(connUrl).then(() => {
    console.log("MongoDB connected successfully", connUrl);
}).catch((err) => console.error("MongoDB connection error:", err));

module.exports = mongoose; // shared connection to be used by the application