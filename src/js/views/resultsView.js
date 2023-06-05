import View from "./View"
import previewView from "./previewView"

class resultsViews extends View {
  _parentElement = document.querySelector('.search-results-list')
  _message = 'Recipe not found, try again with another ingredient!'

  _createMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('')
  }

}

export default new resultsViews()