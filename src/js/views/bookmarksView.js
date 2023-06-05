import View from "./View"
import previewView from "./previewView"

class bookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks-list')
    _message = 'No bookmarks yet! find your favorite recipe!!'

    addHandlerRender(handler){
      window.addEventListener('load', handler())
    }

    _createMarkup() {
    return this._data.map(bookmark => previewView.render(bookmark, false)).join('')
  }
}

export default new bookmarksView()