import axios from 'axios';
import { createContext, useState} from 'react';


export const EtudiantContext = createContext();

const EtudiantContextProvider =  (props) => {

    const [etudiants,setEtudiants] = useState([]);

    const getDataFromApi = async () => {
        const headers = {'Authorization':'Bearer ' + localStorage.getItem('token')}
        var retrievedData = new Array();
        try
        {
            retrievedData = await axios.get('http://localhost:8080/edts',{headers:headers});
            setEtudiants([...retrievedData.data]);
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        <EtudiantContext.Provider value = {{ etudiants, getDataFromApi }}>
            { props.children }
        </EtudiantContext.Provider>
    )
}

export default EtudiantContextProvider;

