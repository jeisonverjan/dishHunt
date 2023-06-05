import View from './View'

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload')
  _overlayEle = document.querySelector('.overlay')
  _recipeWindowEle = document.querySelector('.add-recipe-window')
  _addRecipeBtn = document.querySelector('.add-recipe-btn')
  _closeRecipeBtn = document.querySelector('.close-recipe-btn')
  _formIngredientsContainer = document.querySelector('.form-ingredients-container')
  _uploadIngredientsEle = document.querySelector('.upload__ingredients')
  _counterIngredients = 0
  _message = 'The recipe was added successfully!'

  constructor() {
    super()
    this._addHandlerNewIngredient()
    this._addHandlerDeleteIngredient()
    this._addHandlerShowWindow()
    this._addHandlerCloseWindows()
  }

  toggleHiddenClass() {
    this._overlayEle.classList.toggle('hidden')
    this._recipeWindowEle.classList.toggle('hidden')
  }

  _addHandlerNewIngredient() {
    this._uploadIngredientsEle.addEventListener('click', (e) => {
      e.preventDefault()
      this._counterIngredients += 1
      const markUp = this._createIngredientMarkup()
      const btn = e.target.closest('.add-ingredient-btn')
      if (!btn) return
      this._formIngredientsContainer.insertAdjacentHTML('beforeend', markUp)
    })
  }

  _addHandlerDeleteIngredient() {
    this._formIngredientsContainer.addEventListener('click', (e) => {
      e.preventDefault()
      const btn = e.target.closest('.delete-ingredient')
      if (!btn) return
      btn.parentElement.remove()
    })
  }

  _addHandlerShowWindow() {
    this._addRecipeBtn.addEventListener('click', this.toggleHiddenClass.bind(this))

  }

  _addHandlerCloseWindows() {
    this._closeRecipeBtn.addEventListener('click', this.toggleHiddenClass.bind(this))
    this._overlayEle.addEventListener('click', this.toggleHiddenClass.bind(this))
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', (e) => {
      e.preventDefault()

      const dataArr = [...new FormData(this._parentElement)]
      //const data = Object.fromEntries(dataArr)

      //upload new recipe data
      handler(dataArr)
      location.reload()
    })
  }

  _createIngredientMarkup() {
    return `
        <div class="ingredient-item">
        <input
          class="quantity-input"
          name="quantity[${this._counterIngredients}]"
          type="number"
          placeholder="quantity"
          step="any"
          required
          min="0.1"
        />
        <select name="unit[${this._counterIngredients}]" class="unit-select">
            <option value="">Unit</option>
            <option value="tsp">tsp</option>
            <option value="tbsp">tbsp</option>
            <option value="cup">cup</option>
            <option value="oz">oz</option>
            <option value="lb">lb</option>
            <option value="g">g</option>
            <option value="kg">kg</option>
            <option value="ml">ml</option>
            <option value="l">l</option>
        </select>
        <input
          class="description-input"
          name="description[${this._counterIngredients}]"
          type="text"
          placeholder="description"
          required
        />
        <button class="delete-ingredient">
          <i class="fa-solid fa-trash-can icon-btn"></i>
        </button>
      </div>`
  }

}

export default new addRecipeView()