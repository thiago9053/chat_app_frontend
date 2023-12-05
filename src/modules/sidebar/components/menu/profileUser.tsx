"use client";
import { useProfile } from "@/modules/sidebar/hooks/useProfile";
import { changeActiveMenu, menuType } from "@/modules/sidebar/slices/menu";
import { userService } from "@/modules/users/services";
import {
  LogOutIcon,
  PrivacyIcon,
  ProfileIcon,
  SettingIcon,
} from "@/shared/components/icons";
import { avatarPlaceholder } from "@/shared/constants/placeholderImages";
import { useAppDispatch } from "@/shared/infra/redux/hooks";
import { getAvatar } from "@/shared/infra/supabase/storage";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { toast } from "react-toastify";

export const ProfileUser: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleChangeMenu = (menuType: menuType) => {
    dispatch(changeActiveMenu({ menuType }));
  };

  const handleLogout = async () => {
    await userService.logout();
    toast.success("Logout successfully", {
      position: toast.POSITION.TOP_LEFT,
    });
    router.push("/login");
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <div
          className="flex justify-between items-center gap-4"
          onClick={() => handleChangeMenu("PROFILE")}
        >
          <span className="inline-block text-[#495057] font-[500]">
            Profile
          </span>
          <ProfileIcon className="h-4" fill="rgba(73, 80, 87, 0.75)" />
        </div>
      ),
      key: "profile",
    },
    {
      label: (
        <div
          className="flex justify-between items-center gap-4"
          onClick={() => handleChangeMenu("SETTING")}
        >
          <span className="inline-block text-[#495057] font-[500]">
            Setting
          </span>
          <SettingIcon className="h-4" fill="rgba(73, 80, 87, 0.75)" />
        </div>
      ),
      key: "setting",
    },
    {
      label: (
        <div className="flex justify-between items-center gap-4">
          <span className="inline-block text-[#495057] font-[500]">
            Change Password
          </span>
          <PrivacyIcon className="h-4" fill="rgba(73, 80, 87, 0.75)" />
        </div>
      ),
      key: "change-password",
    },
    {
      type: "divider",
    },
    {
      label: (
        <div className="flex justify-between items-center gap-4">
          <span
            className="inline-block text-[#495057] font-[500]"
            onClick={() => handleLogout()}
          >
            Logout
          </span>
          <LogOutIcon className="h-4" fill="rgba(73, 80, 87, 0.75)" />
        </div>
      ),
      key: "logout",
    },
  ];

  const { profileInformation } = useProfile();
  const { profile } = profileInformation;

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <div
        className="bg-cover mt-4 h-9 w-9 rounded-full border-[3px] border-[#eaeaf1] cursor-pointer"
        style={{
          backgroundImage: `url(${
            profile?.avatarUrl
              ? getAvatar(profile?.avatarUrl)
              : avatarPlaceholder
          })`,
        }}
      ></div>
    </Dropdown>
  );
};
