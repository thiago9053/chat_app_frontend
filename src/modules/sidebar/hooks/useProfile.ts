import { useState } from "react";
import { selectProfile, ProfileState } from "@/modules/sidebar/slices/profile";
import { useAppSelector } from "@/shared/infra/redux/hooks";

export const useProfile = () => {
  const profileState = useAppSelector(selectProfile);
  const { profile, loadingState } = profileState;
  return { profile, loadingState };
};
