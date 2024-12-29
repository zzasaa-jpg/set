const express = require("express");
const app = express();
const PORT = 9090;

let taskRunning = false;
let taskProgress = 0; // Store task progress

// Serve static files
app.use(express.static("public")); // Ensure your static files (like HTML) are accessible

// Start the task
app.post("/start-task", (req, res) => {
    if (taskRunning) {
        return res.status(400).send("Task is already running.");
    }

    taskRunning = true;
    taskProgress = 0;

    // Simulate a long-running task
    const interval = setInterval(() => {
        taskProgress += 1000; // Increment task progress

        console.log(`Task progress: ${taskProgress} ms`);

        if (taskProgress >= 120000) { // After 120 seconds (2 minutes)
            clearInterval(interval);
            taskRunning = false;
            console.log("Task completed");
        }
    }, 1000);

    res.send("Task started in the background.");
});

// Endpoint for checking task progress
app.get("/task-progress", (req, res) => {
    res.json({ progress: taskProgress });
});

// Listen on the specified port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
