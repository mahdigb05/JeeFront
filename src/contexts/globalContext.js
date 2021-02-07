import axios from "axios";
import { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalContextProvider = (props) => {
  const [edts, setEdts] = useState([]);
  const [filieres, setFiliers] = useState([]);
  const [servs, setServs] = useState([]);
  const [cours, setCours] = useState([]);
  const [modules, setModules] = useState([]);

  const getRessourceFromApi = async (endpoint, stateSetter) => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    var retrievedData = new Array();
    try {
      retrievedData = await axios.get(endpoint, { headers: headers });
      stateSetter([...retrievedData.data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        servs,
        setServs,
        edts,
        setEdts,
        filieres,
        setFiliers,
        getRessourceFromApi,
        cours,
        setCours,
        modules,
        setModules
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
