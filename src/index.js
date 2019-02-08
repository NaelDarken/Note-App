
// Import modules
import {

    notes,

    search,

    saveData,

    renderData

} from './functions'

// Import libraries
import uuid4 from 'uuid/v4'
import moment from 'moment'

// Rendering notes
renderData(notes, search)

// Create notes
const createBtn = document.querySelector('#createNote')
createBtn.addEventListener("click", () => { // Create button event listener

    // Created date
    const date = moment().valueOf()
    // Note id
    const noteId = uuid4()
    // Create item into our data
    notes.push({
        id: noteId,
        title: '',
        body: '',
        createdDate: date,
        updatedDate: date

    })

    // Sava the data
    saveData('noteData', notes)

    // Render data
    renderData(notes, search)

    // Assign the location
    const createHref = `./note.html#${noteId}`
    location.assign(createHref)

})

// Search input
const input = document.querySelector('#search-text')
input.addEventListener('input', function() { // Search notes event listener
    
    search.searchInput = this.value
    renderData(notes, search)

})

// Syncing data
window.addEventListener('storage', event => { // Using local storage

    if (event.key === "noteData") {

        notes = JSON.parse(event.newValue)
        renderData(notes, search)

    } else {

        throw new Error("Something wrong on our database")

    }

})

// Filtering note
const filtering = document.querySelector('#filtering')
filtering.addEventListener('change', event => {

    search.sortBy = event.target.value
    renderData(notes, search)

})
