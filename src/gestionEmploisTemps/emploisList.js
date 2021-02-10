import React, { useState, useContext, useEffect } from "react";
import Navbar from "../navBar/NavBar";
import { GlobalContext } from "../contexts/globalContext";
import { Button, Select, Modal, Form, Input, Upload, message } from "antd";
import TableRow from "./tableRow";
import axios from "axios";
import { InboxOutlined } from "@ant-design/icons";
import uuid from "uuid/dist/v4";
const { Dragger } = Upload;
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const { Search } = Input;

const ListEdts = () => {
  const { edts, setEdts, getRessourceFromApi } = useContext(GlobalContext);
  const [searchValue, setSearchValue] = useState("");
  const searchColumns = ["titre", "idEdt", "saison"];
  const [titre, setTitre] = useState("");
  const [saison, setSaison] = useState("");
  const [file, setFile] = useState({});
  const [visible, setVisible] = useState(false);

  const props = {
    name: "file",
    multiple: false,
    onChange(info) {
      setFile(info.file);
    },
  };

  useEffect(() => {
    getRessourceFromApi("http://localhost:8080/edts", setEdts);
  }, []);

  const search = (rows) => {
	  console.log(rows);
    const output = rows.filter((row) =>
      searchColumns.some((column) => {
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

  const ajouterEdt = async () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    try {
      var payload = new FormData();
      payload.append("titre", titre);
      payload.append("saison", saison);
      payload.append("file", file);
      await axios.post("http://localhost:8080/ajouterEdt", payload, {
        headers: headers,
      });
      getRessourceFromApi("http://localhost:8080/edts", setEdts);
      setVisible(false);
	  message.success("emploi du temps ajouté avec succes");
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
          <Input onChange={(value) => setTitre(value.target.value)} />
        </Form.Item>
        <Form.Item label="Saison">
          <Select
            onChange={(value) => {
              setSaison(value);
            }}
          >
            <Option value="automne">automne</Option>
            <Option value="hiver">hiver</Option>
          </Select>
        </Form.Item>

        <Form.Item label="fichier de l'emploi">
          <Dragger {...props} beforeUpload={() => false}>
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
      {EdtForm}
      <Navbar />
      <div className="container pt-4">
        <div className="form-inline" style={{ marginTop: "3%" }}>
          <h2
            className="font-weight-bold "
            style={{ marginRight: "10%", marginLeft: "2%" }}
          >
            Liste des emplois du temps
          </h2>

          <Search
            style={{ width: "35%", marginRight: "2%" }}
            onChange={(value) => setSearchValue(value.target.value)}
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
			  <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {search(edts).map((edt) => (
              <TableRow edt={edt} key={uuid()} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListEdts;
