// Retrieve existing notes from local storage
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Display existing notes
function displayNotes() {
    const notesContainer = document.getElementById('notes');
    notesContainer.innerHTML = '';

    if (notes.length === 0) {
        notesContainer.innerHTML = '<p>No notes yet</p>';
    } else {
        notes.forEach(function (note, index) {
            const noteElement = document.createElement('div');
            noteElement.className = 'note';
            noteElement.innerHTML = `
                <span class="note-number">${index + 1}.</span>
                <span>${note}</span>
                <button class="edit-btn" onclick="editNote()">Edit</button>
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
document.getElementById('note-input').addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        addNote();
    }
});

//listen for enter key
document.getElementById('note-input').addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        addNote();
    }
});

// Initial display of notes
displayNotes();

function editNote() {
    const noteInput = document.getElementById('note-input');
    const noteText = noteInput.value.trim();
    noteInput.value = noteText;
    noteInput.focus();
}