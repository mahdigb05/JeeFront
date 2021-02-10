import React, {createContext, useState} from 'react'

export const EdtContext = createContext({});

const EdtContextProvider = ({children}) => {
    const [edts, setEdts] = useState([]);

    return(
        <EdtContext.Provider value = {{edts, setEdts}}>
            {children}
        </EdtContext.Provider>
    )
}

export default EdtContextProvider;