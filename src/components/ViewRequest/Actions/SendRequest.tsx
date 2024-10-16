import {
  Button,
  Checkbox,
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
import { useAddNote } from "api/notesApi";
import { useRequest, useUpdateStage, validateRequest } from "api/requestsApi";
import { useMyRoles } from "api/rolesApi";
import { STAGES } from "consts/Stages";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SendRequest = () => {
  const params = useParams();
  const requestId = Number(params.requestId);
  const request = useRequest(requestId);
  const updateStage = useUpdateStage();
  const addNote = useAddNote(requestId);
  const navigate = useNavigate();
  const myRoles = useMyRoles();

  const [csfcaApproval, setCsfcaApproval] = useState(false);
  const [hqApproval, setHqApproval] = useState(false);
  const [titleV, setTitleV] = useState(false);

  const currentStage = STAGES.find(({ key }) => key === request.data?.stage);
  const askIfCurrentEmployee = currentStage?.key === "Selection";

  let draftErrors;
  if (currentStage?.key === "Draft" && request.data) {
    draftErrors = validateRequest(request.data);
  }

  const readyForNextStage = currentStage?.readyForNext(request?.data) ?? false;

  let disableSend = true;
  if (currentStage?.next) {
    if (currentStage?.key === "Draft") {
      disableSend = false;
    } else if (myRoles.isHRL || myRoles.isCOSF) {
      disableSend = false;
    } else if (
      (request.data?.subStage === "OSFReview" ||
        request.data?.subStage === "SelectionPackageOSFApproval") &&
      myRoles.isOSF
    ) {
      disableSend = false;
    } else if (
      request.data?.subStage === "SelectionPackageCAApproval" &&
      myRoles.isCA
    ) {
      disableSend = false;
    } else if (currentStage?.key === "Recruiting" && myRoles.isCSF) {
      disableSend = false;
    } else if (currentStage?.key === "Selection" && myRoles.isCSF) {
      disableSend = false;
    } else if (
      request.data?.subStage === "SelectionPackageCSFApproval" &&
      myRoles.isCSF
    ) {
      disableSend = false;
    } else if (
      request.data?.subStage === "SelectionPackageHQApproval" &&
      myRoles.isHQ
    ) {
      disableSend = false;
    }
  }

  let nextStage = "";
  let nextSubStage = "";
  let eventText = "";

  if (request.data && currentStage?.next) {
    const subStage = currentStage.subStages?.find(
      ({ key }) => key === request.data.subStage
    );

    if (subStage && subStage.next && subStage.next(request.data)) {
      // There is another substage, set that as next
      nextStage = currentStage.key;
      nextSubStage = subStage.next(request.data) || "";
      eventText = subStage.nextEventTitle(request.data) || "";
    } else {
      // No followon substage, find next major stage
      const nextMajorStage = STAGES.find(
        ({ key }) => key === currentStage.next(request.data)
      );
      nextStage = currentStage.next(request.data) || "";
      nextSubStage = nextMajorStage?.subStages?.[0].key || ""; // first substage of next stage or empty string
      eventText = currentStage.nextEventTitle(request.data) || "";
    }
  }

  const updateHandler = (currentEmployee?: "Yes" | "No") => {
    if (request.data && currentStage?.next) {
      const newData = {
        requestId,
        newStage: nextStage,
        newSubStage: nextSubStage,
        eventTitle: eventText,
        ...(currentEmployee && { currentEmployee: currentEmployee }),
      };

      updateStage.mutateAsync(newData).then(() => {
        if (currentStage?.key === "Recruiting") {
          addNote.mutate("Moved to Candidate Selection");
        }
        if (currentStage?.key === "Selection") {
          let myString = "Moved to Package Prep and Approval.\n";
          myString += "Candidate is ";
          if (currentEmployee === "No") {
            myString += "not ";
          }
          myString += "a current federal employee.";
          addNote.mutate(myString);
        }
      });
    }
  };

  const draftPackageHandler = () => {
    const newData = {
      requestId,
      newStage: nextStage,
      newSubStage: nextSubStage,
      eventTitle: eventText,
      csfcaApproval: (csfcaApproval ? "Yes" : "No") as "Yes" | "No",
      hqApproval: (hqApproval ? "Yes" : "No") as "Yes" | "No",
      titleV: (titleV ? "Yes" : "No") as "Yes" | "No",
    };
    updateStage.mutateAsync(newData);
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
            disabled={disableSend}
          />
        </Tooltip>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Send request</DialogTitle>
          {request.data?.subStage === "DraftPackageHRL" ? (
            <>
              <DialogContent>
                <p>Select required approvals:</p>
                <Checkbox
                  checked={csfcaApproval}
                  label="CSF/CA Approval"
                  onChange={() => setCsfcaApproval((checked) => !checked)}
                />
                <Checkbox
                  checked={hqApproval}
                  label="HQ Approval"
                  onChange={() => setHqApproval((checked) => !checked)}
                />
                <Checkbox
                  checked={titleV}
                  label="Title V"
                  onChange={() => setTitleV((checked) => !checked)}
                />
              </DialogContent>
              <DialogActions>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance="secondary">Cancel</Button>
                </DialogTrigger>
                <DialogTrigger disableButtonEnhancement>
                  <Button
                    appearance="primary"
                    onClick={() => draftPackageHandler()}
                  >
                    Send
                  </Button>
                </DialogTrigger>
              </DialogActions>
            </>
          ) : askIfCurrentEmployee ? (
            <>
              <DialogContent>
                <p>Is selected candidate a current federal employee?</p>
              </DialogContent>
              <DialogActions fluid>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance="secondary">Cancel</Button>
                </DialogTrigger>
                <DialogTrigger disableButtonEnhancement>
                  <Button
                    appearance="primary"
                    onClick={() => updateHandler("No")}
                  >
                    Not Federal Employee
                  </Button>
                </DialogTrigger>
                <DialogTrigger disableButtonEnhancement>
                  <Button
                    appearance="primary"
                    onClick={() => updateHandler("Yes")}
                  >
                    Federal Employee
                  </Button>
                </DialogTrigger>
              </DialogActions>
            </>
          ) : (
            <>
              <DialogContent>
                {draftErrors?.hasErrors ? (
                  <>
                    {draftErrors?.HiringInfo && (
                      <p>Hiring Info is incomplete.</p>
                    )}
                    {draftErrors?.JobBoard && (
                      <p>LCMC Job Board Information is incomplete.</p>
                    )}
                    {draftErrors?.JOA && (
                      <p>JOA Additional Information is incomplete.</p>
                    )}
                    {draftErrors?.LinkedInPost && (
                      <p>
                        LinkedIn Job Posting Additional Information is
                        incomplete.
                      </p>
                    )}
                    {draftErrors?.USAJobs && (
                      <p>
                        USA Jobs Flyer Additional Information is incomplete.
                      </p>
                    )}
                  </>
                ) : readyForNextStage ? (
                  nextStage === "Complete" ? (
                    <p>Are you sure you want to Complete this request?</p>
                  ) : (
                    <p>Are you sure you want to send the request? </p>
                  )
                ) : (
                  <p>Complete all items before sending forward.</p>
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
                    <Button
                      appearance="primary"
                      onClick={() => updateHandler()}
                      disabled={!readyForNextStage}
                    >
                      Send
                    </Button>
                  )}
                </DialogTrigger>
              </DialogActions>
            </>
          )}
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default SendRequest;
