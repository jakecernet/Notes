// Retrieve existing notes from local storage
let notes = JSON.parse(localStorage.getItem('notes')) || [];
let filteredNotes = []; // Array to store filtered notes

// Display existing notes
function displayNotes() {
    const notesContainer = document.getElementById('notes');
    notesContainer.innerHTML = '';

    if (filteredNotes.length === 0) {
        notesContainer.innerHTML = '<p>No notes found</p>';
    } else {
        filteredNotes.forEach(function (note, index) {
            const noteElement = document.createElement('div');
            noteElement.className = 'note';
            noteElement.innerHTML = `
                <span class="note-number">${index + 1}.</span>
                <span>${note.title}</span>
                <button class="edit-btn" onclick="editNote(${index})">Edit</button>
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
        const newNote = { title: noteText, content: '', tags: [], date: new Date().toISOString() };
        notes.push(newNote);
        localStorage.setItem('notes', JSON.stringify(notes));
        noteInput.value = '';
        filterNotes(document.getElementById('search-input').value.trim()); // Reapply filtering
    }
}

// Delete a note
function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    filterNotes(document.getElementById('search-input').value.trim()); // Reapply filtering
}

// Edit a note
function editNote(index) {
    // Edit note functionality
}

// Sort notes based on the selected criterion
function sortNotes(criterion) {
    filteredNotes.sort(function (a, b) {
        if (criterion === 'title') {
            return a.title.localeCompare(b.title);
        } else if (criterion === 'date') {
            return new Date(a.date) - new Date(b.date);
        }
        return 0;
    });

    displayNotes();
}

// Filter notes based on the keyword or tag
function filterNotes(keyword) {
    filteredNotes = notes.filter(function (note) {
        return note.title.toLowerCase().includes(keyword.toLowerCase()) ||
            note.tags.some(function (tag) {
                return tag.toLowerCase().includes(keyword.toLowerCase());
            });
    });

    displayNotes();
}

// Event listeners
document.getElementById('add-btn').addEventListener('click', addNote);
document.getElementById('note-input').addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        addNote();
    }
});

document.getElementById('search-input').addEventListener('input', function (event) {
    const keyword = event.target.value.trim();
    filterNotes(keyword);
});

// Initial display of notes
filterNotes(''); // Display all notes initially
