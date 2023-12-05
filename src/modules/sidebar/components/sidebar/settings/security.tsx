import { FC } from "react";
import { ChevronDownIcon } from "@/shared/components/icons/chevronDownIcon";
import { SecurityIcon } from "@/shared/components/icons";

export const Security: FC = () => {
  return (
    <div className="w-full h-12 py-2 px-5 border-b border-slate-100 cursor-pointer">
      <div className="w-full h-full flex items-center gap-2">
        <div className="shrink-0">
          <SecurityIcon className="h-4 fill-[#495057]" />
        </div>
        <span className="inline-block grow text-[#495057] font-[500]">
          Security
        </span>
        <div className="shrink-0">
          <ChevronDownIcon className="h-3 fill-[#495057]" />
        </div>
      </div>
    </div>
  );
};
