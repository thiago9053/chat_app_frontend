import { profileService } from "@/modules/sidebar/services";

export const useProfile = () => {
  const handleGetProfile = async () => {
    const response = await profileService.getProfile();
    console.log(response);
  };

  return {
    handleGetProfile,
  };
};
