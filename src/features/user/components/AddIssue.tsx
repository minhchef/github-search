import { Modal, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";

type AddIssueProps = {
  onSubmit: (value: { title: string, description: string }) => void;
  isOpen: boolean
};

const AddIssue = ({ onSubmit, isOpen }: AddIssueProps) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values);
        setIsModalOpen(false);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };
  

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setIsModalOpen(isOpen);
    form.resetFields();
  }, [isOpen])

  return (
    <>
      <Modal
        title="New Issue"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <TextArea
              showCount
              placeholder="Description"
              style={{ height: 120, resize: "none" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddIssue;
