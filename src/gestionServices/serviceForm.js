import { Form, Input, Button } from "antd";
const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
  };

const ServiceForm = () => {
  return (
    <Form {...layout} name="basic">
      <Form.Item label="Service" name="service">
        <Input disabled />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <TextArea disabled />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" danger>
          refuser
        </Button>
        <Button type="primary" >
          accepter
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ServiceForm;
