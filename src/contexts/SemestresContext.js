import React, {createContext, useState} from 'react'

export const SemestresContext = createContext({});

const SemestresContextProvider = ({children}) => {
    const [semestres, setSemestres] = useState([]);

    return(
        <SemestresContext.Provider value = {{semestres, setSemestres}}>
            {children}
        </SemestresContext.Provider>
    )
}

export default SemestresContextProvider;