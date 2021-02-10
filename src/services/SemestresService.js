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

class SemestresService{
    getAllSemestres(){
        return axios.get(URL+'semestres',header);
    }

}

export default new SemestresService()