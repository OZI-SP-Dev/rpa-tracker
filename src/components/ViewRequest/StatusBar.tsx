import { useRequest } from "api/requestsApi";
import { useParams } from "react-router-dom";
import { STAGES } from "consts/Stages";
import {
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Title2,
  Title3,
} from "@fluentui/react-components";

const StatusBar = () => {
  const params = useParams();
  const request = useRequest(Number(params.requestId));

  const stageIndex = STAGES.findIndex(({ key }) => key === request.data?.stage);
  const currentStage = STAGES[stageIndex]?.text || "Loading...";

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
          <Popover withArrow openOnHover>
            <PopoverTrigger>
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
            </PopoverTrigger>
            <PopoverSurface tabIndex={-1}>
              <>Some text</>
            </PopoverSurface>
          </Popover>
        ))}
      </ul>
    </>
  );
};

export default StatusBar;
