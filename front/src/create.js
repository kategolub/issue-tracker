document.addEventListener("DOMContentLoaded", function() {  
  const titleInput = document.getElementById("title")
  const descriptionInput = document.getElementById("description")
  const urgencySelect = document.getElementById("urgency")       
  let submitButton = document.getElementById('submit')
  submitButton.setAttribute("disabled", true)
  const formInputs = [titleInput, descriptionInput, urgencySelect]

  submitButton.addEventListener('click', function(e) {
      axios.post('http://localhost:3000/tasks', {
          title: titleInput.value,
          description: descriptionInput.value,
          urgency: urgencySelect.value
        })
        .then(function (response) {
          window.location.assign('index.html')
          console.log("sfdsfgdg")
        })
        .catch(function (error) {
          console.log(error)
        });
  });

  formInputs.forEach(input => addEventListener('input', handleSubmitButton))

  function handleSubmitButton() {
    const disabled = formInputs
      .map(input => input.value)
      .reduce((result, current) => result || !current, false)

    submitButton.disabled = disabled
  }
})
