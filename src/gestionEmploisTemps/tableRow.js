import { Menu, Button, Dropdown, Select, Modal } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { Form, Input, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";
import { GlobalContext } from "../contexts/globalContext";
const { Dragger } = Upload;
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const TableRow = ({ edt }) => {
  const [visible, setVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const [state, setState] = useState("consultation");
  const [titre, setTitre] = useState("");
  const [saison, setSaison] = useState("");
  const [file, setFile] = useState(null);
  const { setEdts, getRessourceFromApi } = useContext(GlobalContext);

  const props = {
    name: "file",
    multiple: false,
    onChange(info) {
      setFile(info.file);
    },
  };

  const handleDelete = () => {
    setState("suppression");
    setModalText("voulez-vous vraiment supprimer cet emplois du temps");
    setModalTitle("Confirmation de suppression");
    setVisible(true);
  };

  const handleConsult = () => {
    setModalTitle("Consultation de l'emploi du temps");
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
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

  const handleClick = async () => {
    if (state === "consultation") {
      setState("modification");
      return;
    } else if (state === "modification") {
      let headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };

      var payload = new FormData();
      payload.append("titre", titre);
      payload.append("saison", saison);
      payload.append(file, file);

      try {
        await axios.put("http://localhost:8080/modifierEdt/", payload, {
          headers: headers,
        });
        getRessourceFromApi("http://localhost:8080/edts", setEdts);
        setVisible(false);
        message.success("emploi du temps modifier avec succes");
      } catch (error) {}
    } else {
      let headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };

      try {
        await axios.delete("http://localhost:8080/supprimerEdt/" + edt.idEdt, {
          headers: headers,
        });
        getRessourceFromApi("http://localhost:8080/edts", setEdts);
        setVisible(false);
        message.success("emploi du temps supprimer avec succes");
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
            <Form.Item label="titre de l'emplois" name="titre">
              <Input
                defaultValue={edt.titre}
                readOnly={state === "modification" ? false : true}
                onChange={(value) => setTitre(value.target.value)}
              />
            </Form.Item>
            <Form.Item label="Saison">
              {state === "consultation" ? (
                <Select defaultValue={edt.saison}>
                  <Option>{edt.saison}</Option>
                </Select>
              ) : (
                <Select
                  defaultValue={edt.saison}
                  onChange={(value) => {
                    setSaison(value);
                  }}
                >
                  <Option value="printemps">printemps</Option>
                  <Option value="hiver">hiver</Option>
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
                <a>visualiser le document du cours</a>
              )}
            </Form.Item>
          </Form>
        )}
      </Modal>
      <tr>
        <td>{edt.idEdt}</td>
        <td>{edt.titre}</td>
        <td>{edt.saison}</td>
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
