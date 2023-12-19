import {
  ApplicationState,
  handleApplicationAction,
  selectApplications,
} from "@/modules/sidebar/slices/applications";
import { loadingState } from "@/shared/constants/loadingState";
import { useAppDispatch, useAppSelector } from "@/shared/infra/redux/hooks";
import { useEffect, useState } from "react";

export const useApplications = () => {
  const [applications, setApplications] = useState<ApplicationState[]>([]);
  const [loading, setLoading] = useState<loadingState>("IDLE");

  const applicationsState = useAppSelector(selectApplications);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setApplications(applicationsState.applications);
    setLoading(applicationsState.loadingState);
  }, [applicationsState.applications, applicationsState.loadingState]);

  const handleRejectRequest = async (requestId: string) => {
    await dispatch(handleApplicationAction({ requestId, status: "Rejected" }));
  };

  const handleAcceptRequest = async (requestId: string) => {
    await dispatch(handleApplicationAction({ requestId, status: "Accepted" }));
  };

  return {
    applications,
    loading,
    handleAcceptRequest,
    handleRejectRequest,
  };
};
