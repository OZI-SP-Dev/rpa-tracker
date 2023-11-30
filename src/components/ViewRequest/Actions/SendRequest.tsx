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
import { NavigateForwardIcon } from "@fluentui/react-icons-mdl2";
import { useRequest, useUpdateStage } from "api/requestsApi";
import { STAGES } from "consts/Stages";
import { useParams } from "react-router-dom";

const ReworkRequest = () => {
  const params = useParams();
  const requestId = Number(params.requestId);
  const request = useRequest(requestId);
  const updateStage = useUpdateStage();

  const updateHandler = () => {
    if (request.data) {
      const currentStage = STAGES.find(({ key }) => key === request.data.stage);
      if (currentStage && currentStage.next !== "") {
        const newStage = currentStage.next;
        updateStage.mutate({ requestId, newStage });
      }
    }
  };

  return (
    <Dialog modalType="alert">
      <DialogTrigger disableButtonEnhancement>
        <Tooltip withArrow content="Send" relationship="label">
          <Button
            style={{
              border: "none",
              background: "transparent",
              borderRadius: "50%",
            }}
            icon={<NavigateForwardIcon className="orange" />}
            size="large"
          />
        </Tooltip>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Send request</DialogTitle>
          <DialogContent>
            <p>
              Send request forward a step.
              <br />
              Fill out this modal with a form for sending a request forward.
            </p>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Cancel</Button>
            </DialogTrigger>
            <DialogTrigger>
              <Button appearance="primary" onClick={updateHandler}>
                Send
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default ReworkRequest;
