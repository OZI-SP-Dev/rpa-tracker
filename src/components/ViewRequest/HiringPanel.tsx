import { Label, Switch, Text } from "@fluentui/react-components";
import { usePostRequest } from "api/postRequestApi";
import { useRequest } from "api/requestsApi";
import { STAGES } from "consts/Stages";
import { ChangeEvent, useCallback } from "react";
import { useParams } from "react-router-dom";

const HiringPanel = () => {
  const params = useParams();
  const request = useRequest(Number(params.requestId));
  const postRequest = usePostRequest();

  const onChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    postRequest.mutate({
      requestId: Number(params.requestId),
      postRequest: { panelRequired: ev.currentTarget.checked ? "Yes" : "No" },
    });
  }, []);

  const selectionStageIndex = STAGES.findIndex(
    (stage) => stage.key === "Selection"
  );
  const currentStageIndex = STAGES.findIndex(
    (stage) => stage.key === request.data?.stage
  );

  if (currentStageIndex < selectionStageIndex) {
    return <></>;
  }

  if (currentStageIndex > selectionStageIndex) {
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
          disabled={postRequest.isLoading}
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
