document.addEventListener("DOMContentLoaded", function() { 
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', function(e) {
        const titleValue = document.getElementById("title").value
        const descriptionValue = document.getElementById("description").value
        const urgencyValue = document.getElementById("urgency").value        
        axios.post('http://localhost:3000/tasks', {
            title: titleValue,
            description: descriptionValue,
            urgency: urgencyValue
          })
          .then(function (response) {
            window.location.replace('index.html')
            console.log("sfdsfgdg")
          })
          .catch(function (error) {
            console.log(error);

          });
    });
});
