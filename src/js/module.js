import { API_URL, RES_PER_PAGE, API_KEY } from "./config"
import { AJAX } from "./helpers"

export const state = {
    recipe: {},
    searchResults: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE
    },
    bookmarks: []
}

export const loadRecipe = async (id) => {
    try {
        const { data } = await AJAX(`${API_URL}/${id}?key=${API_KEY}`)

        //modifying recipe object
        state.recipe = data.recipe

        //if the recipe exists in bookmarks array
        if (state.bookmarks.some(bookmark => bookmark.id === id))
            state.recipe.bookmarked = true
        else state.recipe.bookmarked = false

    } catch (error) {
        throw error
    }
}

export const loadSearchResults = async (query) => {
    try {
        state.searchResults.query = query
        const { data } = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`)
        state.searchResults.results = data.recipes
        state.searchResults.page = 1
    } catch (error) {
        throw error
    }
}

export const getSearchResultPage = (page = state.searchResults.page) => {
    state.searchResults.page = page

    const start = (page - 1) * state.searchResults.resultsPerPage
    const end = page * state.searchResults.resultsPerPage

    return state.searchResults.results.slice(start, end)
}

export const updateServings = (newServings) => {
    state.recipe.ingredients.forEach(ingr => {
        ingr.quantity = ingr.quantity * newServings / state.recipe.servings
    })
    state.recipe.servings = newServings
}

const persistsBookmarks = () => {
    // Save bookmarks on local storage
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
}

export const addBookmark = (recipe) => {
    // Add bookmark
    state.bookmarks.push(recipe)

    // Mark current recipe as bookmarked
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true

    // Save bookmarks on local storage
    persistsBookmarks()
}

export const removeBookmark = (id) => {
    // Delete bookmark
    state.bookmarks = state.bookmarks.filter(recipe => recipe.id !== id)

    // Save bookmarks on local storage
    persistsBookmarks()

    // Mark current recipe as NOT bookmarked
    if (id === state.recipe.id) state.recipe.bookmarked = false
}

const init = () => {
    const storage = JSON.parse(localStorage.getItem('bookmarks'))
    if (storage) state.bookmarks = storage
}
init()

//debugging
const clearBookmarks = () => {
    localStorage.clear('bookmarks')
}
//clearBookmarks()

export const uploadRecipe = async (newRecipe) => {
    try {
        //Converting ingredients form data into ingredients array
        const ingredients = newRecipe
            .filter(item => item[0].includes('quantity') || item[0].includes('unit') || item[0].includes('description'))
            .reduce((acc, _, index, arr) => {
                if (index % 3 === 0) {
                    const [quantity, unit, description] = arr.slice(index, index + 3).map(entry => entry[1].trim());
                    acc.push({ quantity, unit, description });
                }
                return acc;
            }, []);
        
        // Creating recipe object
        //convert the newRecipe Array into an object
        newRecipe = Object.fromEntries(newRecipe)

        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients
        }
        // Sending recipe to the API
        const response = await AJAX(`${API_URL}?key=${API_KEY}`, recipe)

        // Setting new recipe as current recipe
        state.recipe = response.data.recipe

        // Setting key attribute to the new recipe
        state.recipe.key = response.data.recipe.key

        // Setting new recipe as bookmarked
        addBookmark(state.recipe)
    } catch (error) {
        throw error
    }
}