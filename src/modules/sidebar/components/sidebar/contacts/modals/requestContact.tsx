import { Button, Modal, Form, Input, Steps, Avatar } from "antd";
import { FC, useState } from "react";
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
  const [current, setCurrent] = useState<number>(0);
  const [selectedProfile, setSelectedProfile] = useState<
    findProfile | undefined
  >(undefined);

  const [form] = Form.useForm();
  const [formSend] = Form.useForm();

  const { handleSendRequest, handleSearchContact, foundContacts } =
    useRequestContact({
      afterSubmit: () => {
        onCancel();
        form.resetFields();
        setCurrent(0);
        setSelectedProfile(undefined);
      },
    });

  return (
    <Modal
      title={
        <h1 className="text-[#495057] text-[16px] font-bold">Add Contact</h1>
      }
      width={500}
      open={open}
      onCancel={onCancel}
      footer={[
        <Button
          className="float-left"
          hidden={current === 0}
          key="back"
          type="primary"
          onClick={() => setCurrent((current) => current - 1)}
        >
          Back
        </Button>,
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          hidden={current === 0}
          key="submit"
          type="primary"
          onClick={() => formSend.submit()}
        >
          Send
        </Button>,
      ]}
    >
      <Steps
        direction="horizontal"
        className="mt-4"
        size="small"
        items={[{ title: "Search" }, { title: "Send" }]}
        current={current}
      />
      {current === 0 ? (
        <>
          <Form form={form} layout="vertical">
            <Form.Item
              className="!pt-6"
              label={
                <span className="text-[#495057] text-[15px] font-[500]">
                  Enter email or name
                </span>
              }
              name="keyword"
            >
              <Input
                autoComplete="off"
                placeholder="Enter email or name here ..."
                className="text-[13px] border border-[#e6ebf5] rounded outline-0 px-3 py-1 focus:outline-0 focus:ring-0 focus:border-[#e6ebf5]"
                onChange={_.debounce(
                  (e) => handleSearchContact(e.target.value),
                  300
                )}
              />
            </Form.Item>
          </Form>
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
                    <Button
                      type="primary"
                      onClick={() => {
                        setCurrent((current) => current + 1);
                        setSelectedProfile(foundContact);
                        formSend.setFieldValue(
                          "requesting",
                          foundContact.profileId
                        );
                      }}
                    >
                      Send
                    </Button>
                  </div>
                );
              })}
            </>
          )}
        </>
      ) : (
        <div>
          <Form form={formSend} colon={false} onFinish={handleSendRequest}>
            <Form.Item
              className="!pt-6"
              label={
                <span className="text-[#495057] text-[15px] font-[500]">
                  To
                </span>
              }
              name="requesting"
            >
              <Input hidden autoComplete="off" />
              <div className="flex justify-start items-center rounded-full w-fit p-1 pr-2 gap-2 bg-primary">
                <Avatar
                  size={24}
                  src={
                    <img
                      src={
                        selectedProfile?.avatarUrl
                          ? getAvatar(selectedProfile?.avatarUrl)
                          : avatarPlaceholder
                      }
                      alt="avatar"
                    />
                  }
                />
                <p className="text-white">
                  {selectedProfile?.name || selectedProfile?.email}
                </p>
              </div>
            </Form.Item>
            <Form.Item
              label={
                <span className="text-[#495057] text-[15px] font-[500]">
                  Message
                </span>
              }
              name="message"
              labelCol={{ span: 24 }}
            >
              <Input.TextArea
                className="text-[13px] border border-[#e6ebf5] rounded outline-0"
                rows={4}
                placeholder="Enter message here..."
              />
            </Form.Item>
          </Form>
        </div>
      )}
    </Modal>
  );
};
