import { Modal } from "antd";
import { FC } from "react";
import _ from "lodash";

interface RequestContactProps {
  onCancel: any;
  open: boolean;
}

export const RequestContact: FC<RequestContactProps> = () => {
  return (
    <Modal
      title={
        <h1 className="text-[#495057] text-[16px] font-bold">Edit Name</h1>
      }
    ></Modal>
  );
};
