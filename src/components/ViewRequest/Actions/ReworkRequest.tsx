import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Field,
  Textarea,
  TextareaProps,
  Tooltip,
} from "@fluentui/react-components";
import { NavigateBackIcon } from "@fluentui/react-icons-mdl2";
import { useAddNote } from "api/notesApi";
import { useRequest, useUpdateStage } from "api/requestsApi";
import { STAGES } from "consts/Stages";
import { useState } from "react";
import { useParams } from "react-router-dom";

declare const _spPageContextInfo: {
  userId: number;
  userDisplayName: string;
  userEmail: string;
  userLoginName: string;
};

const ReworkRequest = () => {
  const params = useParams();
  const requestId = Number(params.requestId);
  const request = useRequest(requestId);
  const updateStage = useUpdateStage();
  const addNote = useAddNote(requestId);
  const [reason, setReason] = useState("");

  const currentStage = STAGES.find(({ key }) => key === request.data?.stage);

  const updateReason: TextareaProps["onChange"] = (_e, data) => {
    setReason(data.value);
  };

  const updateHandler = () => {
    if (request.data && currentStage?.previous) {
      const newData = {
        requestId,
        newStage: "",
        newSubStage: "",
        eventTitle: "",
        rework: true,
        reworkText: reason,
        reworkAuthor: _spPageContextInfo.userDisplayName,
      };

      const subStage = currentStage.subStages?.find(
        ({ key }) => key === request.data.subStage
      );

      if (subStage && subStage.previous) {
        newData.newStage = currentStage.key;
        newData.newSubStage = subStage.previous;
        newData.eventTitle = subStage.previousEventTitle || "";
      } else {
        const previousStage = STAGES.find(
          ({ key }) => key === currentStage.previous
        );
        newData.newStage = currentStage.previous;
        newData.newSubStage = previousStage?.subStages?.[0].key || ""; // first substage or empty string
        newData.eventTitle = currentStage.previousEventTitle || "";
      }
      updateStage.mutate(newData);
      addNote.mutate(reason);
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
            <Field label="Rework reason">
              <Textarea value={reason} onChange={updateReason} />
            </Field>
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
