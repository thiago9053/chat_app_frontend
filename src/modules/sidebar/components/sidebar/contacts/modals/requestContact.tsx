import { Button, Modal, Form, Input } from "antd";
import { FC } from "react";
import _ from "lodash";
import { useRequestContact } from "@/modules/sidebar/hooks/useRequestContact";
import clsx from "clsx";
import { getAvatar } from "@/shared/infra/supabase/storage";
import { avatarPlaceholder } from "@/shared/constants/placeholderImages";
import { findProfile } from "@/modules/sidebar/services/profile.service";

interface RequestContactProps {
  onCancel: any;
  open: boolean;
}

export const RequestContact: FC<RequestContactProps> = (props) => {
  const { onCancel, open } = props;

  const { handleSearchContact, foundContacts } = useRequestContact({
    afterSubmit: onCancel,
  });

  const [form] = Form.useForm();

  console.log(foundContacts);
  return (
    <Modal
      title={
        <h1 className="text-[#495057] text-[16px] font-bold">Add Contact</h1>
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
      <Form form={form} onFinish={() => {}} layout="vertical">
        <Form.Item
          className="!pt-6"
          label={
            <span className="text-[#495057] text-[15px] font-[500]">
              Enter email or username
            </span>
          }
          name="keyword"
        >
          <Input
            autoComplete="off"
            placeholder="Enter email or username here ..."
            className="text-[13px] border border-[#e6ebf5] rounded outline-0 px-3 py-1 focus:outline-0 focus:ring-0 focus:border-[#e6ebf5]"
            onChange={_.debounce(
              (e) => handleSearchContact(e.target.value),
              300
            )}
          />
        </Form.Item>

        {foundContacts.length > 0 && (
          <>
            <h1 className="inline-block py-2 font-bold text-primary">
              Result:
            </h1>
            {foundContacts.map((foundContact: findProfile, index: number) => {
              return (
                <div
                  key={index}
                  className={clsx(
                    "flex justify-between border-2 border-primary transition-all duration-100 items-center cursor-pointer rounded-[8px] py-2 px-4 mb-4"
                  )}
                  onClick={() => {}}
                >
                  <div className="flex justify-start items-center gap-2 my-2">
                    <div
                      className="rounded-full relative h-10 w-10 bg-cover"
                      style={{
                        backgroundImage: `url(${
                          foundContact?.avatarUrl
                            ? getAvatar(foundContact?.avatarUrl)
                            : avatarPlaceholder
                        })`,
                      }}
                    ></div>
                    <div>
                      <span className="text-[#6A636C] text-sm font-bold noselect">
                        {foundContact.name || "((Unamed))"}
                      </span>
                      <br />
                      <span className="text-[#6A636C] text-sm noselect">
                        {foundContact.email}
                      </span>
                      <br />
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </Form>
    </Modal>
  );
};
