import { Menu, Button, Dropdown, Select, Modal } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { Form, Input, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { GlobalContext } from "../contexts/globalContext";
import axios from "axios";
const { Dragger } = Upload;
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const TableRow = ({ cours }) => {
  const [visible, setVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const [state, setState] = useState("");
  const [titre, setTitre] = useState("");
  const [idModule, setIdModule] = useState(0);
  const [file, setFile] = useState({});
  const { modules, setCours, getRessourceFromApi } = useContext(GlobalContext);

  const props = {
    name: "file",
    multiple: false,
    onChange(info) {
      setFile(info.file);
    },
  };

  const handleDelete = () => {
    setState("suppression");
    setModalText("voulez-vous vraiment supprimer ce cours");
    setModalTitle("Confirmation de suppression");
    setVisible(true);
  };

  const handleConsult = () => {
    setState("consultation");
    setModalText("voulez-vous vraiment supprimer ce cours");
    setModalTitle("Consultation du cours");
    setVisible(true);
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Button type="text" onClick={handleDelete}>
          supprimer
        </Button>
      </Menu.Item>

      <Menu.Item>
        <Button type="text" onClick={handleConsult}>
          consulter
        </Button>
      </Menu.Item>
    </Menu>
  );

  const handleCancel = () => {
    setVisible(false);
  };

  const handleClick = async () => {
    if (state === "consultation") {
      setState("modification");
      setTitre(cours.titre);
      setIdModule(cours.module.id_module);
      return;
    } else if (state === "modification") {
      let headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      try {
        var payload = new FormData();
        payload.append("file", file);
        payload.append("titre", titre);
        payload.append("idModule", idModule);
        payload.append("id_cours", cours.id_cours);
        await axios.put("http://localhost:8080/modifierCours", payload, {
          headers: headers,
        });
        getRessourceFromApi("http://localhost:8080/cours", setCours);
        setVisible(false);
        message.success("cours modifier avec succes");
      } catch (error) {}
    } else {
      let headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };

      try {
        await axios.delete(
          "http://localhost:8080/supprimerCours/" + cours.id_cours,
          { headers: headers }
        );
        getRessourceFromApi("http://localhost:8080/cours", setCours);
        setVisible(false);
        message.success("cours supprimer avec succes");
      } catch (error) {}
    }
  };

  return (
    <>
      <Modal
        title={modalTitle}
        visible={visible}
        onOk={handleClick}
        onCancel={() => {
          handleCancel();
        }}
      >
        {modalTitle === "Confirmation de suppression" ? (
          modalText
        ) : (
          <Form {...layout} name="basic">
            <Form.Item label="Nom du cours" name="name">
              <Input
                readOnly={state === "modification" ? false : true}
                defaultValue={cours.titre}
                onChange={(value) => setTitre(value.target.value)}
              />
            </Form.Item>

            <Form.Item label="Module" name="module">
              {state === "consultation" ? (
                <Select defaultValue={cours.module.nom_module}>
                  <Option>{cours.module.nom_module}</Option>
                </Select>
              ) : (
                <Select
                  defaultValue={cours.module.id_module}
                  onChange={(value) => {
                    setIdModule(value);
                  }}
                >
                  {modules.map((module) => (
                    <Option value={module.id_module}>
                      {module.nom_module}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item
              label={
                state === "modification"
                  ? "telecharger le cours"
                  : "visualiser le cours"
              }
            >
              {state === "modification" ? (
                <Dragger {...props} beforeUpload={() => false}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Cliquez ou faites glisser le fichier dans cette zone pour
                    télécharger
                  </p>
                </Dragger>
              ) : (
                <a
                  download
                  onClick={() => {
                    axios({
                      url: "http://localhost:8080/download/" + cours.chemin_document,
                      method: "GET",
                      responseType: "blob", // important
                    }).then((response) => {
                      const url = window.URL.createObjectURL(
                        new Blob([response.data])
                      );
                      const link = document.createElement("a");
                      link.href = url;
                      link.setAttribute("download", "file.pdf"); //or any other extension
                      document.body.appendChild(link);
                      link.click();
                    });
                  }}
                >
                  cliquer pour visualiser le cours
                </a>
              )}
            </Form.Item>
          </Form>
        )}
      </Modal>
      <tr>
        <td>{cours.id_cours}</td>
        <td>{cours.titre}</td>
        <td>{cours.module.nom_module}</td>
        <td>
          <Dropdown overlay={menu} placement="bottomLeft" arrow>
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
