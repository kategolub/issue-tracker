import { Toast } from "./toast.js"
import { EditTaskPopup } from "./edit-task.popup.js"

let toast, editTaskPopup

document.addEventListener("DOMContentLoaded", function() {
    toast = new Toast()
    editTaskPopup = new EditTaskPopup()
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
    let res = confirm(`Do you really want to remove the ${id}?`)
    if (res) {
        axios.delete(`http://localhost:3000/tasks/${id}`)
            .then(() => {
                removeTaskFromDOM(id)
                toast.show(`Task "${id}" has been successfully deleted.`, "success")
            })
            .catch(error => {
                console.log(error)
                toast.show(`Failed to delete task "${id}".`, "error")
            })
    }
}
window.editTask = function editTask(id) {
    editTaskPopup.show(id)
    let timer = setInterval(() => {
        if (editTaskPopup.isClosed()) {
            clearInterval(timer)
            if(editTaskPopup.updatedTask) {
                console.log("editTaskPopup.updatedTask", editTaskPopup.updatedTask)
                let filters, tasksListId

                switch (editTaskPopup.updatedTask.urgency){
                    case 1:
                        filters = { urgency__in: "1" }
                        tasksListId = "tasks-list-1"
                        break
                    case 2:
                    case 3:
                        filters = { urgency__in: "2,3" }
                        tasksListId = "tasks-list-2"
                        break
                    case 4:
                    case 5:
                        filters = { urgency__in: "4,5" }
                        tasksListId = "tasks-list-3"
                        break
                }
                getTasksList(filters)
                    .then(tasks => {
                        document.getElementById(tasksListId).innerHTML = ""
                        renderList(document.getElementById(tasksListId), tasks)
                    })
                toast.show(`Task updated`, `success`)
            }
            console.log("Popup Close")
        }
    }, 500)

}
    function removeTaskFromDOM(id) {
        document.getElementById(`task-${id}`).remove()
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
                                    <button onclick=editTask("${task._id}")>
                                        <a href="#">
                                            <img src="https://img.icons8.com/metro/26/000000/pencil.png"/>  
                                        </a>
                                    </button>
                                </div>` 
        taskElement.append(taskActions)
        rootElement.append(taskElement) 
    }
}
