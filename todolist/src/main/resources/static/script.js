const API_URL = "http://localhost:8081/api/tasks";

const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");

// Fetch and display tasks
async function fetchTasks() {
    try {
        const res = await fetch(API_URL);
        const tasks = await res.json();
        taskList.innerHTML = "";

        tasks.forEach(task => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";

            li.innerHTML = `
                <span id="taskTitle${task.id}" style="text-decoration: ${task.completed ? "line-through" : "none"}">
                    ${task.title}
                </span>
                <div>
                    <button class="btn btn-sm btn-success me-2">${task.completed ? "Undo" : "Done"}</button>
                    <button class="btn btn-sm btn-primary me-2">Update</button>
                    <button class="btn btn-sm btn-danger">Delete</button>
                </div>
            `;

            const buttons = li.querySelectorAll("button");

            // Done/Undo button
            buttons[0].addEventListener("click", () => toggleComplete(task.id, task.completed, task.title));

            // Update button
            buttons[1].addEventListener("click", () => editTask(task.id, task.title));

            // Delete button
            buttons[2].addEventListener("click", () => deleteTask(task.id));

            taskList.appendChild(li);
        });
    } catch (err) {
        console.error("Error fetching tasks:", err);
    }
}

// Add a new task
addBtn.addEventListener("click", async () => {
    const title = taskInput.value.trim();
    if (!title) return;

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, completed: false })
        });
        taskInput.value = "";
        fetchTasks();
    } catch (err) {
        console.error("Error adding task:", err);
    }
});

// Toggle task completion
async function toggleComplete(id, completed, title) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: title, completed: !completed })
        });
        fetchTasks();
    } catch (err) {
        console.error("Error toggling task:", err);
    }
}

// Edit task title
async function editTask(id, oldTitle) {
    const newTitle = prompt("Update task title:", oldTitle);
    if (!newTitle || newTitle.trim() === "") return;

    try {
        // Fetch current task to preserve completed status
        const res = await fetch(API_URL);
        const tasks = await res.json();
        const task = tasks.find(t => t.id === id);

        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newTitle.trim(), completed: task.completed })
        });
        fetchTasks();
    } catch (err) {
        console.error("Error editing task:", err);
    }
}

// Delete task
async function deleteTask(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        fetchTasks();
    } catch (err) {
        console.error("Error deleting task:", err);
    }
}

// Initial load
fetchTasks();
