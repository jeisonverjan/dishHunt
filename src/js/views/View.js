export default class View {
    _data

    render(data, results = true) {
        if (!data || Array.isArray(data) && data.length === 0) return this.renderMessage()
        this._data = data
        const markup = this._createMarkup()
        if (!results) return markup
        this._clear() //cleaning html container
        this._parentElement.insertAdjacentHTML("afterbegin", markup)
    }

    scrollUp() {
        this._parentElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    } 

    update(data) {
        this._data = data
        const newMarkup = this._createMarkup()
        //convert markup string into a dom object
        const newDOM = document.createRange().createContextualFragment(newMarkup)
        //getting all elements from newDOM
        const newElements = Array.from(newDOM.querySelectorAll('*'))
        //getting current elements
        const currElements = Array.from(this._parentElement.querySelectorAll('*'))

        //compare newElements with currElements
        newElements.forEach((newEl, index) => {
            const currEle = currElements[index]

            //Update changed TEXT
            if (!newEl.isEqualNode(currEle)
                && newEl.firstChild?.nodeValue.trim() !== '') {
                currEle.textContent = newEl.textContent
            }

            //Update changed ATTRIBUTES
            if (!newEl.isEqualNode(currEle))
                Array.from(newEl.attributes).forEach((attr => {
                    currEle.setAttribute(attr.name, attr.value)
                }))

        })
    }

    /**
     * 
     * @param {String} message default this._message 
     * @param {Boolean} type default false /false if it is an error
     * @returns {undefined}
     */
    renderMessage(message = this._message, type = false) {
        this._clear()
        this._parentElement.insertAdjacentHTML("afterbegin", `
            <div class="alert ${type?'alert-success':'alert-error'}">
              <span class="message"><i class="fa-solid ${type?'fa-heart':'fa-heart-crack'}"></i> ${message}</span>
              <span class="close-btn" onclick="this.parentElement.style.display='none';">&times;</span>
            </div>
            `)
    }
    _clear() {
        this._parentElement.innerHTML = '';
    }
    renderSpinner() {
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', `
                <div class="spinner">
                    <i class="fa-solid fa-spinner"></i>
                </div>
            `)
    }
}

