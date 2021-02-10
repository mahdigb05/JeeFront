import React, {createContext, useState} from 'react'

export const CoursContext = createContext({});

const CoursContextProvider = ({children}) => {
    const [cours, setCours] = useState([]);

    return(
        <CoursContext.Provider value = {{cours, setCours}}>
            {children}
        </CoursContext.Provider>
    )
}

export default CoursContextProvider;