const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskLists = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

// Load events
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskLists.addEventListener('click', removeTask);
    // Clear tasks
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks
    filter.addEventListener('keyup', filterTasks);
}

// Add Task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add new task');
    } else {
        // Create li
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Append text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append link to li
        li.appendChild(link);

        // Append li to ul
        taskLists.appendChild(li);

        // Store tasks in local storage
        storeTasksInLocalStorage(taskInput.value);

        // Clear input field
        taskInput.value = '';
    }

    e.preventDefault();
}

// Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure ?')) {
            e.target.parentElement.parentElement.remove();

            // Remove task from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Clear Tasks
function clearTasks() {
    if(confirm('Are you sure ?')) {
        // First way
        // taskLists.innerHTML = '';

        // Faster way - https://jsperf.com/innerhtml-vs-removechild/47
        while(taskLists.firstChild) {
            taskLists.removeChild(taskLists.firstChild);
        }

        // Clear tasks from local storage
        clearTasksFromLocalStorage();
    }
}

// Filter Tasks
function filterTasks(e) {
    // Get filter text
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent.toLowerCase();
        if(item.indexOf(text) !== -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

// Local Storage
function storeTasksInLocalStorage(task) {
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        // Create li
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Append text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append link to li
        li.appendChild(link);

        // Append li to ul
        taskLists.appendChild(li);
    });
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        } 
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks From Local Storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}