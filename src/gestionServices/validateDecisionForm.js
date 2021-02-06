import { Form, Input, Button } from "antd";
const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ValidateDecisionForm = () => {
  return (
    <Form {...layout} name="basic">
      <Form.Item
        label="s’il vous plaît ajouter des éclaircissements ou une description expliquant la cause de votre décision"
        name="description"
      >
        <TextArea required />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary">valider</Button>
      </Form.Item>
    </Form>
  );
};

export default ValidateDecisionForm;
