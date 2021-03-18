import { Toast } from "./toast.js"

document.addEventListener("DOMContentLoaded", function() {
    Toast.init()

    getTasksList({ urgency__in: "1" })
        .then(tasks => {
            renderList(document.getElementById("tasks-list-1"), tasks)
        })
    getTasksList({ urgency__in: "2,3" })
        .then(tasks => {
            renderList(document.getElementById("tasks-list-2"), tasks)
        })
    getTasksList({ urgency__in: "4,5" })
        .then(tasks => {
            renderList(document.getElementById("tasks-list-3"), tasks)
        })           
})

window.removeTask = function removeTask(id) {
    axios.delete(`http://localhost:3000/tasks/${id}`)
    .then(() => {
        document.getElementById(`task-${id}`).remove()
        Toast.show(`Task "${id}" has been successfully deleted.`, "success")
    })
    .catch(error => {
        console.log(error)
        Toast.show(`Failed to delete task "${id}".`, "error")
    })
}

function getTasksList(filters) {
    return axios.get('http://localhost:3000/tasks', {
        params: { 
            sort: "-updatedAt",
            ...filters
        }
    })
    .then(response => response.data) 
    .catch(error => {
        console.log(error)
    })
}

function renderList(rootElement, tasks) {
    for(let task of tasks) {
        let taskElement = document.createElement('div')
        taskElement.className = "task"
        taskElement.setAttribute("id", `task-${task._id}`)

        let taskContent = document.createElement('div')
        taskContent.className = "task-content"
        taskContent.innerHTML = `<p>ID: ${task._id}</p>
                                <p>Title: ${task.title}</p>
                                <p>Description: ${task.description}</p>
                                <p>Urgency: P${task.urgency}</p>
                                <p>Last Updated: ${new Date(task.updatedAt).toLocaleString()}</p>`      
        taskElement.append(taskContent)

        let taskActions = document.createElement('div')
        taskActions.className = "task-actions"
        taskActions.innerHTML = `<div class="task-action">
                                    <button onclick=removeTask("${task._id}")>
                                        <a href="#">
                                        <img src="https://img.icons8.com/material-rounded/24/000000/filled-trash.png"/>
                                        </a>
                                    </button>
                                </div>
                                <div class="task-action">
                                    <button>
                                        <a href="#">
                                            <img src="https://img.icons8.com/metro/26/000000/pencil.png"/>                                                </a>
                                    </button>
                                </div>` 
        taskElement.append(taskActions)
        rootElement.append(taskElement) 
    }
}
