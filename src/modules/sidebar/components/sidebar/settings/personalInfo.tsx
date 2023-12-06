import { FC, useState } from "react";
import { ChevronDownIcon } from "@/shared/components/icons/chevronDownIcon";
import { EditIcon } from "@/shared/components/icons/editIcon";
import { UserIcon } from "@/shared/components/icons/userIcon";
import clxs, { clsx } from "clsx";
import { useProfile } from "@/modules/sidebar/hooks/useProfile";
import { EditName } from "./modals/editName";
import { EditSignature } from "./modals/editSignature";
import { Spin } from "antd";
import { EditEmail } from "./modals/editEmail";
import { EditPhoneNumber } from "./modals/editPhoneNumber";
import { EditLocation } from "./modals/editLocation";

interface IPersonalInfoProps {
  isOpen: boolean;
  setOpen: any;
}

export const PersonalInfo: FC<IPersonalInfoProps> = (props) => {
  const { isOpen, setOpen } = props;

  const [isOpenEditModals, setOpenEditModals] = useState<{
    name: boolean;
    signature: boolean;
    email: boolean;
    phoneNumber: boolean;
    location: boolean;
  }>({
    name: false,
    signature: false,
    email: false,
    phoneNumber: false,
    location: false,
  });

  const { profileInformation, loadingState } = useProfile();
  const { profile, user } = profileInformation;

  console.log(profile);

  return (
    <div className={clxs("w-full")}>
      <div
        className={clxs(
          "w-full h-12 px-5 py-2 flex items-center gap-2 border-b border-slate-100 cursor-pointer",
          [isOpen ? "bg-[#f6f6f7]/70" : ""]
        )}
        onClick={() => {
          setOpen();
        }}
      >
        <div className="shrink-0">
          <UserIcon className="h-4 fill-[#495057]" />
        </div>
        <span className="inline-block grow text-[#495057] font-[500] noselect">
          Personal Info
        </span>
        <div className="shrink-0">
          <ChevronDownIcon
            className={clsx("h-3 fill-[#495057] transition-all duration-250", [
              isOpen && "-rotate-180",
            ])}
          />
        </div>
      </div>
      <div
        className={clxs(
          "w-full border-b border-slate-100 transition-all duration-250 overflow-y-scroll scrollbar-hide",
          [
            isOpen
              ? "max-h-[300px] opacity-100 p-5"
              : "max-h-0 invisible px-5 opacity-0",
          ]
        )}
      >
        {loadingState === "LOADING" ? (
          <div className="flex justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <div className="w-full mb-4">
              <div className="flex justify-between items-center">
                <span className="inline-block text-sm text-[#797c8c]">
                  Name
                </span>
                <div
                  className="bg-primary/10 p-2 rounded cursor-pointer"
                  onClick={() => {
                    setOpenEditModals((prev) => ({
                      ...prev,
                      name: !prev.name,
                    }));
                  }}
                >
                  <EditIcon className={clxs("fill-primary h-3")} />
                </div>
              </div>
              <span className="text-sm text-[#496057] font-bold">
                {profile?.name || "((Unamed))"}
              </span>
            </div>
            <div className="w-full mb-4">
              <div className="flex justify-between items-center">
                <span className="inline-block text-sm text-[#797c8c]">
                  Signature
                </span>
                <div
                  className="bg-primary/10 p-2 rounded cursor-pointer"
                  onClick={() => {
                    setOpenEditModals((prev) => ({
                      ...prev,
                      signature: !prev.name,
                    }));
                  }}
                >
                  <EditIcon className="fill-primary h-3" />
                </div>
              </div>
              <span className="text-sm text-[#496057] font-bold">
                {profile?.signature || "((Dont have signature))"}
              </span>
            </div>
            <div className="w-full mb-4">
              <div className="flex justify-between items-center">
                <span className="inline-block text-sm text-[#797c8c]">
                  Email
                </span>
                <div
                  className="bg-primary/10 p-2 rounded cursor-pointer"
                  onClick={() => {
                    setOpenEditModals((prev) => ({
                      ...prev,
                      email: !prev.email,
                    }));
                  }}
                >
                  <EditIcon className="fill-primary h-3" />
                </div>
              </div>
              <span className="text-sm text-[#496057] font-bold">
                {user?.email || "((Dont have email))"}
              </span>
            </div>
            <div className="w-full mb-4">
              <div className="flex justify-between items-center">
                <span className="inline-block text-sm text-[#797c8c]">
                  Phone Number
                </span>
                <div
                  className="bg-primary/10 p-2 rounded cursor-pointer"
                  onClick={() => {
                    setOpenEditModals((prev) => ({
                      ...prev,
                      phoneNumber: !prev.phoneNumber,
                    }));
                  }}
                >
                  <EditIcon className="fill-primary h-3" />
                </div>
              </div>
              <span className="text-sm text-[#496057] font-bold">
                {profile?.phoneNumber || "((Dont have phone number))"}
              </span>
            </div>
            <div className="w-full mb-4">
              <div className="flex justify-between items-center">
                <span className="inline-block text-sm text-[#797c8c]">
                  Location
                </span>
                <div
                  className="bg-primary/10 p-2 rounded cursor-pointer"
                  onClick={() => {
                    setOpenEditModals((prev) => ({
                      ...prev,
                      location: !prev.location,
                    }));
                  }}
                >
                  <EditIcon className="fill-primary h-3" />
                </div>
              </div>
              <span className="text-sm text-[#496057] font-bold">
                {profile?.location || "((Dont have location))"}
              </span>
            </div>
          </>
        )}
      </div>
      <EditName
        open={isOpenEditModals.name}
        onCancel={() => setOpenEditModals((prev) => ({ ...prev, name: false }))}
      />
      <EditSignature
        open={isOpenEditModals.signature}
        onCancel={() =>
          setOpenEditModals((prev) => ({ ...prev, signature: false }))
        }
      />
      <EditEmail
        open={isOpenEditModals.email}
        onCancel={() =>
          setOpenEditModals((prev) => ({ ...prev, email: false }))
        }
      />
      <EditPhoneNumber
        open={isOpenEditModals.phoneNumber}
        onCancel={() =>
          setOpenEditModals((prev) => ({ ...prev, phoneNumber: false }))
        }
      />
      <EditLocation
        open={isOpenEditModals.location}
        onCancel={() =>
          setOpenEditModals((prev) => ({ ...prev, location: false }))
        }
      />
    </div>
  );
};
