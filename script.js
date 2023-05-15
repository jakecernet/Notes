// Retrieve existing notes from local storage
let notes = JSON.parse(localStorage.getItem('notes')) || [];

count = 0;

// Display existing notes
function displayNotes() {
    const notesContainer = document.getElementById('notes');
    notesContainer.innerHTML = '';

    if (notes.length === 0) {
        notesContainer.innerHTML = '<h2>No notes yet</h2>';
        count = 0;
    } else {
        notes.forEach(function (note, index) {
            const noteElement = document.createElement('div');
            noteElement.className = 'note';
            noteElement.innerHTML = `
                <span>${count} + ${note}</span>
                <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
            `;
            notesContainer.appendChild(noteElement);
        });
    }
}

// Add a new note
function addNote() {
    const noteInput = document.getElementById('note-input');
    const noteText = noteInput.value.trim();

    if (noteText !== '') {
        notes.push(noteText);
        localStorage.setItem('notes', JSON.stringify(notes));
        noteInput.value = '';
        displayNotes();
    }
}

// Delete a note
function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

// Event listeners
document.getElementById('add-btn').addEventListener('click', addNote);
document.addEventListener('DOMContentLoaded', displayNotes);
