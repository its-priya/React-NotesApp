import React from 'react'

function Sidebar(props) {
    const noteElements= props.notes.map((note, index) => (
        <div key={note.id}>
            <div 
                className={`title ${note.id === props.currentNote.id ? "selected-note":""}`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="title-text">{note.body.length > 0 ? note.body.split("\n")[0] : "# Type your markdown note's title here"}</h4>
                <button
                    className="delete-btn"
                    onClick={event => props.deleteNote(event, note.id)}
                >
                    <i className="fa fa-trash fa-lg delete-icon" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    ))
    return (
        <section className="pane sidebar">
            <div className="sidebar-header">
                <h3>Notes</h3>
                <button className="btn new-note-btn" onClick={props.createNewNote}>+</button>
            </div>
            <hr/>
            {noteElements}
        </section>
    )
}

export default Sidebar
