import { List, Avatar } from "antd";
import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Navbar from "../navBar/NavBar";

const CoursList = () => {
  const listData = [];
  for (let i = 0; i < 23; i++) {
    listData.push({
      
      title: `ant design part ${i}`,
      description:
        "Ant Design, a design language for background applications, is refined by Ant UED Team.",
      content:
        "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
    });
  }



  return (
	<div>
	<Navbar />
	<div className="container pt-4">
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={listData}
      renderItem={(item) => (
        <List.Item
          key={item.title}
		  actions={[
		  <EyeOutlined key="setting" onClick />,
		  <DeleteOutlined key="setting" onClick />
		]}
          extra={
            <img
              width={272}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
        >
          <List.Item.Meta 
            title={item.title}
            description={item.description}
          />
          {item.content}
        </List.Item>
      )}
    />
	 </div>
    </div>
  );
};

export default CoursList;
