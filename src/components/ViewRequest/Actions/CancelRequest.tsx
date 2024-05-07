import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Tooltip,
} from "@fluentui/react-components";
import { DeleteIcon } from "@fluentui/react-icons-mdl2";
import { useCancelRequest, useRequest } from "api/requestsApi";
import { Navigate, useParams } from "react-router-dom";

declare const _spPageContextInfo: {
  userId: number;
};

const CancelRequest = () => {
  const params = useParams();
  const request = useRequest(Number(params.requestId));
  const cancelRequest = useCancelRequest();

  const blockedStages = ["Complete", "Cancelled"];

  const canCancel =
    Number(request.data?.Author?.Id) === _spPageContextInfo.userId &&
    !blockedStages.includes(request.data?.stage || "");

  const cancelHandler = () => {
    cancelRequest.mutate(Number(params.requestId));
  };

  return (
    <>
      {cancelRequest.isSuccess && <Navigate to="/" />}
      {!cancelRequest.isSuccess && (
        <Dialog modalType="alert">
          <DialogTrigger disableButtonEnhancement>
            <Tooltip withArrow content="Delete" relationship="label">
              <Button
                style={{
                  border: "none",
                  background: "transparent",
                  borderRadius: "50%",
                }}
                icon={<DeleteIcon className="red" />}
                size="large"
                disabled={!canCancel}
              />
            </Tooltip>
          </DialogTrigger>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Cancel request</DialogTitle>
              <DialogContent>
                Are you sure you wish to cancel this request?
              </DialogContent>
              <DialogActions>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance="secondary">No</Button>
                </DialogTrigger>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance="primary" onClick={cancelHandler}>
                    Cancel Request
                  </Button>
                </DialogTrigger>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      )}
    </>
  );
};

export default CancelRequest;
