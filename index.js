let tasks = {
    tasks: [],
    addTask: () => {
        console.log('hi from addTask');

        // Create a new task object instead of modifying the existing one
        let newTask = {
            taskId: tasks.tasks.length + 1,
            taskName: document.getElementById("txtTaskName").value,
            priority: document.getElementById("ddlPriority").value,
            dueDate: document.getElementById("txtDate").value,
            description: document.getElementById("txtDescription").value
        };

        console.log(newTask);
        tasks.tasks.push(newTask);
        tasks.savetasks();
        tasks.showTasks(); // Refresh the task list display
    },
    showTasks: () => {
        let taskList = document.getElementById("taskList");
        taskList.innerHTML = ""; // Clear previous tasks
    
        tasks.tasks.forEach(task => {
            let li = document.createElement("li");
            li.className = task.priority;    
            li.ondblclick=()=>{
                
                li.remove()
                tasks.removeTask(task.taskId);
            }
            li.innerHTML = `<strong>${task.taskName}</strong><br>
                            <em>Priority:</em> ${task.priority} <br>
                            <em>Due Date:</em> ${task.dueDate} <br>
                            <em>Description:</em> ${task.description}`;
            taskList.appendChild(li);
        });
    },
    savetasks: () => {
        localStorage.setItem("tasks", JSON.stringify(tasks.tasks));
    },
    loadtasks: () => {
        let storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            tasks.tasks = JSON.parse(storedTasks);
            tasks.showTasks();
        }
    },
    removeTask: (taskId) => {
        tasks.tasks = tasks.tasks.filter(task => task.taskId !== taskId);
        tasks.savetasks();
        tasks.showTasks();
    }

};

// Attach event listener (uncomment and ensure button ID matches)
tasks.loadtasks();
document.getElementById("btnSave").addEventListener("click", tasks.addTask);
