import { Label, Text } from "@fluentui/react-components";
import { RPARequest } from "api/requestsApi";
import UpdatePostId from "components/ViewRequest/DetailSections/UpdatePostId";

const ViewRequestLCMCDetails = (props: { data: RPARequest }) => {
  return (
    <section className="viewRequestDetails">
      <Label weight="semibold" htmlFor="jobBoardPostId">
        Posting ID
      </Label>
      <div>
        <Text id="jobBoardPostId">{props.data.jobBoardPostId}</Text>
        <UpdatePostId detailSelection="jobBoardPostId" />
      </div>

      <Label weight="semibold" htmlFor="closeDateLCMC">
        Close Date
      </Label>
      <Text id="closeDateLCMC">{props.data.closeDateLCMC?.toDateString()}</Text>
    </section>
  );
};

export default ViewRequestLCMCDetails;
