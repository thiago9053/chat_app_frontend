import { useState } from "react";
import { loadingState } from "@/shared/constants/loadingState";
import { contactService, profileService } from "@/modules/sidebar/services";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/shared/infra/redux/hooks";
import { getProfileAction } from "@/modules/sidebar/slices/profile";
import { findProfile } from "@/modules/sidebar/services/profile.service";

interface IUseSendRequestProps {
  afterSubmit: () => void;
}

export const useRequestContact = (props: IUseSendRequestProps) => {
  const { afterSubmit } = props;
  const [loading, setLoading] = useState<loadingState>("IDLE");
  const [foundContacts, setFoundContacts] = useState<findProfile[]>([]);
  const [error, setError] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleSendRequest = async (formValue: { [key: string]: string }) => {
    const { requesting, message } = formValue;
    try {
      setLoading("LOADING");
      const response = await contactService.sendRequestContact({
        requesting,
        message,
      });
      if (response.isLeft()) {
        setLoading("ERROR");
        setError(response.value);
        toast.error(response.value, {
          position: toast.POSITION.TOP_LEFT,
        });
      } else {
        setLoading("COMPLETE");
        toast.success("Send request successfully", {
          position: toast.POSITION.TOP_LEFT,
        });
      }
      afterSubmit();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else if (typeof error === "string") {
        setError(error);
      }
      setLoading("ERROR");
    }
  };

  const handleSearchContact = async (keyword: string) => {
    try {
      if (keyword !== "") {
        const response = await profileService.findProfile({ keyword });
        if (response.isLeft()) {
          setFoundContacts([]);
        } else {
          const foundContacts: findProfile[] = [];
          response.value
            .getValue()
            .foundProfiles.forEach((profile: findProfile) => {});
          setFoundContacts(response.value.getValue().foundProfiles);
        }
      } else {
        setFoundContacts([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleSendRequest,
    handleSearchContact,
    foundContacts,
    loading,
    error,
  };
};
