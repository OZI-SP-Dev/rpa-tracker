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
import { NavigateBackIcon } from "@fluentui/react-icons-mdl2";
import { useRequest, useUpdateStage } from "api/requestsApi";
import { STAGES } from "consts/Stages";
import { useParams } from "react-router-dom";

const ReworkRequest = () => {
  const params = useParams();
  const requestId = Number(params.requestId);
  const request = useRequest(requestId);
  const updateStage = useUpdateStage();

  const currentStage = STAGES.find(({ key }) => key === request.data?.stage);

  const updateHandler = () => {
    if (request.data && currentStage?.previous) {
      let newData = {
        requestId,
        newStage: "",
        newSubStage: "",
        eventTitle: "",
      };

      const subStage = currentStage.subStages?.find(
        ({ key }) => key === request.data.subStage
      );

      if (subStage && subStage.previous) {
        newData.newStage = currentStage.key;
        newData.newSubStage = subStage.previous;
        newData.eventTitle = subStage.previousEventTitle;
      } else {
        const previousStage = STAGES.find(
          ({ key }) => key === currentStage.previous
        );
        newData.newStage = currentStage.previous;
        newData.newSubStage = previousStage?.subStages?.[0].key || ""; // first substage or empty string
        newData.eventTitle = currentStage.previousEventTitle;
      }
      updateStage.mutate(newData);
    }
  };

  return (
    <Dialog modalType="alert">
      <DialogTrigger disableButtonEnhancement>
        <Tooltip withArrow content="Rework" relationship="label">
          <Button
            style={{
              border: "none",
              background: "transparent",
              borderRadius: "50%",
            }}
            icon={<NavigateBackIcon className="orange" />}
            size="large"
            disabled={!currentStage?.previous}
          />
        </Tooltip>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Rework request</DialogTitle>
          <DialogContent>
            <p>
              Send request back a step?
              <br />
              Fill out this modal with a form for sending a request back a step
              with a reason. (Notes capability pending)
            </p>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Cancel</Button>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="primary" onClick={updateHandler}>
                Submit
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default ReworkRequest;
