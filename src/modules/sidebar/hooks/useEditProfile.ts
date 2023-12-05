import { useState } from "react";
import { loadingState } from "@/shared/constants/loadingState";
import { useProfile } from "@/modules/sidebar/hooks/useProfile";
import { profileService } from "@/modules/sidebar/services";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/shared/infra/redux/hooks";
import { getProfileAction } from "@/modules/sidebar/slices/profile";

interface IUseEditNameProps {
  afterSubmit: () => void;
  field: string;
}

export const useEditProfile = (props: IUseEditNameProps) => {
  const { afterSubmit, field } = props;
  const [loading, setLoading] = useState<loadingState>("IDLE");
  const [error, setError] = useState<string>("");

  const dispatch = useAppDispatch();

  const { profileInformation } = useProfile();

  const { profile } = profileInformation;

  const handleUpdateProfile = async (formValue: { [key: string]: string }) => {
    try {
      setLoading("LOADING");
      const response = await profileService.updateProfile({
        field,
        data: formValue[field],
      });
      if (response.isLeft()) {
        setLoading("ERROR");
        setError(response.value);
        toast.error(response.value, {
          position: toast.POSITION.TOP_LEFT,
        });
      } else {
        setLoading("COMPLETE");
        toast.success(`Update ${field} successfully`, {
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
    fieldValue: profile?.[field] || "",
    handleUpdateProfile,
    loading,
    error,
  };
};
