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

class NoteAbsenceService{
    getAllNotesAbsenceByModule(id_module){
        return axios.get(URL+`noteAbsenceModule/${id_module}`,header);
    }

    getAllNotesAbsenceByEtudiant(id_etudiant){
        //console.log(id_etudiant);
        //console.log(axios.get(URL+`noteAbsenceEtudiant/${id_etudiant}`,header));
        return axios.get(URL+`noteAbsenceEtudiant/${id_etudiant}`,header);
    }

    modifierNoteAbsenceByModule(notesAbsence){
        console.log(notesAbsence);
        return axios.put(URL+'modifierNoteAbsence',notesAbsence,header)
    }
}

export default new NoteAbsenceService()