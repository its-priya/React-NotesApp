import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Split from 'react-split'
import Editor from './components/Editor'
import Sidebar from './components/Sidebar'

function App() {
  const [notes, setNotes]= useState(() => JSON.parse(localStorage.getItem("notes")) || [])
  const [currentNoteId, setCurrentNoteId]= useState((notes[0] && notes[0].id) || "")
  useEffect(() => {
      localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])
  
  function createNewNote(){
      const newNote= {
          id: nanoid(),
          body: "# Type your markdown note's title here"
      }
      setNotes(prevNotes => [newNote, ...prevNotes])
      setCurrentNoteId(newNote.id)
  }
  
  function findCurrentNote(){
      return (notes.find(note => note.id===currentNoteId) || notes[0])
  }

  function updateNote(content){
    setNotes(oldNotes => {
      const newArray= []
      for(let i=0;i<oldNotes.length;i++){
        const oldNote= oldNotes[i]
        if(oldNote.id===currentNoteId){
          newArray.unshift({...oldNote, body: content})
        } else {
          newArray.push(oldNote)
        }
      }
      return newArray
    })
  }

  function deleteNote(event, noteId){
      event.stopPropagation();
      setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
  }

  return (
    <main>
      {
        notes.length > 0 
        ? 
        <Split
            sizes= {[30, 70]}
            direction= "horizontal"
            className="split"
        >
            <Sidebar
                notes= {notes}
                currentNote= {findCurrentNote()}
                setCurrentNoteId= {setCurrentNoteId}
                createNewNote= {createNewNote}
                deleteNote= {deleteNote}
            />
            {
              currentNoteId && notes.length > 0 &&
              <Editor
                currentNote= {findCurrentNote()}
                updateNote= {updateNote}
              />
            }
        </Split>
        : 
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="btn" onClick={createNewNote}>
            Create now
          </button>
        </div>
      }
    </main>
  )
}

export default App
