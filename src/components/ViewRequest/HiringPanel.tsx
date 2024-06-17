import { Label, Switch, Text } from "@fluentui/react-components";
import { useAddNote } from "api/notesApi";
import { usePostRequest } from "api/postRequestApi";
import { useRequest } from "api/requestsApi";
import { STAGES } from "consts/Stages";
import { ChangeEvent, useCallback } from "react";
import { useParams } from "react-router-dom";

const HiringPanel = () => {
  const params = useParams();
  const requestId = Number(params.requestId);
  const request = useRequest(requestId);
  const { mutate: postRequestMutate, isLoading: postRequestIsLoading } =
    usePostRequest();
  const { mutate: addNoteMutate, isLoading: addNoteIsLoading } =
    useAddNote(requestId);

  const onChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      postRequestMutate({
        requestId: Number(params.requestId),
        postRequest: { panelRequired: ev.currentTarget.checked ? "Yes" : "No" },
      });
      addNoteMutate(
        `Set 'Panel Required' to ${ev.currentTarget.checked ? "Yes" : "No"}`
      );
    },
    [postRequestMutate, addNoteMutate, params.requestId]
  );

  const selectionStageIndex = STAGES.findIndex(
    (stage) => stage.key === "Selection"
  );
  const currentStageIndex = STAGES.findIndex(
    (stage) => stage.key === request.data?.stage
  );

  if (currentStageIndex < selectionStageIndex) {
    return <></>;
  }

  if (
    currentStageIndex > selectionStageIndex ||
    request.data?.stage === "Cancelled"
  ) {
    return (
      <>
        <Label weight="semibold" htmlFor="panelRequired">
          Hiring Panel Required
        </Label>
        <Text id="panelRequired">{request.data?.panelRequired}</Text>
      </>
    );
  }

  return (
    <>
      <Label weight="semibold" htmlFor="panelRequired">
        Hiring Panel Required
      </Label>
      <div>
        <Switch
          id="panelRequired"
          checked={request.data?.panelRequired === "Yes" ? true : false}
          onChange={onChange}
          disabled={postRequestIsLoading || addNoteIsLoading}
        />
        {request.data?.panelRequired === "Yes" && (
          <Text weight="bold" style={{ color: "red" }}>
            REQUIRED
          </Text>
        )}
      </div>
    </>
  );
};

export default HiringPanel;
