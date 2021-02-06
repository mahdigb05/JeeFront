import { Card } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import Navbar from "../navBar/NavBar";

const { Meta } = Card;
const ModulesList = () => {
  return (
    <div>
      <Navbar />
      <div className="container pt-4">
        <Card
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[<EyeOutlined key="setting" onClick />]}
        >
          <Meta title="Card title" description="This is the description" />
        </Card>
      </div>
    </div>
  );
};

export default ModulesList;
