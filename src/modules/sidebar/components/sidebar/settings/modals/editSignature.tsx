import { FC, FormEvent } from "react";
import { Form, Button, Input, Modal } from "antd";
import { useEditProfile } from "@/modules/sidebar/hooks/useEditProfile";

interface EditSignatureProps {
  onCancel: any;
  open: boolean;
}

export const EditSignature: FC<EditSignatureProps> = (props) => {
  const { onCancel, open } = props;

  const { fieldValue: initialSignature, handleUpdateProfile } = useEditProfile({
    field: "signature",
    afterSubmit: onCancel,
  });

  const [form] = Form.useForm();

  return (
    <Modal
      title={
        <h1 className="text-[#495057] text-[16px] font-bold">Edit Signature</h1>
      }
      width={500}
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Update
        </Button>,
      ]}
    >
      <Form
        form={form}
        onFinish={handleUpdateProfile}
        initialValues={{ signature: initialSignature }}
      >
        <Form.Item
          className="!pt-6"
          label={
            <span className="text-[#495057] text-[15px] font-[500]">
              Signature
            </span>
          }
          name="signature"
        >
          <Input
            placeholder="Enter signature here..."
            className="text-[13px] border border-[#e6ebf5] rounded outline-0 px-3 py-1 focus:outline-0 focus:ring-0 focus:border-[#e6ebf5]"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
