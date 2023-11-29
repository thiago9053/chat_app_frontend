import { FC, useState } from "react";
import { CoverImage } from "./coverImage";
import { Avatar } from "./avatar";
import { Status } from "./status";
import { useProfile } from "@/modules/sidebar/hooks/useProfile";
import { PersonalInfo } from "./personalInfo";
import { Themes } from "./themes";

interface SettingItemsState {
  personalInfo: boolean;
  themes: boolean;
  privacy: boolean;
  security: boolean;
}

const initialState: SettingItemsState = {
  personalInfo: false,
  themes: false,
  privacy: false,
  security: false,
};

export const Settings: FC = () => {
  const [itemState, setItemState] = useState<SettingItemsState>(initialState);
  const { profileInformation } = useProfile();
  const { profile } = profileInformation;

  return (
    <div className="w-full h-full relative shadow-[10px_0px_60px_-15px_rgba(0,0,0,0.3)]">
      <CoverImage />
      <div className="relative left-0 w-full px-[1.5rem] pt-[0.5rem] pb-[2rem] border-b border-slate-100 flex flex-col justify-center items-center mt-[-56px]">
        <Avatar />
        <h1 className="font-bold text-gray-700 text-[17px]">
          {profile?.name || "((Unamed))"}
        </h1>
        <p className="text-slate-500 text-[15px]">
          {profile?.signature || "((Dont have signature))"}
        </p>
        <Status />
      </div>
      <div className="overflow-y-scroll scrollbar-hide">
        <PersonalInfo
          isOpen={itemState.personalInfo}
          setOpen={() => {
            setItemState((state) => ({
              ...initialState,
              personalInfo: !state.personalInfo,
            }));
          }}
        />
        <Themes
          isOpen={itemState.themes}
          setOpen={() => {
            setItemState((state) => ({
              ...initialState,
              themes: !state.themes,
            }));
          }}
        />
      </div>
    </div>
  );
};
