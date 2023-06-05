import View from "./View";

class recipeView extends View {
  _parentElement = document.querySelector(".recipe-container");
  _message = 'We could not find that specific recipe!'


  addHandlerRender(handler) {
    //catching the url change
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler))
  }
  addHandlerServings(handler) {
    this._parentElement.addEventListener('click', (event) => {
      const btn = event.target.closest('.servings-btn')
      if (!btn) return
      const updateTo = +btn.dataset.updateTo
      if(updateTo === 0 || updateTo === 31) return
      handler(updateTo)
    })
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', (event) => {
      const btn = event.target.closest('.add-bookmark-btn')
      if(!btn) return
      handler()
    })
  }

  _createMarkup() {
    return `
        <div class="recipe-img">
        <img src="${this._data.image_url}" alt="recipe image" />
      </div>
      <div class="recipe-header">
        <div class="recipe-title">
          <h2>${this._data.title}</h2>
        </div>
        <div class="recipe-description">
          <div class="recipe-time-servings">
            <span class="recipe-time-box">
              <i class="fa-solid fa-clock"></i>
              <span class="recipe-time bold">${this._data.cooking_time}</span> MINUTES
            </span>
            <span class="recipe-servings-box">
              <span>
                <i class="fa-solid fa-user-group"></i>
                <span class="recipe-servings bold">${this._data.servings}</span> SERVINGS
                <div class="servings-btns">
                  <button class="servings-btn" data-update-to = "${this._data.servings + 1}">
                  <i class="fa-solid fa-person-circle-plus icon-btn " ></i>
                  </button>
                  <button class="servings-btn" data-update-to = "${this._data.servings - 1}">
                  <i class="fa-solid fa-person-circle-minus icon-btn"></i>
                  </button>
                </div>
              </span>
            </span>
            <div class="recipe-bookmarked">
              <div class="${this._data.key ? '' : 'hidden'}">
                <i class="fa-solid fa-user bookmarked-btn"></i>
              </div>
              <div>
                <button class="add-bookmark-btn">
                  <i class="fa-solid fa-star icon-btn add-bookmark ${this._data.bookmarked ? 'bookmarked-btn': ''}"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="recipe-ingredients">
        <h2>RECIPE INGREDIENTS</h2>
        <ul class="recipe-ingredients-list">
          ${this._createMarkupIngredient()}
        </ul>
      </div>
      <div class="recipe-directions recipe-ingredients">
        <h2>HOW TO COOK IT</h2>
        <p>
          This recipe was carefully designed and tested by
          <span class="recipe-publisher bold">${this._data.publisher}.</span>
          Please check out directions at their website.
        </p>
        <a
          href="${this._data.source_url}"
          class="main-btn directions-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Directions</span><i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
        `
  }
  _createMarkupIngredient() {
    return this._data.ingredients.map((ingredient) => {
      return `
          <li class="recipe-ingredient">
            <i class="fa-solid fa-check"></i>
            <span class="quanity">
                ${ingredient.quantity ? (ingredient.quantity % 1 !== 0 ? ingredient.quantity.toFixed(1) : ingredient.quantity) : ''}
            </span>
            <span class="unit">${ingredient.unit}</span>
            <span class="description">${ingredient.description}</span>
          </li>`
    }).join('')
  }
}

export default new recipeView();
