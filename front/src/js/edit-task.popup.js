import {Popup} from "./popup.js";

class EditTaskPopup extends Popup {
    constructor() {
        super({ title: "Edit Task" })
        document.getElementById("submit-edited").addEventListener("click", () => {
            axios.put(`http://localhost:3000/tasks/${this.taskId}`, {
                title: document.getElementById("title").value,
                description: document.getElementById("description").value,
                urgency: document.getElementById("urgency").value
            })
                .then(response => {
                    this.updatedTask = response.data
                    this.close()
                })
                .catch(error => console.log(error))
        })
    }

    show(id) {
        this.updatedTask = null
        this.taskId = id
        super.show()
        axios.get(`http://localhost:3000/tasks/${id}`)
            .then(response => {
                console.log(response.data)
                let popupContent = document.getElementById("popup-content")
                popupContent.insertAdjacentHTML('afterbegin', `
                <form class="edit-form">
                    <input id="title" type="text" value="${response.data.title}" placeholder="Type title here..." required>
                    <input id="description" type="text" value="${response.data.description}" placeholder="Type description here..." required>
                    <input id="urgency" type="text" value="${response.data.urgency}" placeholder="Type urgency here..." disabled required>
                </form>`)
            })
            .catch(error => console.log(error))
    }
}

export { EditTaskPopup }
