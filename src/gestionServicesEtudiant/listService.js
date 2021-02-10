import { Input, message, Button, Modal, Form } from "antd";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../contexts/globalContext";
import TableRow from "../gestionServicesEtudiant/TableRow";
import Navbar from "../navBar/NavBar";
import uuid from "uuid/dist/v4";
import axios from "axios";

const { Search } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const ListServiceEtudiant = () => {
  const { servs, setServs, getRessourceFromApi } = useContext(GlobalContext);
  const [searchValue, setSearchValue] = useState("");
  const searchColumns = ["id_service", "description"];
  const [visible, setVisible] = useState(false);
  const [description, setDescription] = useState("");

  const search = (rows) => {
    const o = rows.filter(
      (row) => row.utilisateur.email === localStorage.getItem("user_email")
    );
    const output = o.filter((row) =>
      searchColumns.some(
        (column) =>
          row[column]
            .toString()
            .toLowerCase()
            .indexOf(searchValue.toLocaleLowerCase()) > -1
      )
    );
    return output;
  };

  const handleClick = async () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    try{
      await axios.post("http://localhost:8080/ajouterService",{etat :"en cours de traitement",description,email : localStorage.getItem("user_email")},{headers:headers});
      getRessourceFromApi("http://localhost:8080/services", setServs);
      setVisible(false);
      message.success("demande de service ajouté avec succes");
    }catch(error){

    }
  };

  useEffect(() => {
    getRessourceFromApi("http://localhost:8080/services", setServs);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container pt-4">
        <div className="row">
          <div className="col mt-lg-5 container">
            <div className="Tete form-inline" style={{ marginTop: "3%" }}>
              <h2
                className="font-weight-bold "
                style={{ marginRight: "10%", marginLeft: "2%" }}
              >
                Demandes de services
              </h2>
              {/* <input className="form-control form-control-sm col-lg-4 searchbar mr-1" type="text" placeholder= "Recherche" value = {q} onChange = {(e) => setQ(e.target.value)}/> */}
              <Search
                style={{ width: "35%",marginRight:"5%" }}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Button
                type="primary"
                className="float-right"
                onClick={() => setVisible(true)}
              >
                <i class="fas fa-plus pr-sm-2"></i>Demander un service
              </Button>
              <Modal
                title="Demander un service aupres de l'administration"
                visible={visible}
                onOk={handleClick}
                onCancel={() => {
                  setVisible(false);
                }}
              >
                <Form {...layout} name="basic">
                  <Form.Item label="Description du service" name="name">
                    <Input.TextArea
                      onChange = {(e) => setDescription(e.target.value)}
                    />
                  </Form.Item>
                </Form>
              </Modal>
            </div>
            <table className="table  table-sm table-light tab ml-md-4 green">
              <thead className="font-weight-normal">
                <tr className="shadow-sm text-primary">
                  <th scope="col">Id service</th>
                  <th scope="col">description</th>
                  <th scope="col">Etat</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {search(servs).map((service) => (
                  <TableRow service={service} key={uuid()} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListServiceEtudiant;
