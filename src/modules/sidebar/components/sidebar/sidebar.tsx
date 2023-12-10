import { FC } from "react";
import { useAppSelector } from "@/shared/infra/redux/hooks";
import { selectMenu } from "../../slices/menu";

import { Profile } from "./profile/profile";
import { Settings } from "./settings";
import { Contact } from "./contacts/contacts";

export const Sidebar: FC = () => {
  const sidebarState = useAppSelector(selectMenu);

  const { activeMenu } = sidebarState;

  return (
    <div className="w-[300px] h-full bg-white">
      {activeMenu === "PROFILE" && <Profile />}
      {activeMenu === "SETTING" && <Settings />}
      {activeMenu === "CONTACT" && <Contact />}
    </div>
  );
};
