import { useAppDispatch } from "@/shared/infra/redux/hooks";
import { RequestContact } from "./modals/requestContact";
import { PlusIcon } from "@/shared/components/icons";
import { Button } from "antd";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { getAllApplicationsAction } from "@/modules/sidebar/slices/applications";
import { Applications } from "./modals/applications";

export const Contact: FC = () => {
  const [isOpenModals, setOpenModals] = useState<{
    sendContacts: boolean;
    applications: boolean;
  }>({
    sendContacts: false,
    applications: false,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllApplicationsAction());
  }, []);

  return (
    <div className="w-full h-full shadow-[10px_0px_60px_-15px_rgba(0,0,0,0.3)] px-4">
      <div className="w-full">
        <div className="w-full h-auto flex justify-between items-center py-4">
          <h1 className="font-[600] text-[18px] text-[#495057]">Contact</h1>
          <div className="flex justify-end items-center gap-2">
            <Button
              type="primary"
              onClick={() => {
                setOpenModals((prev) => ({
                  ...prev,
                  applications: !prev.applications,
                }));
              }}
            >
              Applications
            </Button>
            <Button
              shape="circle"
              className="flex justify-center items-center"
              onClick={() => {
                setOpenModals((prev) => ({
                  ...prev,
                  sendContacts: !prev.sendContacts,
                }));
              }}
            >
              <PlusIcon className="h-4 group-hover:fill-[white] fill-[#92af9c]" />
            </Button>
          </div>
        </div>
      </div>
      <div className="py-4">
        <input
          className="w-full bg-[#f6f6f9] border-0 rounded text-[13px] font-thin"
          type="text"
          placeholder="Search Contacts..."
        />
      </div>
      <div className="pt-1 pb-8"></div>
      <RequestContact
        open={isOpenModals.sendContacts}
        onCancel={() =>
          setOpenModals((prev) => ({ ...prev, sendContacts: false }))
        }
      />
      <Applications
        open={isOpenModals.applications}
        onCancel={() =>
          setOpenModals((prev) => ({ ...prev, applications: false }))
        }
      />
    </div>
  );
};
