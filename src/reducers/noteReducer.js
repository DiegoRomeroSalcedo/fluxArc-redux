import { createSlice, current } from "@reduxjs/toolkit"
import noteService from "../services/notes"

const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2
  }
]

const generateId = () => Number((Math.random() * 1000).toFixed(0))

const noteSlice = createSlice({
  name: 'notes', // Define el prefijo que utiliza en los valores de tipo de la acción. ejp: notes/createNote
  initialState: [],
  reducers: { // Toma al propio reducer como un objeto, cuyas funciones manejan los cambios de estado causados por ciertas acciones.
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map(note => {
        return note.id !== id ? note : changedNote
      })
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    setNotes(state, action) {
      return action.payload
    }
  },
})

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch(appendNote(newNote))
  }
}

export default noteSlice.reducer