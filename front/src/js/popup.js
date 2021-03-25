class Popup {
    constructor(props) {
        this.title = props.title
        this.el = document.createElement("div")
        this.el.className = "popup"
        this.el.id = "popup"
        document.body.append(this.el)

        this.el.insertAdjacentHTML('afterbegin', `
            <div class="popup-overlay">
                <div class="popup-window">
                    <div class="popup-header">
                        <span class="popup-title">${this.title}</span>
                        <span class="popup-close" id="popup-close">&times;</span>
                    </div>
                    <div class="popup-content" id="popup-content"></div>
                    <div class="popup-buttons">
                        <button><a href="#">Cancel</a></button>
                        <button class="submit-edited" id="submit-edited"><a href="#">Ok</a></button>
                    </div>
                </div>
            </div>`)

        document.getElementById("popup-close").addEventListener('click', this.close.bind(this))
    }
    show() {
        this.el.className = "popup popup-visible"
        console.log("Let's show the popup!!!")
    }
    close() {
        this.el.classList.remove("popup-visible")
        document.querySelector(".edit-form").remove()
    }
    isClosed() {
        return !this.el.classList.contains("popup-visible")
    }
}

export { Popup }
