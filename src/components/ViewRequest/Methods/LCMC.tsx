import { Label, Text } from "@fluentui/react-components";
import { RPARequest } from "api/requestsApi";

const ViewRequestLCMCDetails = (props: { data: RPARequest }) => {
  return (
    <section className="viewRequestDetails">
      <Label weight="semibold" htmlFor="jobBoardPostId">
        Posting ID
      </Label>
      <Text id="jobBoardPostId">{props.data.jobBoardPostId}</Text>

      <Label weight="semibold" htmlFor="closeDateLCMC">
        Close Date
      </Label>
      <Text id="closeDateLCMC">{props.data.closeDateLCMC?.toDateString()}</Text>
    </section>
  );
};

export default ViewRequestLCMCDetails;
