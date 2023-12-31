import { userService } from "../services";
import { loadingState } from "@/shared/constants/loadingState";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type useLoginResponse = {
  loading: loadingState;
  handleLogin: (formValue?: any) => Promise<void>;
};

export const useLogin = (): useLoginResponse => {
  const [loadingStatus, setLoadingStatus] = useState<loadingState>("IDLE");
  const router = useRouter();

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
      router.push("/");
    }
  };
  return {
    loading: loadingStatus,
    handleLogin,
  };
};
