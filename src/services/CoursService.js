import axios from "axios";
const URL = "http://localhost:8080/";
const token = localStorage.getItem("token");
const header = {
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : undefined,
  },
};

class CoursService {
  getAllCoursByModule(id_module) {
    console.log(id_module.location.state);
    return axios.get(URL + `Modulecours/${id_module.location.state}`, header);
  }
}

export default new CoursService();
