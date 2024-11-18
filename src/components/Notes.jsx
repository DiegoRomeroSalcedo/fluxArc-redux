import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";
import noteService from "../services/notes";

const Note = ({ note, handleClick }) => { // Note es un componente presentacional, ya que no es conciente que el controlador de eventos que obtiene como prop despacha una accion.
    return (
        <li>
            {note.content} <strong>{note.important ? 'important' : 'not important'}</strong>
            <button onClick={handleClick}>Change importance</button>
        </li>
    )
}

const Notes = () => { // Notes es un componente contenedor, ya que contiene cierta lógica de aplicación
    const dispatch = useDispatch()

    const notes = useSelector(({ filter, notes }) => {
        if (filter === 'ALL') {
            return notes
        }
        return filter === 'IMPORTANT'
            ? notes.filter(note => note.important)
            : notes.filter(note => !note.important)
    })

    const handleImportance = async (id) => {
        const noteToUpdate = notes.find(note => note.id === id)
        const changedNote = {...noteToUpdate, important: !noteToUpdate.important}
        const updateNote = await noteService.update(id, changedNote)
        dispatch(toggleImportanceOf(updateNote.id))
    }

    return (
        <ul>
            {notes.map(note =>
                <Note key={note.id} note={note} handleClick={() => handleImportance(note.id)} />
            )}
        </ul>
    )
}

export default Notes;