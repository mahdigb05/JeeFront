import { Form, Input, Button } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const FormulaireCours = ({ cours }) => {
  return (
    <Form {...layout} name="nest-messages">
      <Form.Item name={["nom"]} label="Nom">
        <Input disabled />
      </Form.Item>
      <Form.Item name={["description"]} label="Description">
        <Input disabled />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormulaireCours;
