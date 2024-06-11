import { useRequest } from "api/requestsApi";
import { useParams } from "react-router-dom";
import { STAGES } from "consts/Stages";
import { Title2, Title3 } from "@fluentui/react-components";

const StatusBar = () => {
  const params = useParams();
  const request = useRequest(Number(params.requestId));

  const stageIndex = STAGES.findIndex(({ key }) => key === request.data?.stage);
  const currentStage =
    STAGES[stageIndex]?.text || request.data?.stage || "Loading...";
  const subStageIndex = STAGES[stageIndex]?.subStages?.findIndex(
    ({ key }) => key === request.data?.subStage
  );

  return (
    <>
      {request.data && (
        <Title2>
          {request.data.requestType} for {request.data.paySystem}-
          {request.data.series}-{request.data.grade} in{" "}
          {request.data.officeSymbol}
        </Title2>
      )}
      <br />
      <Title3>Current Stage: {currentStage}</Title3>
      <ul className="request-status">
        {STAGES.map((stage, index) => (
          <li
            key={stage.key}
            className={
              (index < stageIndex ? "completed-stage" : "") ||
              (index === stageIndex ? "active-stage" : "") ||
              (index > stageIndex ? "inactive-stage" : "")
            }
          >
            <div>{stage.text}</div>
          </li>
        ))}
      </ul>
      {subStageIndex !== undefined &&
        STAGES[stageIndex]?.subStages !== undefined && (
          <>
            <hr />
            <ul className="request-status">
              {STAGES[stageIndex].subStages?.map((stage, index) => (
                <>
                  {stage.showStage(request.data) && (
                    <li
                      key={stage.key}
                      className={
                        (index < subStageIndex ? "completed-stage" : "") ||
                        (index === subStageIndex ? "active-stage" : "") ||
                        (index > subStageIndex ? "inactive-stage" : "")
                      }
                    >
                      <div>{stage.text}</div>
                    </li>
                  )}
                </>
              ))}
            </ul>
          </>
        )}
    </>
  );
};

export default StatusBar;
