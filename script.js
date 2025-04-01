// Get the task input, add task button, and task list elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Define the tasks array (use localStorage to persist tasks)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to add a task
function addTask(task) {
    tasks.push(task);
    saveTasks();
    renderTaskList();
}

// Function to render the task list
function renderTaskList() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''}>
            <span>${task.text}</span>
            <button class="delete-btn">Delete</button>
        `;
        taskList.appendChild(taskItem);

        // Toggle completion state
        taskItem.querySelector('input[type="checkbox"]').addEventListener('change', () => {
            task.completed = !task.completed;
            saveTasks();
            renderTaskList();
        });

        // Delete task
        taskItem.querySelector('.delete-btn').addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTaskList();
        });
    });
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add event listener to add task button
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTask({ text: taskText, completed: false });
        taskInput.value = '';
    }
});

// Add event listener for Enter key to add task
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTaskBtn.click();
    }
});

// Initial render of tasks
renderTaskList();
