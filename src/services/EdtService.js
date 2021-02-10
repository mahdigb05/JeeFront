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

class EdtService{
    getAllEdts(){
        return axios.get(URL+'edts',header);
    }

    modifierEdt(edt){
        return axios.put(URL+'',edt,header)
    }
}

export default new EdtService()