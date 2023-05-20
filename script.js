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
                <button class="edit-btn" onclick="editNote(${index})">✎</button>
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

// Edit a note
// ...

// Edit a note
function editNote(index) {
    const noteElement = document.getElementById('notes').children[index];
    const noteText = noteElement.querySelector('span:not(.note-number)').textContent;

    // Replace the note text with an input field
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.value = noteText;
    noteElement.replaceChild(inputElement, noteElement.querySelector('span:not(.note-number)'));

    // Replace the Edit button with Save and Cancel buttons
    const editBtn = noteElement.querySelector('.edit-btn');
    editBtn.textContent = 'Save';
    editBtn.onclick = function () {
        saveNoteEdit(index);
    };

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'cancel-btn';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.onclick = function () {
        cancelNoteEdit(index, noteText);
    };
    noteElement.appendChild(cancelBtn);

    // Focus on the input field
    inputElement.focus();

    // Add event listeners for Enter and Escape keys
    inputElement.addEventListener('keyup', function (event) {
        if (event.keyCode === 13) {
            saveNoteEdit(index);
        } else if (event.keyCode === 27) {
            cancelNoteEdit(index, noteText);
        }
    });
}

// Save edited note
function saveNoteEdit(index) {
    const noteElement = document.getElementById('notes').children[index];
    const inputElement = noteElement.querySelector('input');
    const newNoteText = inputElement.value.trim();

    if (newNoteText !== '') {
        notes[index] = newNoteText;
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
    }
}

// Cancel editing a note
function cancelNoteEdit(index, oldNoteText) {
    const noteElement = document.getElementById('notes').children[index];
    const inputElement = noteElement.querySelector('input');

    inputElement.value = oldNoteText;
    noteElement.replaceChild(document.createElement('span'), inputElement);
    noteElement.querySelector('.edit-btn').textContent = 'Edit';
    noteElement.removeChild(noteElement.querySelector('.cancel-btn'));
}

//listen for escape key, close edit mode
document.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
        const editBtn = document.querySelector('.edit-btn');
        if (editBtn) {
            const index = editBtn.parentNode.querySelector('.note-number').textContent - 1;
            const noteText = notes[index];
            cancelNoteEdit(index, noteText);
        }
    }
});

// Event listeners
document.getElementById('add-btn').addEventListener('click', addNote);
document.getElementById('note-input').addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        addNote();
    }
});

// Initial display of notes
displayNotes();
