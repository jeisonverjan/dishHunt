import View from "./View"

class paginationView extends View {

    _parentElement = document.querySelector('.pagination')

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', (event) => {
            const btn = event.target.closest('.pagination-btn')
            if (!btn) return

            const goToPage = +btn.dataset.goto
            handler(goToPage)
            this._scrollUpPagination()
        })
    }

    _scrollUpPagination() {
        document.body.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
 
    _createMarkup() {
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage)

        //page 1, and there are other pages
        if (this._data.page === 1 && numPages > 1) {
            return this._generateNextBtn()
        }

        //last page
        if (this._data.page === numPages && numPages > 1) {
            return this._generatePreviousBtn()
        }
        //other page    
        if (this._data.page < numPages) {
            return `${this._generatePreviousBtn()} <div class="pagination-numpages">${this._data.page}/${numPages}</div> ${this._generateNextBtn()}`
        }

        //page 1, and there are no others pages

        return ``

    }
    _generatePreviousBtn() {
        return `
        <button data-goto = "${this._data.page - 1}" class="pagination-btn pagination-btn-prev">
            <i class="fa-solid fa-arrow-left-long"></i>
            <span>Page ${this._data.page - 1}</span>
        </button>`
    }
    _generateNextBtn() {
        return `
            <button data-goto = "${this._data.page + 1}" class="pagination-btn pagination-btn-next">
                <span>Page ${this._data.page + 1}</span>
                <i class="fa-solid fa-arrow-right"></i>
            </button>`
    }
}

export default new paginationView()