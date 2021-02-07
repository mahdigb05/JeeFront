import { Menu, Button, Dropdown } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

const TableRow = ({ etudiant }) => {
  const menu = (
    <Menu>
      <Menu.Item>
        <Button type="text">supprimer</Button>
      </Menu.Item>

      <Menu.Item>
        <Button type="text">consulter</Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {/* <Modal
					title={modalTitle}
					visible={visible}
					onOk={() => {handler()}}
					onCancel={() => {handleCancel()}}>
					<p>{modalText}</p>
					<i class="fas fa-chevron-down"></i>
			</Modal> */}
      <tr>
        <td>{etudiant.id}</td>
        <td>{etudiant.nom}</td>
        <td>{etudiant.prenom}</td>
        <td>{etudiant.email}</td>
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
