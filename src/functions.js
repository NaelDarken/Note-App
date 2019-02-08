
// Import libraries
import moment from 'moment'

import {notes, search} from './app-data'

// Save data into the local storage
const saveData = (dataName, arr) => window.localStorage.setItem(dataName, JSON.stringify(arr))

// Delete selected note
const delNote = id => {

    // Select the right note
    const noteIndex = notes.findIndex(item => item.id === id)

    noteIndex > -1 ? notes.splice(noteIndex, 1) : false

}

// Generate note element
const createElement = elem => {

    // DOM elements
    const noteTitle = document.createElement("a")
    noteTitle.classList.add('list-item')
    const content = document.createElement("p")
    content.classList.add('list-item__title')

    // Delete note button
    const status = document.createElement('p')
    status.classList.add('list-item__subtitle')
    status.textContent = updateDate(elem.updatedDate)

    // Show note title
    elem.title.length > 0 ? noteTitle.textContent = elem.title : noteTitle.textContent = "Untitled"

    // Make a note title
    const noteHref = `./note.html#${elem.id}`
    noteTitle.setAttribute('href', noteHref)
    content.appendChild(noteTitle)
    noteTitle.appendChild(status)

    return content

}

// Filter(Sort) notes
const filterNotes = (arr, filter) => {

    if (filter.sortBy === 'lastEdited') { // Sort by: last updated date

        return arr.sort((a, b) => {

            if (a.updatedDate > b.updatedDate) {

                return -1

            } else if (a.updatedDate < b.updatedDate) {

                return 1

            } else {

                return 0

            }

        })

    } else if (filter.sortBy === 'created') { // Sort by: created date

        return arr.sort((a, b) => {

            if (a.createdDate > b.createdDate) {

                return -1

            } else if (a.createdDate < b.createdDate) {

                return 1

            } else {

                return 0

            }

        })

    } else if (filter.sortBy === 'alphabetically') { // Sort by: alphabetically

        return arr.sort((a, b) => {

            if (a.title.toLowerCase() < b.title.toLowerCase()) {

                return -1

            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {

                return 1

            } else {

                return 0

            }

        })

    } else {

        return arr

    }

}

// rendering application data
const renderData = (arr, inputVal) => {

    // Sorting data
    filterNotes(arr, search)

    // Filter data
    const searched = arr.filter(item => item.title.toLowerCase().includes(inputVal.searchInput.toLowerCase()))

    // Data container
    const container = document.querySelector('#notes')
    container.innerHTML = ""

    // Checking searched notes
    if (searched.length > 0) {

        // Data shown
        searched.forEach(list => {

            // Create the dom element
            const listTitle = createElement(list, searched)
            // Append element
            container.appendChild(listTitle)

        })

    } else {

        const message = document.createElement('p')
        message.classList.add('empty-message')
        message.textContent = 'No notes founded!'
        container.appendChild(message)

    }

}

// Update note date
const updateDate = date => {

    return `Edited at: ${moment(date).fromNow()}`

}

// Export modules
export {

    notes,

    search,

    saveData,

    delNote,

    renderData,

    updateDate

}
