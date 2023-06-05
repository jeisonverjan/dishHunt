import * as module from "./module"
import recipeView from "./views/recipeView"
import searchView from "./views/searchView"
import resultsView from "./views/resultsView"
import paginationView from "./views/paginationView"
import bookmarksView from "./views/bookmarksView"
import addRecipeView from "./views/addRecipeView"
import { CLOSE_WINDOW_SEC } from "./config"

const controlRecipe = async () => {
    
    try {
        //find recipe ID
        const id = window.location.hash.slice(1)
        if (!id) return

        //show spinner
        recipeView.renderSpinner()

        //update result view to mark selected search result
        resultsView.update(module.getSearchResultPage())
                
        //load recipe
        await module.loadRecipe(id)
        
        //render recipe
        recipeView.render(module.state.recipe)
        //scroll up
        recipeView.scrollUp()

        //update bookmarks view
        bookmarksView.update(module.state.bookmarks)
    } catch (error) {
        recipeView.renderMessage(error)
        console.error(error)
    }
}

const controlSearchResults = async () => {
    try {
        
        //get data from search input
        const query = searchView.getQuery()
        if(!query) return
        
        //Show spinner
        resultsView.renderSpinner()
        
        //search into the API
        await module.loadSearchResults(query)

        //render results on the page
        resultsView.render(module.getSearchResultPage())

        //render initial pagination buttons
        paginationView.render(module.state.searchResults)

    } catch (error) {
        resultsView.renderMessage(error)
        console.error(error)
    }
}

const controlPagination = (goToPage) =>{
    //Show spinner
    resultsView.renderSpinner()
    //render NEW results on the page
    resultsView.render(module.getSearchResultPage(goToPage))
    //render NEW pagination buttons
    paginationView.render(module.state.searchResults)
}

const controlServings = (newServings) => {
    // update the recipe servings on state object
    module.updateServings(newServings)

    // update the recipe view
    recipeView.update(module.state.recipe)
}

const controlAddBookmark = () => {
    try {
        // Add or remove bookmark
        if(!module.state.recipe.bookmarked) 
            module.addBookmark(module.state.recipe)
        else module.removeBookmark(module.state.recipe.id)
        
        // Update recipe box
        recipeView.update(module.state.recipe)

        //render bookmarks
        bookmarksView.render(module.state.bookmarks)
    } catch (error) {
        bookmarksView.renderMessage(error)
        console.error(error)
    }
    
}

const controlBookmarksRender = () => {
    bookmarksView.render(module.state.bookmarks)
}

const controlRecipeUpload = async (newRecipe) => {
    try {
        //Render spinner
        addRecipeView.renderSpinner()

        //Upload the new recipe data
        await module.uploadRecipe(newRecipe)
        
        //render NEW recipe
        recipeView.render(module.state.recipe)
        //scrollUp
        recipeView.scrollUp()

        //update bookmarks view
        bookmarksView.render(module.state.bookmarks)

        //success Message
        addRecipeView.renderMessage(undefined,true)

        // Change ID in URL
        window.history.pushState(null, '', `#${module.state.recipe.id}`);

        //Close add recipe window
        setTimeout(() => {
            addRecipeView.toggleHiddenClass()
        }, CLOSE_WINDOW_SEC * 1000);
    } catch (error) {
        alert(error)
    }
}

const appInit = () => {
    bookmarksView.addHandlerRender(controlBookmarksRender)
    recipeView.addHandlerRender(controlRecipe)
    recipeView.addHandlerServings(controlServings)
    recipeView.addHandlerAddBookmark(controlAddBookmark)
    searchView.addHandlerSearch(controlSearchResults)
    paginationView.addHandlerClick(controlPagination)
    addRecipeView.addHandlerUpload(controlRecipeUpload)
}

appInit()