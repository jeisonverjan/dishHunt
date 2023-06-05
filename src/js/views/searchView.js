class searchView {
    #parentElement = document.querySelector('.header-form')

    getQuery(){
        const query = this.#parentElement.querySelector('.search-input').value
        this.#clearInput()
        return query
    }
    #clearInput(){
        this.#parentElement.querySelector('.search-input').value = ''
    }
    addHandlerSearch(handler){
        this.#parentElement.addEventListener('submit', (e)=>{
            e.preventDefault()
            handler()
        })
    }
}

export default new searchView()