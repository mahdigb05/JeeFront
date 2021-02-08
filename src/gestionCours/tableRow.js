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
  const [state, setState] = useState("consultation");
  const [titre, setTitre] = useState("");
  const [idModule, setIdModule] = useState(-1);
  const [file, setFile] = useState(null);
  const { modules } = useContext(GlobalContext);

  const props = {
    name: "file",
    multiple: false,
    onChange(info) {
      setFile(info.file);
    },
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

  const handleDelete = () => {
    setModalText("voulez-vous vraiment supprimer ce cours");
    setModalTitle("Confirmation de suppression");
    setVisible(true);
  };

  const handleConsult = () => {
    setModalText("voulez-vous vraiment supprimer ce cours");
    setModalTitle("Consultation du cours");
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleClick = () => {
    if (state === "consultation") {
      setState("modification");
      return;
    } else if (state === "modification") {
      let headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };

      var payload = new FormData();
      payload.set("titre", titre);
      payload.set("idModule", idModule);
      payload.set("id_cours", cours.id_cours);
      payload.set(file, file);

      try {
        axios.post("", payload, { headers: headers });
      } catch (error) {}
    } else {
      let headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };

      try {
        axios.delete("" + cours.id_cours, { headers: headers });
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
          { modalText }
        ) : (
          <Form {...layout} name="basic">
            <Form.Item label="Nom du cours" name="name">
              <Input
                value={cours.titre}
                disabled={state === "modification" ? false : true}
                onChange={(value) => setTitre(value)}
              />
            </Form.Item>

            {state === "consultation" ? (
              <Select>
                <Option defaultValue={cours.module.nom_module}>
                  {cours.module.nom_module}
                </Option>
              </Select>
            ) : (
              <Select
                onChange={(value) => {
                  setIdModule(value);
                }}
              >
                {modules.map((module) => (
                  <Option value={module.id_Module}>module.nom_module</Option>
                ))}
              </Select>
            )}

            {state === "modification" ? (
              <Form.Item label="charger le fichier de cours">
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
            ) : (
              <a>visualiser le document du cours</a>
            )}
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
