import View from "./View"

class previewView extends View {
    _parentElement = ''

    _createMarkup() {
        const id = window.location.hash.slice(1)
        return `
            <li class="search-item ${this._data.id === id ? 'search-item-link-active' : ''}">
            <a href="#${this._data.id}" class="search-item-link" alt="${this._data.title}">
              <figure class="search-item-img">
                <img src="${this._data.image_url}" alt="${this._data.title}">
              </figure>
              <div class="search-item-data">
                <h4 class="item-title">${this._data.title}</h4>
                <p class="item-publisher">${this._data.publisher}</p>
              </div>
              <div class="recipe-own ${this._data.key ? '' : 'hidden'}">
                <i class="fa-solid fa-user"></i>
              </div>
            </a>
          </li>
            `
    }
}

export default new previewView()