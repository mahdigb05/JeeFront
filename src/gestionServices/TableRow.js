import { Menu, Button, Dropdown, Select, Modal, message } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { Form, Input } from "antd";
import { CheckOutlined, CloseOutlined, MinusOutlined } from "@ant-design/icons";
import axios from "axios";
import { GlobalContext } from "../contexts/globalContext";

const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const TableRow = ({ service }) => {
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const [state, setState] = useState("");
  const [cause, setCause] = useState("");
  const { setServs, getRessourceFromApi } = useContext(GlobalContext);

  var etat;

  if (service.etat === "en cours de traitment")
    etat = <MinusOutlined style={{ color: "#22a7f0" }} />;
  else if (service.etat === "accepte")
    etat = <CheckOutlined style={{ color: "#52c41a" }} />;
  else etat = <CloseOutlined style={{ color: "#f62459" }} />;

  const ValidationForm = (
    <Form {...layout} name="basic">
      <Form.Item label="justification/reponse" name="description">
        <TextArea
          required
          onChange={(e) => {
            setCause(e.target.value);
          }}
        />
      </Form.Item>
    </Form>
  );

  const handleDelete = () => {
    setState("suppression");
    setModalText("voulez-vous vraiment supprimer ce service");
    setModalTitle("Confirmation de suppression");
    setVisible(true);
  };

  const handleConsult = () => {
    setState("traitement");
    setModalTitle("Consultation du service");
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible1(false);
    setState("");
    setCause("");
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Button type="text" onClick={handleDelete}>
          supprimer
        </Button>
      </Menu.Item>
      {service.etat === "en cours de traitement" ? (
        <Menu.Item>
          <Button type="text" onClick={handleConsult}>
            traiter
          </Button>
        </Menu.Item>
      ) : null}
    </Menu>
  );

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
        await axios.delete(
          "http://localhost:8080/supprimerService/" + service.id_service,
          { headers: headers }
        );
        getRessourceFromApi("http://localhost:8080/services", setServs);
        setVisible(false);
        setState("");
        message.success("service supprimer avec succes");
      } catch (error) {}
    }
  };

  const handleClick1 = async () => {
    let headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    let accepte;
    if (state === "refuse") accepte = "refuse";
    else accepte = "accepte";

    await axios.put(
      "http://localhost:8080/modifierService",
      {
        ...service,
        reponse: cause,
        etat: accepte,
      },
      { headers: headers }
    );
    getRessourceFromApi("http://localhost:8080/services", setServs);
    setVisible1(false);
    setState("");
  };

  return (
    <>
      <Modal
        title={modalTitle}
        visible={visible}
        onOk={handleClick}
        onCancel={() => {
          if (state === "suppression") {
            setVisible(false);
          } else if (state === "traitement") {
            setVisible(false);
            setState("refuse");
            setVisible1(true);
          }
        }}
      >
        {state === "suppression" ? (
          modalText
        ) : (
          <Form {...layout} name="basic">
            <Form.Item label="Description du service" name="name">
              <Input.TextArea defaultValue={service.description} readOnly />
            </Form.Item>
          </Form>
        )}
      </Modal>

      <Modal
        title={
          state === "refuse"
            ? "s’il vous plaît préciser la cause de votre décision"
            : "message de réponse"
        }
        visible={visible1}
        onOk={handleClick1}
        onCancel={handleCancel}
      >
        {ValidationForm}
      </Modal>
      <tr>
        <td>{service.id_service}</td>
        <td>{service.description}</td>
        <td>{service.utilisateur.nom + " " + service.utilisateur.prenom}</td>
        <td>{etat}</td>
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
