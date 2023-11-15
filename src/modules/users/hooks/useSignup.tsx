import { userService } from "../services";
import { loadingState } from "@/shared/constants/loadingState";
import { useState } from "react";
import { toast } from "react-toastify";

type useSignupResponse = {
  loading: loadingState;
  handleSignup: (formValue?: any) => Promise<void>;
};

export const useSignup = (): useSignupResponse => {
  const [loadingStatus, setLoadingStatus] = useState<loadingState>("IDLE");
  const handleSignup = async (formValue: any) => {
    setLoadingStatus("LOADING");
    const { username, password, email } = formValue;
    const response = await userService.signup({ username, password, email });
    if (response.isLeft()) {
      setLoadingStatus("ERROR");
      const error = response.value;
      toast.error(error, {
        position: toast.POSITION.TOP_LEFT,
      });
    } else {
      setLoadingStatus("COMPLETE");
      toast.success("Sign up new account successfully", {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };
  return {
    loading: loadingStatus,
    handleSignup,
  };
};
