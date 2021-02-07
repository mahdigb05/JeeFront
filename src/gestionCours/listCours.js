import React, { useState, useContext } from "react";
import Navbar from "../navBar/NavBar";
import { GlobalContext } from "../contexts/globalContext";
import { Button, Select, Modal, Form, Input, Upload } from "antd";
import TableRow from "./tableRow";
import axios from "axios";
import { InboxOutlined } from "@ant-design/icons";
const { Dragger } = Upload;
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const { Search } = Input;

const ListCours = () => {
  const { cours, modules } = useContext(GlobalContext);
  const [searchValue, setSearchValue] = useState("");
  const searchColumns = ["titre", "id_cours", "nom_module"];
  const [titre, setTitre] = useState("");
  const [idModule, setIdModule] = useState(0);
  const [file, setFile] = useState(null);
  const [visible, setVisible] = useState(false);

  const props = {
    name: "file",
    multiple: false,
    onChange(info) {
      setFile(info.file);
    },
  };

  const search = (rows) => {
    const output = rows.filter((row) =>
      searchColumns.some((column) => {
        if (column === "nom_module") {
          return (
            row.module[column]
              .toString()
              .toLowerCase()
              .indexOf(searchValue.toLocaleLowerCase()) > -1
          );
        } else
          return (
            row[column]
              .toString()
              .toLowerCase()
              .indexOf(searchValue.toLocaleLowerCase()) > -1
          );
      })
    );
    return output;
  };

  const ajouterCours = () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    try {
      var payload = new FormData();
      payload.set("titre", titre);
      payload.set("idModule", idModule);
      payload.set(file, file);
      axios.post("", payload, { headers: headers });
    } catch (error) {}
  };

  const CoursForm = (
    <Modal
      title="Ajouter cours"
      visible={visible}
      onOk={ajouterCours}
      onCancel={() => setVisible(false)}
    >
      <Form {...layout} name="basic">
        <Form.Item label="Nom du cours" name="name">
          <Input
            onChange={(value) => setTitre(value)}
          />
        </Form.Item>
        <Form.Item label="Module">
        <Select
            onChange={(value) => {
            setIdModule(value);
          }}
        >
          {modules.map((module) => (
            <Option value={module.id_Module}>module.nom_module</Option>
          ))}
        </Select>
        </Form.Item>

        <Form.Item label="fichier de cours">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Cliquez ou faites glisser le fichier dans cette zone pour
              télécharger
            </p>
          </Dragger>
        </Form.Item>
      </Form>
    </Modal>
  );

  return (
    <div>
      {CoursForm}
      <Navbar />
      <div className="container pt-4">
        <div className="form-inline" style={{ marginTop: "3%" }}>
          <h2
            className="font-weight-bold "
            style={{ marginRight: "25%", marginLeft: "2%" }}
          >
            Liste des cours
          </h2>

          <Search
            style={{ width: "35%", marginRight: "4%" }}
            onChange={(value) => setSearchValue(value)}
          />
          <Button
            type="primary"
            className="float-right"
            onClick={() => setVisible(true)}
          >
            <i class="fas fa-plus pr-sm-2"></i>Ajouter cours
          </Button>
        </div>
        <table className="table  table-sm table-light tab ml-md-4 green">
          <thead className="font-weight-normal">
            <tr className="shadow-sm text-primary">
              <th scope="col">Id du cours</th>
              <th scope="col">Titre</th>
              <th scope="col">Nom du module</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {search(cours).map((cour) => (
              <TableRow cours={cour} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListCours;
