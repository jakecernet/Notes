// Retrieve existing notes from local storage
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Display existing notes
function displayNotes() {
    const undoneNotesContainer = document.getElementById('undone-notes');
    const doneNotesContainer = document.getElementById('done-notes');

    undoneNotesContainer.innerHTML = '';
    doneNotesContainer.innerHTML = '';

    if (notes.length === 0) {
        undoneNotesContainer.innerHTML = '<p>No notes yet</p>';
    } else {
        // Sort the notes by "done" status
        notes.sort(function (a, b) {
            return a.done - b.done;
        });

        notes.forEach(function (note, index) {
            const noteElement = createNoteElement(index, note);

            if (note.done) {
                doneNotesContainer.appendChild(noteElement);
            } else {
                undoneNotesContainer.appendChild(noteElement);
            }
        });
    }
}

// Create a note element
function createNoteElement(index, note) {
    const noteElement = document.createElement('div');
    noteElement.className = 'note';
    noteElement.setAttribute('draggable', 'true');
    noteElement.setAttribute('ondragstart', 'dragStart(event)');
    noteElement.setAttribute('data-index', index);
    noteElement.innerHTML = `
        <span class="note-number">${index + 1}.</span>
        <span>${note.text}</span>
        <button class="edit-btn" onclick="editNote(${index})">✎</button>
        <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
    `;
    return noteElement;
}

// Add a new note
function addNote() {
    const noteInput = document.getElementById('note-input');
    const noteText = noteInput.value.trim();

    if (noteText !== '') {
        const newNote = {
            text: noteText,
            done: false
        };
        notes.push(newNote);
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
function editNote(index) {
    const noteElement = document.querySelector(`[data-index="${index}"]`);
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

// Save the edited note
function saveNoteEdit(index) {
    const noteElement = document.querySelector(`[data-index="${index}"]`);
    const inputElement = noteElement.querySelector('input');
    const newNoteText = inputElement.value.trim();

    if (newNoteText !== '') {
        notes[index].text = newNoteText;
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
    }
}

// Cancel editing the note
function cancelNoteEdit(index, oldNoteText) {
    notes[index].text = oldNoteText;
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

// Drag start event handler
function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.index);
}

// Allow drop event handler
function allowDrop(event) {
    event.preventDefault();
}

// Drop event handler
function drop(event) {
    event.preventDefault();
    const index = event.dataTransfer.getData('text/plain');
    const sourceColumn = document.querySelector(`[data-index="${index}"]`).parentNode;
    const targetColumn = event.target.closest('.column');
    const targetStatus = targetColumn.id === 'column-done' ? true : false;

    if (sourceColumn !== targetColumn) {
        notes[index].done = targetStatus;
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
    }
}

// Add event listeners
document.getElementById('add-btn').addEventListener('click', addNote);
displayNotes();

//check for enter key
document.getElementById('note-input').addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        addNote();
    }
}
);

//check for escape key
document.getElementById('note-input').addEventListener('keyup', function (event) {
    if (event.keyCode === 27) {
        document.getElementById('note-input').value = '';
    }
}
);