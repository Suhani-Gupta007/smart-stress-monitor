const socket = io();

const bpmElement = document.getElementById("bpm");
const activityElement = document.getElementById("activity");
const stateElement = document.getElementById("state");

socket.on("sensorData", (data) => {
    bpmElement.textContent = data.bpm + " BPM";
    activityElement.textContent = data.activity;
    stateElement.textContent = data.state;

    // Cute dynamic color change
    if (data.state === "Stress") {
        stateElement.style.color = "#d9534f"; // soft red
    } 
    else if (data.state === "Exercise") {
        stateElement.style.color = "#f0ad4e"; // soft orange
    } 
    else if (data.state === "Resting") {
        stateElement.style.color = "#5cb85c"; // soft green
    } 
    else {
        stateElement.style.color = "#b76e79"; // calm pink
    }
});

const toggleButton = document.getElementById("themeToggle");

toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        toggleButton.textContent = "☀️ Light Mode";
    } else {
        toggleButton.textContent = "🌙 Dark Mode";
    }
});

