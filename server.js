const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

// Function to generate fake sensor data
function generateData() {
    const bpm = Math.floor(Math.random() * (140 - 60) + 60);
    const activity = Math.floor(Math.random() * 100);

    let state = "Normal";

    if (bpm > 110 && activity < 30) {
        state = "Stress";
    } else if (bpm > 110 && activity >= 30) {
        state = "Exercise";
    } else if (bpm < 80 && activity < 20) {
        state = "Resting";
    }

    return { bpm, activity, state };
}

// Send data every second
setInterval(() => {
    const data = generateData();
    io.emit("sensorData", data);
}, 1000);

const PORT = process.env.PORT || 3000; // Use Render’s port if available, fallback to 3000 locally
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

