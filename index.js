const tasks = JSON.parse(localStorage.getItem('tasks')) || [
    {
        id: 1,
        priority: 1,
        content: "Task-1"
    },
    {
        id: 2,
        priority: 2,
        content: "Task-2"
    },
    {
        id: 3,
        priority: 3,
        content: "Task-3"
    },
];

let newTask = {
    id: '',
    priority: 1,
    content: '',
}

const priorityFilters = document.querySelectorAll('.filters .priority');
const showAllButton = document.querySelector('.show-all');
const createIcon = document.querySelector('.create-icon');
const taskContainerRef = document.querySelector('.task-container');
const taskModal = document.querySelector('.task-modal');
const taskCloseButton = document.querySelector('.close-btn');
const prioritiesList = document.querySelectorAll('.task-modal .priority');
const textareaRef = taskModal.querySelector('textarea');

renderTasks(tasks);

priorityFilters.forEach(priorityRef => {
    priorityRef.addEventListener('click', function () {

        priorityFilters.forEach(ref => {
            ref.classList.remove('selected');
        })

        this.classList.toggle('selected');

        applyPriorityFilter(this.getAttribute('data-priority'));
    })
})

prioritiesList.forEach(priorityRef => {
    priorityRef.addEventListener('click', function () {

        prioritiesList.forEach(ref => {
            ref.classList.remove('selected');
        })

        this.classList.toggle('selected');
        newTask.priority = this.getAttribute('data-priority');
    })
})

showAllButton.addEventListener('click', function () {
    renderTasks(tasks);
})

textareaRef.addEventListener('keyup', e => {

    if (e.key == "Enter") {
        tasks.push(newTask);
        saveToLocalStorage();
        newTask = { id: '', priority: 1, content: '' };
        textareaRef.value = '';
        renderTasks(tasks);
        closeTaskModal();
    }

    else {
        newTask.content = e.target.value;
    }
})

createIcon.addEventListener('click', function () {
    newTask.id = Math.round(Math.random() * 100);
    taskModal.classList.toggle('hide');
})

taskCloseButton.addEventListener('click', function () {
    closeTaskModal();
})

function applyPriorityFilter(priority) {

    const allTasks = document.querySelectorAll('.task');

    allTasks.forEach(task => {

        const taskPriority = task.querySelector('.task-priority').getAttribute('data-priority');

        if (taskPriority == priority)
            task.style.display = "block";

        else
            task.style.display = "none";
    })
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function closeTaskModal() {
    taskModal.classList.add('hide');
}

function removeTask(id) {
    const idx = tasks.findIndex(ele => ele.id == id);

    if (idx != -1)
        tasks.splice(idx, 1);

    saveToLocalStorage();
    renderTasks(tasks);
}

function renderTasks(tasks) {
    taskContainerRef.innerHTML = ``;
    tasks.forEach(task => {
        const taskRef = createTask(task.id, task.priority, task.content);
        taskContainerRef.appendChild(taskRef);
    })
}

function createTask(id, priority, content) {
    const taskRef = document.createElement('div');
    taskRef.classList.add('task');
    taskRef.innerHTML = `
            <div class="task-priority priority p${priority}" data-priority="${priority}">${priority}</div>
            <div class="task-id">#${id}</div>
            <div class="task-content">
                ${content}
            </div>
            <i class="fa-solid fa-trash delete-icon"></i>
    `;

    const deleteIcon = taskRef.querySelector('.delete-icon');

    deleteIcon.addEventListener('click', (e) => {
        removeTask(id);
    });

    return taskRef;
}