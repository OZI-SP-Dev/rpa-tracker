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
import { useRequest, useUpdateStage, validateRequest } from "api/requestsApi";
import { STAGES } from "consts/Stages";
import { useNavigate, useParams } from "react-router-dom";

const SendRequest = () => {
  const params = useParams();
  const requestId = Number(params.requestId);
  const request = useRequest(requestId);
  const updateStage = useUpdateStage();
  const navigate = useNavigate();

  const currentStage = STAGES.find(({ key }) => key === request.data?.stage);

  let draftErrors;
  if (currentStage?.key === "Draft" && request.data) {
    draftErrors = validateRequest(request.data);
  }

  const updateHandler = () => {
    if (request.data && currentStage?.next) {
      let newData = {
        requestId,
        newStage: "",
        newSubStage: "",
        eventTitle: "",
      };

      const subStage = currentStage.subStages?.find(
        ({ key }) => key === request.data.subStage
      );

      if (subStage && subStage.next) {
        newData.newStage = currentStage.key;
        newData.newSubStage = subStage.next;
        newData.eventTitle = subStage.nextEventTitle;
      } else {
        const nextStage = STAGES.find(({ key }) => key === currentStage.next);
        newData.newStage = currentStage.next;
        newData.newSubStage = nextStage?.subStages?.[0].key || ""; // first substage of next stage or empty string
        newData.eventTitle = currentStage.nextEventTitle;
      }
      updateStage.mutate(newData);
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
            disabled={!currentStage?.next}
          />
        </Tooltip>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Send request</DialogTitle>
          <DialogContent>
            {draftErrors?.hasErrors ? (
              <>
                {draftErrors?.HiringInfo && <p>Hiring Info is incomplete.</p>}
                {draftErrors?.JobBoard && (
                  <p>LCMC Job Board Information is incomplete.</p>
                )}
                {draftErrors?.JOA && (
                  <p>JOA Additional Information is incomplete.</p>
                )}
                {draftErrors?.LinkedInPost && (
                  <p>
                    LinkedIn Job Posting Additional Information is incomplete.
                  </p>
                )}
                {draftErrors?.USAJobs && (
                  <p>USA Jobs Flyer Additional Information is incomplete.</p>
                )}
              </>
            ) : (
              <p>Are you sure you want to send the request? </p>
            )}
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Cancel</Button>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              {draftErrors?.hasErrors ? (
                <Button
                  appearance="primary"
                  onClick={() => navigate("/New/" + params.requestId)}
                >
                  Make Edits
                </Button>
              ) : (
                <Button appearance="primary" onClick={updateHandler}>
                  Send
                </Button>
              )}
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default SendRequest;
