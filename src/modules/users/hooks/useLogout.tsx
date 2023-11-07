import { userService } from "@/modules/users/services";

export const useLogout = () => {
  const handleLogout = async () => {
    await userService.logout();
  };

  return {
    handleLogout,
  };
};
