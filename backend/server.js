const express = require("express");
const bodyParser = require("body-parser");
// const mongoose = require("./src/config/db");
const routes = require("./src/routes");
require("dotenv").config();

const app = express();

const server = require('http').createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
    socket.on("notify", async ({ userId, message }) => {
        const notification = await Notification.create({ userId, message });
        io.to(userId).emit("newNotification", notification);
    });

    socket.on("join", (userId) => {
        socket.join(userId);
    });
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json());

app.use("/api", routes);

const port = process.env.PORT || 5000;
app.listen(port, function (error) {
    if (error) {
        console.log("Could not start Server - " + error);
    } else {
        console.log("Server successfully started on port - " + port);
    }
});
