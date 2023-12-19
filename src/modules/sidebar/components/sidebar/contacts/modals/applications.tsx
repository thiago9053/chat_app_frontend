import { useApplications } from "@/modules/sidebar/hooks/useApplications";
import { ApplicationState } from "@/modules/sidebar/slices/applications";
import { avatarPlaceholder } from "@/shared/constants/placeholderImages";
import { getAvatar } from "@/shared/infra/supabase/storage";
import { Modal, Button } from "antd";
import { FC } from "react";

interface ApplicationsProps {
  onCancel: any;
  open: boolean;
}

export const Applications: FC<ApplicationsProps> = (props) => {
  const { open, onCancel } = props;

  const { applications, loading, handleAcceptRequest, handleRejectRequest } =
    useApplications();

  console.log(applications);
  return (
    <Modal
      title={
        <h1 className="text-[#495057] text-[16px] font-bold">Applications</h1>
      }
      width={500}
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
      ]}
    >
      <div className="border-b border-slate-100 max-h-[300px] overflow-y-scroll scrollbar-hide mt-4">
        {applications.length === 0 && (
          <div className="h-[298px] flex items-center justify-center">
            <span>You dont have any applications</span>
          </div>
        )}
        {loading === "LOADING" && (
          <div className="h-[298px] flex items-center justify-center">
            <span>Loading</span>
          </div>
        )}
        {loading === "COMPLETE" &&
          applications.length > 0 &&
          applications.map((application: ApplicationState, index: number) => {
            return (
              <div
                key={index}
                className="flex px-4 justify-between items-center cursor-pointer rounded border border-primary"
              >
                <div className="flex justify-start items-center gap-4 my-2">
                  <div
                    className="rounded-full relative h-10 w-10 bg-cover outline-2 border-2 border-primary"
                    style={{
                      backgroundImage: `url(${
                        application.avatarUrl
                          ? getAvatar(application.avatarUrl)
                          : avatarPlaceholder
                      })`,
                    }}
                  ></div>
                  <div>
                    <span className="text-[#6A636C] text-sm font-bold noselect">
                      {application.name || "((Unamed))"}
                    </span>
                    <br />
                    <span className="text-[#6A636C] text-sm noselect">
                      {application.email}
                    </span>
                    <br />
                    <p className="text-[#1c1c1b] text-sm noselect pt-2 line-clamp-3 w-full">
                      <strong>Message:</strong> {application.message}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    disabled={application.loadingState === "LOADING"}
                    type="dashed"
                    onClick={() => handleRejectRequest(application.requestId)}
                  >
                    Reject
                  </Button>
                  <Button
                    disabled={application.loadingState === "LOADING"}
                    type="primary"
                    onClick={() => handleAcceptRequest(application.requestId)}
                  >
                    Accept
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
    </Modal>
  );
};
