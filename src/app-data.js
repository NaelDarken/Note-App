
// Read and get data from the local storage
const getData = dataName => {

    const notesJSON = window.localStorage.getItem(dataName)

    return notesJSON ? JSON.parse(notesJSON) : []

}

// Notes list
let notes = getData('noteData')

// Searching content
const search = {

    searchInput: "",
    sortBy: "lastEdited"

}

export {
    notes,
    search
}
