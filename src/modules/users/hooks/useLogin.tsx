import { userService } from "@/modules/users/services";
import { loadingState } from "@/shared/constants/loadingState";
import { useState } from "react";
import { toast } from "react-toastify";

export const useLogin = () => {
  const [loadingStatus, setLoadingStatus] = useState<loadingState>("IDLE");
  const handleLogin = async (formValue: any) => {
    setLoadingStatus("LOADING");
    const { username, password } = formValue;
    const response = await userService.login({ username, password });
    if (response.isLeft()) {
      setLoadingStatus("ERROR");
      const error = response.value;
      toast.error(error, {
        position: toast.POSITION.TOP_LEFT,
      });
    } else {
      setLoadingStatus("COMPLETE");
      toast.success("Login successfully", {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };
  return {
    loading: loadingStatus,
    handleLogin,
  };
};
