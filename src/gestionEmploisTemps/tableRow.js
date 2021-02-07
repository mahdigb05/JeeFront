import { Menu, Button, Dropdown, Select, Modal } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { Form, Input, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";
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
  const [saison, setSaison] = useState(-1);
  const [file, setFile] = useState(null);

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
      payload.set("saison", saison);
      payload.set(file, file);

      try {
        axios.post("", payload, { headers: headers });
      } catch (error) {}
    } else {
      let headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };

      try {
        axios.delete("" + edt.id_edt, { headers: headers });
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
                value={cour.titre}
                disabled={state === "modification" ? false : true}
                onChange={(value) => setTitre(value)}
              />
            </Form.Item>

            {state === "consultation" ? (
              <Select>
                <Option defaultValue={edt.saison}>
                  {edt.saison}
                </Option>
              </Select>
            ) : (
              <Select
                onChange={(value) => {
                  setSaison(value);
                }}
              >
                  <Option value="printemps">printemps</Option>
				  <Option value="hiver">hiver</Option>
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
        <td>{edt.id_edt}</td>
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
