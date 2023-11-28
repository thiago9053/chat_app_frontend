import { selectProfile } from "@/modules/sidebar/slices/profile";
import { useAppSelector } from "@/shared/infra/redux/hooks";
import { useEffect, useState } from "react";

export const useProfile = () => {
  const [profile, setProfile] = useState<any>({});
  const profileSelector = useAppSelector(selectProfile);

  useEffect(() => {
    if (profileSelector.loadingState === "COMPLETE") {
      setProfile(profileSelector.profile);
    } else {
      setProfile({});
    }
  }, [profileSelector.loadingState]);

  return {
    profileInformation: profile,
    loadingState: profileSelector.loadingState,
  };
};
