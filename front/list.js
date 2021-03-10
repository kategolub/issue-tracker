document.addEventListener("DOMContentLoaded", function() { 
    renderList()
});

function renderList(){
    axios.get('http://localhost:3000/tasks', {
            params: { sort: "-updatedAt" }
        })
        .then(function (response) {
            const data = response.data
            console.log(response.data)
            let taskList = document.getElementById("tasks-list")
            for(let i in data) {
                let task = document.createElement('div')
                task.className = "task";  

                let taskContent = document.createElement('div')
                taskContent.className = "task-content";
                taskContent.innerHTML = `<p>ID: ${data[i]._id}</p>
                                        <p>Title: ${data[i].title}</p>
                                        <p>Description: ${data[i].description}</p>
                                        <p>Urgency: ${data[i].urgency}</p>
                                        <p>Last Updated: ${new Date(data[i].updatedAt).toLocaleString()}</p>`;       

                task.append(taskContent);

                let taskActions = document.createElement('div')
                taskActions.className = "task-actions";
                taskActions.innerHTML = `<div class="task-action">
                                            <button onclick=removeTask("${data[i]._id}")>
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
                                    
                task.append(taskActions)
                taskList.append(task)

            }
        })
        .catch(function (error) {
        console.log(error);
        });
}

function removeTask(id) {
    axios.delete(`http://localhost:3000/tasks/${id}`)
      .then(function (response) {
        location.reload();
        return false;
        
      })
      .catch(function (error) {
        console.log(error);
      });

}
