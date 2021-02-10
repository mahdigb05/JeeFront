import React, {createContext, useState} from 'react'

export const NoteAbsenceContext = createContext({});

const NoteAbsenceContextProvider = ({children}) => {
    const [notesAbsences, setNotesAbsences] = useState([]);

    return(
        <NoteAbsenceContext.Provider value = {{notesAbsences, setNotesAbsences}}>
            {children}
        </NoteAbsenceContext.Provider>
    )
}

export default NoteAbsenceContextProvider;