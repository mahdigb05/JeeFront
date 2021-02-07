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

const ListEdts = () => {
  const { cours, modules } = useContext(GlobalContext);
  const [searchValue, setSearchValue] = useState("");
  const searchColumns = ["titre", "id_edt", "saison"];
  const [titre, setTitre] = useState("");
  const [saison, setSaison] = useState("");
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

  const ajouterEdt = () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    try {
      var payload = new FormData();
      payload.set("titre", titre);
      payload.set("saison", saison);
      payload.set(file, file);
      axios.post("", payload, { headers: headers });
    } catch (error) {}
  };

  const EdtForm = (
    <Modal
      title="Ajouter emploi du temps"
      visible={visible}
      onOk={ajouterEdt}
      onCancel={() => setVisible(false)}
    >
      <Form {...layout} name="basic">
        <Form.Item label="titre de l'emploi" name="name">
          <Input onChange={(value) => setTitre(value)} />
        </Form.Item>
        <Form.Item label="Saison">
          <Select
            onChange={(value) => {
              setSaison(value);
            }}
          >
            <Option value="printemps">printemps</Option>
            <Option value="hiver">hiver</Option>
          </Select>
        </Form.Item>

        <Form.Item label="fichier de l'emploi">
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
            Liste des emplois du temps
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
            <i class="fas fa-plus pr-sm-2"></i>Ajouter emplois
          </Button>
        </div>
        <table className="table  table-sm table-light tab ml-md-4 green">
          <thead className="font-weight-normal">
            <tr className="shadow-sm text-primary">
              <th scope="col">Id emploi du temps</th>
              <th scope="col">Titre</th>
              <th scope="col">Saison</th>
            </tr>
          </thead>
          <tbody>
            {search(edts).map((edt) => (
              <TableRow etudiants={edt} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListEdts;
