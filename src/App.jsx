import { useEffect } from "react";
import NewNote from "./components/NewNote";
import VisibilityFilter from "./components/VisibilityFilter";
import Notes from "./components/Notes";
import noteService from './services/notes';
import { setNotes } from "./reducers/noteReducer";
import { useDispatch } from "react-redux";
import { initializeNotes } from "./reducers/noteReducer";

const App = () => {

  const dispatch = useDispatch()
  
  useEffect(() => { // Uso de useEffect para la carga inicial de las notas que vienen del back-end
    dispatch(initializeNotes())
  }, [])

  return(
    <>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </>
  )
}

export default App;