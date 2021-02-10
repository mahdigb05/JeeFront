import axios from 'axios';

const URL = "http://localhost:8080/";
const token = localStorage.getItem('token')

const header = {
    headers : {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : undefined
    }
}

class ModuleService{

    getIdProfByEmail(email){
        console.log(email);
        return axios.get(URL+`professeur/${email}`,header);
    }

    getAllModulesByProf(id_professeur){
        //console.log(professeur);
        return axios.get(URL+`modulesProf/${id_professeur}`,header);
    }
    getAllModulesBySemestre(id_semestre){
        console.log(id_semestre);
        return axios.get(URL+`modulesEtudiant/${id_semestre}`,header);
    } 

}

export default new ModuleService()