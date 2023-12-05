import { useState } from "react";
import { loadingState } from "@/shared/constants/loadingState";
import { useProfile } from "@/modules/sidebar/hooks/useProfile";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/shared/infra/redux/hooks";
import { getProfileAction } from "@/modules/sidebar/slices/profile";
import { userService } from "@/modules/users/services";

interface IUseEditNameProps {
  afterSubmit: () => void;
}

export const useChangeEmail = (props: IUseEditNameProps) => {
  const { afterSubmit } = props;

  const [loading, setLoading] = useState<loadingState>("IDLE");
  const [error, setError] = useState<string>("");

  const dispatch = useAppDispatch();

  const { profileInformation } = useProfile();
  const { user } = profileInformation;

  const handleChangeMail = async (formValue: { email: string }) => {
    try {
      const { email } = formValue;
      setLoading("LOADING");
      const response = await userService.updateEmail({
        email,
      });
      if (response.isLeft()) {
        setLoading("ERROR");
        setError(response.value);
        toast.error(response.value, {
          position: toast.POSITION.TOP_LEFT,
        });
      } else {
        setLoading("COMPLETE");
        toast.success("Update email successfully", {
          position: toast.POSITION.TOP_LEFT,
        });
      }
      afterSubmit();
      dispatch(getProfileAction());
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else if (typeof error === "string") {
        setError(error);
      }
      setLoading("ERROR");
    }
  };

  return {
    email: user?.email || "",
    handleChangeMail,
    loading,
    error,
  };
};
