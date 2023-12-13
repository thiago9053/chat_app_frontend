import { PlusIcon } from "@/shared/components/icons";
import { Button } from "antd";
import clsx from "clsx";
import { FC } from "react";

export const Contact: FC = () => {
  return (
    <div className="w-full h-full shadow-[10px_0px_60px_-15px_rgba(0,0,0,0.3)] px-4">
      <div className="w-full">
        <div className="w-full h-auto flex justify-between items-center py-4">
          <h1 className="font-[600] text-[18px] text-[#495057]">Contact</h1>
          <div className="flex justify-end items-center gap-2">
            {/* <button
              className={clsx(
                "relative cursor-pointer px-2 h-8 flex justify-center items-center rounded bg-primary/20 hover:bg-primary transition-all duration-300 group"
              )}
            >
              <span className="group-hover:text-white text-primary">
                Applications
              </span>
            </button> */}
            <Button type="primary">Applications</Button>
            <Button shape="circle" className="flex justify-center items-center">
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
    </div>
  );
};
