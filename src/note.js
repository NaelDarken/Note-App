
// Import modules
import {

    notes,

    saveData,

    delNote,

    updateDate

} from './functions'

// Import libraries
import moment from 'moment'

// Get note id
const noteId = location.hash.substr(1)

// Selected note id
const theNote = notes.find(note => note.id === noteId)

!theNote ? location.assign('./index.html') : true

// Document title
document.title = theNote.title

// Date element
const noteUpdatedDate = document.querySelector('#createdDate')
noteUpdatedDate.textContent = updateDate(theNote.updatedDate)

// Note inputs
const theNoteTitleInput = document.querySelector('#noteTitle')
theNoteTitleInput.value = theNote.title || "Rename your note"

const theNoteBodyInput = document.querySelector('#noteBody')
theNoteBodyInput.value = theNote.body

// Update note title
theNoteTitleInput.addEventListener('input', function() {

    theNote.title = this.value
    theNote.updatedDate = moment().valueOf()
    // Sava the data
    saveData('noteData', notes)
    // Document title
    document.title = theNote.title
    // Show updated date
    noteUpdatedDate.textContent = updateDate(theNote.updatedDate)

})

// Update note body
theNoteBodyInput.addEventListener('input', function() {

    theNote.body = this.value
    theNote.updatedDate = moment().valueOf()
    // Sava the data
    saveData('noteData', notes)
    // Show updated date
    noteUpdatedDate.textContent = updateDate(theNote.updatedDate)

})

// Delete note
const removeBtn = document.querySelector('#removeNote')
removeBtn.addEventListener('click', () => {

    delNote(noteId)
    saveData('noteData', notes)
    location.assign('./index.html')

})

// Syncing data
window.addEventListener('storage', event => {

    if (event.key === "noteData") {

        notes = JSON.parse(event.newValue)
        const newNote = notes.find(note => note.id === noteId)

        document.title = newNote.title
        theNoteTitleInput.value = newNote.title
        theNoteBodyInput.value = newNote.body
        noteUpdatedDate.textContent = updateDate(theNote.updatedDate)

    } else {

        throw new Error("Something wrong on our database")

    }

})
