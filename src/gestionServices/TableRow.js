import { Menu, Button, Dropdown, Select, Modal } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { Form, Input, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { GlobalContext } from "../contexts/globalContext";
import axios from "axios";
const { Dragger } = Upload;
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const TableRow = ({ service }) => {
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const [state, setState] = useState();
  const [cause, setCause] = useState("");

  const validationForm = (
    <Form {...layout} name="basic">
      <Form.Item label="justification/reponse" name="description">
        <TextArea required />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary">valider</Button>
      </Form.Item>
    </Form>
  );

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
          traiter
        </Button>
      </Menu.Item>
    </Menu>
  );

  const handleDelete = () => {
    setModalText("voulez-vous vraiment supprimer ce service");
    setModalTitle("Confirmation de suppression");
    setVisible(true);
  };

  const handleConsult = () => {
    setModalText("voulez-vous vraiment supprimer ce service");
    setModalTitle("Consultation du service");
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible1(false);
    setState("");
    setCause("");
  };

  const handleClick = async () => {
    if (state === "traitement") {
      setState("accept");
      setVisible(false);
      setVisible1(true);
    } else if (state === "suppression") {
      let headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      try {
        await axios.delete("" + service.id_service, { headers: headers });
        setVisible1(false);
        setState("");
      } catch (error) {}
    }
  };

  const handleClick1 = async () => {
    let headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    new payload() = new FormData();
    payload.set("id_service", service.id_service);
    payload.set("description", service.description);
    payload.set("reponse", cause);
    if (state === "refuse") payload.set("accepte", false);
    else payload.set("accepte", true);
    await axios.post("", payload, { headers: headers });
    setVisible1(false);
  };

  return (
    <>
      <Modal
        title={modalTitle}
        visible={visible}
        onOk={handleClick}
        onCancel={() => {
          if (state === "suppresion") {
            setVisible(false);
          } else if (state === "traitement") {
            setVisible(false);
            setState("refuse");
            setVisible1(true);
          }
        }}
      >
        {state === "supprimer" ? (
          { modalText }
        ) : (
          <Form {...layout} name="basic">
            <Form.Item label="Description du service" name="name">
              <Input.TextArea value={service.description} disabled />
            </Form.Item>
          </Form>
        )}
      </Modal>
      <Modal
        Modaltitle={
          state === "refuse"
            ? "s’il vous plaît préciser la cause de votre décision"
            : "message de réponse"
        }
        visible={visible1}
        onOk={handleClick1}
        onCancel={handleCancel}
      >
        <validationForm />
      </Modal>
      <tr>
        <td>{service.id_service}</td>
        <td>{service.description}</td>
        <td>{service.etudiant.nom}</td>
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
