import { Form, Input, Button, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
const { Dragger } = Upload;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const props = {
  name: "file",
  multiple: true,
  onChange(info) {
    // const { status } = info.file;

    // if (status === "done") {
    //   message.success(`${info.file.name} file uploaded successfully.`);
    // } else if (status === "error") {
    //   message.error(`${info.file.name} file upload failed.`);
    // }
    console.log("babyyy");
  },
};

const CoursForm = () => {
  return (
    <Form {...layout} name="basic">
      <Form.Item label="Nom du cours" name="name">
        <Input />
      </Form.Item>

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

      <Form.Item {...tailLayout}>
        <Button type="primary">valider</Button>
      </Form.Item>
    </Form>
  );
};

export default CoursForm;
