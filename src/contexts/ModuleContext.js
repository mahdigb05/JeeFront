import React, {createContext, useState} from 'react'

export const ModuleContext = createContext({});

const ModuleContextProvider = ({children}) => {
    const [modules, setModules] = useState([]);

    return(
        <ModuleContext.Provider value = {{modules, setModules}}>
            {children}
        </ModuleContext.Provider>
    )
}

export default ModuleContextProvider;